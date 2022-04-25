import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users-effects';
import { reducers } from './store/user.state';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersIndexComponent } from './views/users-index/users-index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserNewComponent } from './views/user-new/user-new.component';
import { UserEditComponent } from './views/user-edit/user-edit.component';
import { Permission } from 'src/app/shared/permission';
import { PermissionGuard } from 'src/app/core/bia-core/guards/permission.guard';
import { UserItemComponent } from './views/user-item/user-item.component';
import { PopupLayoutComponent } from 'src/app/shared/bia-shared/components/layout/popup-layout/popup-layout.component';
import { FullPageLayoutComponent } from 'src/app/shared/bia-shared/components/layout/fullpage-layout/fullpage-layout.component';
import { RoleOptionModule } from 'src/app/domains/role-option/role-option.module';
import { UserTableComponent } from './components/user-table/user-table.component';
import { storeKey, usePopup } from './user.constants';
import { LdapDomainModule } from 'src/app/domains/ldap-domain/ldap-domain.module';
import { UserFromDirectoryModule } from 'src/app/features/bia-features/users-from-directory/user-from-directory.module';

const ROUTES: Routes = [
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
        },
        component: (usePopup) ? PopupLayoutComponent : FullPageLayoutComponent,
        canActivate: [PermissionGuard],
      },
      {
        path: ':userId',
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
            },
            component: (usePopup) ? PopupLayoutComponent : FullPageLayoutComponent,
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
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(storeKey, reducers),
    EffectsModule.forFeature([UsersEffects]),
    // Domain Modules:
    RoleOptionModule,
    UserFromDirectoryModule,
    LdapDomainModule,
  ]
})

export class UserModule {
}

