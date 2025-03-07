import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/user';
import { UserCRUDConfiguration } from '../../user.constants';
import { AuthService } from 'src/app/core/bia-core/services/auth.service';
import { Permission } from 'src/app/shared/permission';
import { CrudItemsIndexComponent } from 'src/app/shared/bia-shared/feature-templates/crud-items/views/crud-items-index/crud-items-index.component';
import { UserService } from '../../services/user.service';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { FeatureUsersActions } from '../../store/users-actions';
import { getLastUsersAdded } from 'src/app/domains/bia-domains/user-option/store/user-option.state';
import { skip } from 'rxjs/operators';
import { AppSettingsService } from 'src/app/domains/bia-domains/app-settings/services/app-settings.service';

@Component({
  selector: 'bia-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss']
})

export class UsersIndexComponent extends CrudItemsIndexComponent<User> implements OnInit{
  canSync = false;
  displayUserAddFromDirectoryDialog = false;

  @ViewChild(UserTableComponent, { static: false }) crudItemTableComponent: UserTableComponent;

  constructor(
    protected injector: Injector,
    public userService: UserService,
    protected authService: AuthService,
    protected appSettingsService: AppSettingsService
  ) {
    super(injector, userService);
    this.crudConfiguration = UserCRUDConfiguration;
  }

  protected setPermissions() {
    this.canSync = this.appSettingsService.appSettings?.keycloak?.isActive !== true && this.authService.hasPermission(Permission.User_Sync);
    this.canEdit = this.authService.hasPermission(Permission.User_UpdateRoles);
    this.canDelete = this.authService.hasPermission(Permission.User_Delete);
    this.canAdd = this.authService.hasPermission(Permission.User_Add);
  }

  ngOnInit() {
    super.ngOnInit();

    this.sub.add(
      this.store.select(getLastUsersAdded).pipe(skip(1)).subscribe(event => {
        setTimeout(() => this.onLoadLazy(this.crudItemListComponent.getLazyLoadMetadata()));
      })
    )
  }

  onCreate() {
    this.displayUserAddFromDirectoryDialog = true;
    /*if (!this.useCalcMode) {
      this.router.navigate(['create'], { relativeTo: this.activatedRoute });
    }*/
  }

  onSynchronize() {
    this.store.dispatch(FeatureUsersActions.synchronize());
  }
}
