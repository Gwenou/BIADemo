import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, NEVER, Subscription } from 'rxjs';
import { map, filter, take, switchMap } from 'rxjs/operators';
import { AbstractDas } from './abstract-das.service';
import { AuthInfo, AdditionalInfos, TokenAndTeamsDto, TeamLoginDto } from 'src/app/shared/bia-shared/model/auth-info';
import { environment } from 'src/environments/environment';
import { BiaMessageService } from './bia-message.service';
import { TranslateService } from '@ngx-translate/core';
import { RoleMode } from 'src/app/shared/constants';
import { allEnvironments } from 'src/environments/allEnvironments';
import { loadAllTeamsSuccess } from 'src/app/domains/team/store/teams-actions';


const STORAGE_TEAMSLOGIN_KEY = 'teamsLogin';
const STORAGE_RELOADED_KEY = 'isReloaded';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractDas<AuthInfo> implements OnDestroy {
  protected sub = new Subscription();
  protected authInfoSubject: BehaviorSubject<AuthInfo | null> = new BehaviorSubject<AuthInfo | null>(null);
  public authInfo$: Observable<AuthInfo | null> = this.authInfoSubject
    .asObservable()
    .pipe(filter((authInfo: AuthInfo | null) => authInfo !== null && authInfo !== undefined));

  constructor(
    injector: Injector,
    protected biaMessageService: BiaMessageService,
    protected translateService: TranslateService
  ) {
    super(injector, 'Auth');
    this.init();
  }

  protected init() {
    this.authInfo$.subscribe((authInfo: AuthInfo | null) => {
      if (authInfo && authInfo.additionalInfos && authInfo.additionalInfos.userData) {
        authInfo.additionalInfos.userData.currentTeams.forEach(team => {
          this.setCurrentTeamId(team.teamTypeId, team.currentTeamId);   
          const roleMode = allEnvironments.teams.find(r => r.teamTypeId == team.teamTypeId)?.roleMode || RoleMode.AllRoles;
          if (roleMode !== RoleMode.AllRoles) {
            this.setCurrentRoleIds(team.currentTeamId, team.currentRoleIds);
          }
        });

      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public logout() {
    this.authInfoSubject.next(null);
  }

  public login(): Observable<AuthInfo> {
    return this.checkFrontEndVersion().pipe(
      take(1),
      switchMap((isCorrectVersion: boolean) => {
        if (isCorrectVersion === true) {
          return this.getAuthInfo();
        } else {
          this.getLatestVersion();
          return NEVER;
        }
      })
    );
  }

  public hasPermission(permission: string): boolean {
    return this.checkPermission(this.authInfoSubject.value, permission);
  }

  public hasPermissionObs(permission: string): Observable<boolean> {
    if (!permission) {
      return of(true);
    }
    return this.authInfo$.pipe(
      map((authInfo: AuthInfo | null) => {
        return this.checkPermission(authInfo, permission);
      })
    );
  }

  public getToken(): string {
    const authInfo = this.authInfoSubject.value;
    if (authInfo) {
      return authInfo.token;
    }
    return '';
  }

  public getAdditionalInfos(): AdditionalInfos {
    const authInfo = this.authInfoSubject.value;
    if (authInfo) {
      return authInfo.additionalInfos;
    }
    return <AdditionalInfos>{};
  }


  public getTeamsLogin(): TeamLoginDto[] {
    const value = sessionStorage.getItem(STORAGE_TEAMSLOGIN_KEY);
    if (value) {
      const teamsLogin: TeamLoginDto[] = <TeamLoginDto[]>JSON.parse(value);
      return teamsLogin;
    }

    return [];
  }  

  public setTeamLogin(teamsLogin: TeamLoginDto[]){
    sessionStorage.setItem(STORAGE_TEAMSLOGIN_KEY, JSON.stringify(teamsLogin));
  }

  public getTeamLogin(teamTypeId: number): TeamLoginDto | undefined{
    const teamsLogin = this.getTeamsLogin();
    return teamsLogin.find((i => i.teamTypeId === teamTypeId))
    
  }

  


  public getCurrentTeamId(teamTypeId: number): number {
    const team = this.getTeamLogin(teamTypeId);
    if (team) {
      return team.teamId;
    }
    return 0;
  }

  public getCurrentRoleIds(teamTypeId: number): number[] {
    const team = this.getTeamLogin(teamTypeId);
    if (team) {
      return team.roleIds;
    }
    return [];
  }

  public setCurrentTeamId(teamTypeId: number, teamId: number) {
    const teamsLogin = this.getTeamsLogin();
    let team = teamsLogin.find((i => i.teamTypeId === teamTypeId))
    if (team) {
      team.teamId = teamId
      team.useDefaultRoles = true;
      team.roleIds = [];
    }
    else {
      let newTeam = new TeamLoginDto();
      newTeam.teamTypeId = teamTypeId;
      newTeam.useDefaultRoles = true;
      newTeam.roleIds = [];
      newTeam.roleMode = allEnvironments.teams.find(r => r.teamTypeId == teamTypeId)?.roleMode!;
      newTeam.teamId = teamId;
      teamsLogin.push(newTeam)
    }
    this.setTeamLogin(teamsLogin);
  }

  public setCurrentRoleIds(teamId: number, roleIds: number[]) {
    const teamsLogin = this.getTeamsLogin();
    let team = teamsLogin.find((i => i.teamId === teamId))
    if (team) {
      team.roleIds = roleIds
      team.useDefaultRoles = false;
    }
    else {
      throw new Error('Error the teamid should be set before roles');
    }
    this.setTeamLogin(teamsLogin);
  }

  public getFrontEndVersion(): Observable<string> {
    return this.http.get<string>(`${this.route}frontEndVersion`);
  }

  protected checkPermission(authInfo: AuthInfo | null, permission: string) {
    if (!permission) {
      return true;
    }
    if (authInfo) {
      return authInfo.permissions.some((p) => p === permission) === true;
    }
    return false;
  }

  protected getAuthInfo() {
    return this.http.post<TokenAndTeamsDto>(this.buildUrlLogin(),this.buildBodyLogin()).pipe(
      map((tokenAndTeam: TokenAndTeamsDto) => {
        this.authInfoSubject.next(tokenAndTeam.token);
        loadAllTeamsSuccess({ teams: tokenAndTeam.allTeams });
        return tokenAndTeam.token;
      })
    );
  }

  protected buildUrlLogin() {
    let url: string;
    const teamsLogin = this.getTeamsLogin();
    if (teamsLogin.length > 0) {
      url = `${this.route}LoginAndTeams`;
    }
    else {
      url = `${this.route}LoginAndTeamsDefault`;
    }
    return url;
  }

  protected buildBodyLogin() {
    let body;
    const teamsLogin = this.getTeamsLogin();
    if (teamsLogin.length > 0) {
      body = teamsLogin;
    }
    else {
      body = allEnvironments.teams;
    }
    return body;
  }

  protected getLatestVersion() {
    const isReloaded = sessionStorage.getItem(STORAGE_RELOADED_KEY);
    // if a refresh has already been done,
    if (isReloaded === String(true)) {
      sessionStorage.removeItem(STORAGE_RELOADED_KEY);
      const httpCodeUpgradeRequired = 426;
      window.location.href = environment.urlErrorPage + '?num=' + httpCodeUpgradeRequired;
    } else {
      const timer = 7000;
      this.biaMessageService.showInfo(this.translateService.instant('biaMsg.infoBeforeGetLatestVersion'), timer);
      setInterval(() => {
        this.refresh();
      }, timer);
    }
  }

  protected refresh() {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.setItem(STORAGE_RELOADED_KEY, String(true));
    location.reload();
  }

  protected checkFrontEndVersion(): Observable<boolean> {
    return this.getFrontEndVersion().pipe(
      map((version: string) => {
        return version === allEnvironments.version;
      })
    );
  }
}
