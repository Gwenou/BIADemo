// Modules
import { NgModule, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// PrimeNG Services
import { MessageService } from 'primeng/api';

// Interceptor
import { standardEncodeHttpParamsInterceptor } from './interceptors/standard-encode-http-params-interceptor.service';
import { biaXhrWithCredInterceptor } from './interceptors/bia-xhr-with-cred-interceptor.service';
import { biaTokenInterceptor } from './interceptors/token.interceptor';

// Services
import { AuthService } from './services/auth.service';
import { BiaThemeService } from './services/bia-theme.service';
import { BiaTranslationService } from './services/bia-translation.service';
import { BiaAppInitService } from './services/bia-app-init.service';
import { SiteModule } from 'src/app/domains/site/site.module';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { NotificationSignalRService } from 'src/app/domains/notification/services/notification-signalr.service';
import { AppSettingsModule } from 'src/app/domains/bia-domains/app-settings/app-settings.module';
import { ServiceWorkerModule } from '@angular/service-worker';

export function initializeApp(appInitService: BiaAppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  };
}

const MODULES = [HttpClientModule, SiteModule, AppSettingsModule, ServiceWorkerModule];

/* Warning: the order matters */
const INTERCEPTORS = [standardEncodeHttpParamsInterceptor, biaXhrWithCredInterceptor, biaTokenInterceptor];

const SERVICES = [MessageService, AuthService, BiaThemeService, BiaTranslationService, NotificationSignalRService];

const BASE_HREF = [
  {
    provide: APP_BASE_HREF,
    useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
    deps: [PlatformLocation]
  }
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  providers: [
    ...INTERCEPTORS,
    ...SERVICES,
    ...BASE_HREF,
    BiaAppInitService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [BiaAppInitService], multi: true }
  ]
})

// https://medium.com/@benmohamehdi/angular-best-practices-coremodule-vs-sharedmodule-25f6721aa2ef
export class BiaCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: BiaCoreModule) {
    if (parentModule) {
      throw new Error('BiaCoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
