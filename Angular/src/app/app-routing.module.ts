import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_ROUTES } from './features/home/home.module';
import { LayoutComponent } from './shared/bia-shared/components/layout/layout.component';
import { PageLayoutComponent } from './shared/bia-shared/components/layout/page-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      ...HOME_ROUTES,
      {
        path: '',
        component: PageLayoutComponent,
        children: [
          // Begin BIADemo
          {
            path: 'examples',
            data: {
              breadcrumb: 'app.examples',
              canNavigate: false
            },
            children: [
              {
                path: 'aircraft-maintenance-companies',
                data: {
                  breadcrumb: 'app.aircraft-maintenance-companies',
                  canNavigate: true
                },
                loadChildren: () => import('./features/aircraft-maintenance-companies/aircraft-maintenance-company.module').then((m) => m.AircraftMaintenanceCompanyModule)
              },
              {
                path: 'planes',
                data: {
                  breadcrumb: 'app.planes',
                  canNavigate: true
                },
                loadChildren: () => import('./features/planes/plane.module').then((m) => m.PlaneModule)
              },
              {
                path: 'planes-full-code',
                data: {
                  breadcrumb: 'app.planesFullCode',
                  canNavigate: true
                },
                loadChildren: () => import('./features/planes-full-code/plane.module').then((m) => m.PlaneModule)
              },
              {
                path: 'planes-specific',
                data: {
                  breadcrumb: 'app.planesSpecific',
                  canNavigate: true
                },
                loadChildren: () => import('./features/planes-specific/plane.module').then((m) => m.PlaneModule)
              },
              {
                path: 'airports',
                data: {
                  breadcrumb: 'app.airports',
                  canNavigate: true
                },
                loadChildren: () => import('./features/airports/airport.module').then((m) => m.AirportModule)
              },
              {
                path: 'planes-types',
                data: {
                  breadcrumb: 'app.planesTypes',
                  canNavigate: true
                },
                loadChildren: () => import('./features/planes-types/plane-type.module').then((m) => m.PlaneTypeModule)
              },
              {
                path: 'hangfire',
                data: {
                  breadcrumb: 'app.hangfire',
                  canNavigate: true
                },
                loadChildren: () => import('./features/hangfire/hangfire.module').then((m) => m.HangfireModule)
              },
            ]
          },
          // End BIADemo
          {
            path: 'sites',
            data: {
              breadcrumb: 'app.sites',
              canNavigate: true
            },
            loadChildren: () => import('./features/sites/site.module').then((m) => m.SiteModule)
          },
          {
            path: 'users',
            data: {
              breadcrumb: 'app.users',
              canNavigate: true
            },
            loadChildren: () => import('./features/bia-features/users/user.module').then((m) => m.UserModule)
          },
          {
            path: 'notifications',
            data: {
              breadcrumb: 'app.notifications',
              canNavigate: true
            },
            loadChildren: () => import('./features/bia-features/notifications/notification.module').then((m) => m.NotificationModule)
          },
          {
            path: 'backgroundtask',
            data: {
              breadcrumb: 'bia.backgroundtasks',
              canNavigate: true
            },
            loadChildren: () => import('./features/bia-features/background-task/background-task.module').then((m) => m.BackgroundTaskModule)
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
