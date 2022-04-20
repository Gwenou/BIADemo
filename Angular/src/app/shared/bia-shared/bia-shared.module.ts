// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG Modules
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';

// PrimeNG Services
import { MessageService } from 'primeng/api';

// Component
import { BiaTableHeaderComponent } from './components/table/bia-table-header/bia-table-header.component';
import { ClassicFooterComponent } from './components/layout/classic-footer/classic-footer.component';
import { ClassicHeaderComponent } from './components/layout/classic-header/classic-header.component';
import { ClassicLayoutComponent } from './components/layout/classic-layout/classic-layout.component';
import { ClassicPageLayoutComponent } from './components/layout/classic-page-layout/classic-page-layout.component';
import { IeWarningComponent } from './components/layout/classic-header/ie-warning/ie-warning.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BiaTableControllerComponent } from './components/table/bia-table-controller/bia-table-controller.component';
import { BiaTableComponent } from './components/table/bia-table/bia-table.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageLayoutComponent } from './components/layout/page-layout.component';
import { PrimengCalendarLocaleDirective } from './directives/primeng-calendar-locale.directive';
import { ViewListComponent } from './features/view/views/view-list/view-list.component';
import { ViewDialogComponent } from './features/view/views/view-dialog/view-dialog.component';
import { ViewTeamTableComponent } from './features/view/components/view-team-table/view-team-table.component';
import { ViewUserTableComponent } from './features/view/components/view-user-table/view-user-table.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './features/view/store/view.state';
import { reducers as notificationReducers } from '../../domains/notification/store/notification.state';
import { EffectsModule } from '@ngrx/effects';
import { ViewsEffects } from './features/view/store/views-effects';
import { ViewFormComponent } from './features/view/components/view-form/view-form.component';
import { BiaCalcTableComponent } from './components/table/bia-calc-table/bia-calc-table.component';
import { PopupLayoutComponent } from './components/layout/popup-layout/popup-layout.component';
import { FullPageLayoutComponent } from './components/layout/fullpage-layout/fullpage-layout.component';
import { PluckPipe } from './pipes/pluck.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { NotificationsEffects } from 'src/app/domains/notification/store/notifications-effects';
import { TranslateFieldPipe } from './pipes/translate-field.pipe';
import { FormatValuePipe } from './pipes/format-value.pipe';
import { ClassicTeamSelectorComponent } from './components/layout/classic-team-selector/classic-team-selector.component';
import { TeamModule } from 'src/app/domains/team/team.module';
import { BiaOnlineOfflineIconComponent } from './components/bia-online-offline-icon/bia-online-offline-icon.component';
import { IsNotCurrentTeamPipe } from './components/notification-team-warning/is-not-current-team/is-not-current-team.pipe';
import { TeamListPipe } from './components/notification-team-warning/team-list/team-list.pipe';
import { NotificationTeamWarningComponent } from './components/notification-team-warning/notification-team-warning.component';
import { UserAddFormLdapComponent } from './features/users-from-directory/views/user-add-from-directory-dialog/user-add-from-directory-dialog.component';
import { UserFromLdapFormComponent } from './features/users-from-directory/components/user-from-directory-form/user-from-directory-form.component';

const PRIMENG_MODULES = [
  AccordionModule,
  AutoCompleteModule,
  BreadcrumbModule,
  ButtonModule,
  CalendarModule,
  CheckboxModule,
  ChipsModule,
  CodeHighlighterModule,
  ConfirmDialogModule,
  ContextMenuModule,
  DialogModule,
  DropdownModule,
  EditorModule,
  FieldsetModule,
  FullCalendarModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  ListboxModule,
  MegaMenuModule,
  MenuModule,
  MenubarModule,
  MessageModule,
  MessagesModule,
  MultiSelectModule,
  PaginatorModule,
  PanelModule,
  PanelMenuModule,
  ProgressBarModule,
  RadioButtonModule,
  ScrollPanelModule,
  SelectButtonModule,
  SlideMenuModule,
  SliderModule,
  SpinnerModule,
  SplitButtonModule,
  TableModule,
  TabMenuModule,
  TabViewModule,
  TieredMenuModule,
  ToastModule,
  ToggleButtonModule,
  ToolbarModule,
  TooltipModule,
  FileUploadModule,
];

const MODULES = [
  CommonModule,
  PortalModule,
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  HttpClientModule,
  TeamModule,
];


const COMPONENTS = [
  ClassicFooterComponent,
  ClassicHeaderComponent,
  ClassicTeamSelectorComponent,
  ClassicLayoutComponent,
  ClassicPageLayoutComponent,
  SpinnerComponent,
  IeWarningComponent,
  BiaTableComponent,
  BiaCalcTableComponent,
  BiaTableHeaderComponent,
  BiaTableControllerComponent,
  LayoutComponent,
  PageLayoutComponent,
  PopupLayoutComponent,
  FullPageLayoutComponent,
  PrimengCalendarLocaleDirective,
  BiaOnlineOfflineIconComponent,
  NotificationTeamWarningComponent,
];

const FEATURES = [
  UserAddFormLdapComponent
]

const VIEW_COMPONENTS = [
  ViewListComponent,
  ViewDialogComponent,
  ViewTeamTableComponent,
  ViewUserTableComponent,
  ViewFormComponent
];

const USER_FROM_LDAPCOMPONENTS = [
  UserAddFormLdapComponent,
  UserFromLdapFormComponent
];
const PIPES = [
  PluckPipe,
  JoinPipe,
  TranslateFieldPipe,
  FormatValuePipe,
  IsNotCurrentTeamPipe,
  TeamListPipe
];

const VIEW_IMPORTS = [StoreModule.forFeature('views', reducers), EffectsModule.forFeature([ViewsEffects])];

const NOTIFICATION_IMPORTS = [
  StoreModule.forFeature('domain-notifications', notificationReducers),
  EffectsModule.forFeature([NotificationsEffects])
];

const SERVICES = [MessageService];

@NgModule({
  imports: [...PRIMENG_MODULES, ...MODULES, ...VIEW_IMPORTS, ...NOTIFICATION_IMPORTS],
  declarations: [...COMPONENTS, ...VIEW_COMPONENTS, ...USER_FROM_LDAPCOMPONENTS, ...PIPES],
  exports: [...PRIMENG_MODULES, ...MODULES, ...COMPONENTS, ...FEATURES, ...PIPES],
  providers: [...SERVICES]
})

// https://medium.com/@benmohamehdi/angular-best-practices-coremodule-vs-sharedmodule-25f6721aa2ef
export class BiaSharedModule { }
