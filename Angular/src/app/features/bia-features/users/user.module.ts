import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ReducerManager, StoreModule } from '@ngrx/store';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersIndexComponent } from './views/users-index/users-index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Permission } from 'src/app/shared/permission';
import { PermissionGuard } from 'src/app/core/bia-core/guards/permission.guard';
import { UserItemComponent } from './views/user-item/user-item.component';
import { PopupLayoutComponent } from 'src/app/shared/bia-shared/components/layout/popup-layout/popup-layout.component';
import { FullPageLayoutComponent } from 'src/app/shared/bia-shared/components/layout/fullpage-layout/fullpage-layout.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { CrudItemModule } from 'src/app/shared/bia-shared/feature-templates/crud-items/crud-item.module';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { UserNewComponent } from './views/user-new/user-new.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users-effects';
import { FeatureUsersStore } from './store/user.state';
import { UserCRUDConfiguration } from './user.constants';
import { RoleOptionModule } from 'src/app/domains/bia-domains/role-option/role-option.module';
import { UserFromDirectoryModule } from '../users-from-directory/user-from-directory.module';

export let ROUTES: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
      permission: Permission.User_List_Access,
      InjectComponent: UsersIndexComponent
    },
    component: FullPageLayoutComponent,
    canActivate: [PermissionGuard],
    // [Calc] : The children are not used in calc
    children: [
      {
        path: 'create',
        data: {
          breadcrumb: 'bia.add',
          canNavigate: false,
          permission: Permission.User_Add,
          title: 'user.add',
          InjectComponent: UserNewComponent,
          dynamicComponent : () => (UserCRUDConfiguration.usePopup) ? PopupLayoutComponent : FullPageLayoutComponent,
        },
        component: (UserCRUDConfiguration.usePopup) ? PopupLayoutComponent : FullPageLayoutComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: ':crudItemId',
        data: {
          breadcrumb: '',
          canNavigate: true,
        },
        component: UserItemComponent,
        canActivate: [PermissionGuard],
        children: [
          {
            path: 'edit',
            data: {
              breadcrumb: 'bia.edit',
              canNavigate: true,
              permission: Permission.User_UpdateRoles,
              title: 'user.edit',
              InjectComponent: UserEditComponent,
              dynamicComponent : () => (UserCRUDConfiguration.usePopup) ? PopupLayoutComponent : FullPageLayoutComponent,
            },
            component: (UserCRUDConfiguration.usePopup) ? PopupLayoutComponent : FullPageLayoutComponent,
            canActivate: [PermissionGuard],
          },
          {
            path: '',
            redirectTo: 'edit'
          },
        ]
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    UserItemComponent,
    UsersIndexComponent,
    // [Calc] : NOT used for calc (3 lines).
    // it is possible to delete unsed commponent files (views/..-new + views/..-edit + components/...-form).
    UserFormComponent,
    UserNewComponent,
    UserEditComponent,
    // [Calc] : Used only for calc it is possible to delete unsed commponent files (components/...-table)).
    UserTableComponent,
  ],
  imports: [
    SharedModule,
    CrudItemModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(UserCRUDConfiguration.storeKey, FeatureUsersStore.reducers),
    EffectsModule.forFeature([UsersEffects]),
    // TODO after creation of CRUD User : select the optioDto dommain module requiered for link
    // Domain Modules:
    RoleOptionModule,
    UserFromDirectoryModule, // requiered for the add user from directory feature
  ]
})

export class UserModule {
}

