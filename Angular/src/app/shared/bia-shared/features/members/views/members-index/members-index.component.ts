import { Component, HostBinding, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllMembers, getMembersTotalCount, getMemberLoadingGetAll } from '../../store/member.state';
import { multiRemove, loadAllByPost, update, create } from '../../store/members-actions';
import { Observable, Subscription } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { Member } from '../../model/member';
import { BiaTableComponent } from 'src/app/shared/bia-shared/components/table/bia-table/bia-table.component';
import {
  BiaListConfig,
  PrimeTableColumn,
  PropType
} from 'src/app/shared/bia-shared/components/table/bia-table/bia-table-config';
import { AppState } from 'src/app/store/state';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/constants';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberDas } from '../../services/member-das.service';
import * as FileSaver from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { BiaTranslationService } from 'src/app/core/bia-core/services/bia-translation.service';
import { Permission } from 'src/app/shared/permission';
import { KeyValuePair } from 'src/app/shared/bia-shared/model/key-value-pair';
import { MembersSignalRService } from '../../services/member-signalr.service';
import { MembersEffects } from '../../store/members-effects';
import { loadAllView } from 'src/app/shared/bia-shared/features/view/store/views-actions';
import { MemberOptionsService } from '../../services/member-options.service';
import { PagingFilterFormatDto } from 'src/app/shared/bia-shared/model/paging-filter-format';

@Component({
  selector: 'app-members-index',
  templateUrl: './members-index.component.html',
  styleUrls: ['./members-index.component.scss']
})
export class MembersIndexComponent implements OnInit, OnDestroy {
  useCalcMode = false;
  useSignalR = false;
  useView = false;
  useRefreshAtLanguageChange = true;

  @HostBinding('class.bia-flex') flex = true;
  @ViewChild(BiaTableComponent, { static: false }) memberListComponent: BiaTableComponent;
  protected sub = new Subscription();
  showColSearch = false;
  globalSearchValue = '';
  defaultPageSize = DEFAULT_PAGE_SIZE;
  pageSize = this.defaultPageSize;
  totalRecords: number;
  members$: Observable<Member[]>;
  selectedMembers: Member[];
  totalCount$: Observable<number>;
  loading$: Observable<boolean>;
  canEdit = false;
  canDelete = false;
  canAdd = false;
  tableConfiguration: BiaListConfig;
  columns: KeyValuePair[];
  displayedColumns: KeyValuePair[];
  viewPreference: string;
  popupTitle: string;
  tableStateKey = this.useView ? 'membersGrid' : undefined;
  parentIds: string[];


  protected store: Store<AppState>;
  protected router: Router;
  public activatedRoute: ActivatedRoute;
  protected authService: AuthService;
  protected memberDas: MemberDas;
  protected translateService: TranslateService;
  protected biaTranslationService: BiaTranslationService;
  protected membersSignalRService: MembersSignalRService;
  public memberOptionsService: MemberOptionsService;

  constructor( injector: Injector ) {
    this.store = injector.get<Store<AppState>>(Store);
    this.router = injector.get<Router>(Router);
    this.activatedRoute = injector.get<ActivatedRoute>(ActivatedRoute);
    this.authService = injector.get<AuthService>(AuthService);
    this.memberDas = injector.get<MemberDas>(MemberDas);
    this.translateService = injector.get<TranslateService>(TranslateService);
    this.biaTranslationService = injector.get<BiaTranslationService>(BiaTranslationService);
    this.membersSignalRService = injector.get<MembersSignalRService>(MembersSignalRService);
    this.memberOptionsService = injector.get<MemberOptionsService>(MemberOptionsService);
  }

  ngOnInit() {
    this.sub = new Subscription();

    this.initTableConfiguration();
    this.setPermissions();
    this.members$ = this.store.select(getAllMembers);
    this.totalCount$ = this.store.select(getMembersTotalCount);
    this.loading$ = this.store.select(getMemberLoadingGetAll);
    this.OnDisplay();
    if (this.useCalcMode) {
      this.memberOptionsService.loadAllOptions();
    }

    if (this.useRefreshAtLanguageChange) {
      // Reload data if language change.
      let isinit = true;
      this.sub.add(
        this.biaTranslationService.currentCulture$.subscribe(event => {
            if (isinit) {
              isinit = false;
            } else {
              this.onLoadLazy(this.memberListComponent.getLazyLoadMetadata());
            }
          })
      );
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.OnHide();
  }

  OnDisplay() {

    if (this.useView) {
      this.store.dispatch(loadAllView());
    }


    if (this.useSignalR) {
      this.membersSignalRService.initialize(this.parentIds[0]);
      MembersEffects.useSignalR = true;
    }
  }

  OnHide() {
    if (this.useSignalR) {
      MembersEffects.useSignalR = false;
      this.membersSignalRService.destroy();
    }
  }

  onCreate() {
    if (!this.useCalcMode) {
      this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
    }
  }

  onEdit(memberId: number) {
    if (!this.useCalcMode) {
      this.router.navigate(['../' + memberId + '/edit'], { relativeTo: this.activatedRoute });
    }
  }

  onSave(member: Member) {
    if (this.useCalcMode) {
      if (member?.id > 0) {
        if (this.canEdit) {
          this.store.dispatch(update({ member: member }));
        }
      } else {
        if (this.canAdd) {
          this.store.dispatch(create({ member: member }));
        }
      }
    }
  }

  onDelete() {
    if (this.selectedMembers && this.canDelete) {
      this.store.dispatch(multiRemove({ ids: this.selectedMembers.map((x) => x.id) }));
    }
  }

  onSelectedElementsChanged(members: Member[]) {
    this.selectedMembers = members;
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
  }

  onLoadLazy(lazyLoadEvent: LazyLoadEvent) {
    const pagingAndFilter: PagingFilterFormatDto = { parentIds: this.parentIds, ...lazyLoadEvent };
    this.store.dispatch(loadAllByPost({ event: pagingAndFilter }));
  }


  searchGlobalChanged(value: string) {
    this.globalSearchValue = value;
  }

  displayedColumnsChanged(values: KeyValuePair[]) {
    this.displayedColumns = values;
  }

  onToggleSearch() {
    this.showColSearch = !this.showColSearch;
  }

  onViewChange(viewPreference: string) {
    this.viewPreference = viewPreference;
  }

  onExportCSV() {
    const columns: { [key: string]: string } = {};
    this.columns.map((x) => (columns[x.value.split('.')[1]] = this.translateService.instant(x.value)));
    const columnsAndFilter: PagingFilterFormatDto = {
      parentIds: this.parentIds, columns: columns, ...this.memberListComponent.getLazyLoadMetadata()
    };
    this.memberDas.getFile(columnsAndFilter).subscribe((data) => {
      FileSaver.saveAs(data, this.translateService.instant('app.members') + '.csv');
    });
  }

  protected setPermissions() {
    this.canEdit = this.authService.hasPermission(Permission.Member_Update);
    this.canDelete = this.authService.hasPermission(Permission.Member_Delete);
    this.canAdd = this.authService.hasPermission(Permission.Member_Create);
  }

  protected initTableConfiguration() {
    this.biaTranslationService.currentCultureDateFormat$.subscribe((dateFormat) => {
      this.tableConfiguration = {
        columns: [
          Object.assign(new PrimeTableColumn('user', 'member.user'), {
            type: PropType.OneToMany
          }),
          Object.assign(new PrimeTableColumn('roles', 'member.rolesForSite'), {
            type: PropType.ManyToMany
          })
        ]
      };

      this.columns = this.tableConfiguration.columns.map((col) => <KeyValuePair>{ key: col.field, value: col.header });
      this.displayedColumns = [...this.columns];
    });
  }
}
