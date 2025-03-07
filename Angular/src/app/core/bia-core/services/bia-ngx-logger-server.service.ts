import { HttpBackend, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { NGXLoggerServerService } from 'ngx-logger';
import { from, Observable } from 'rxjs';
import { AppSettingsService } from 'src/app/domains/bia-domains/app-settings/services/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class BiaNgxLoggerServerService extends NGXLoggerServerService {

  constructor(
    protected keycloakService: KeycloakService,
    protected httpBackend: HttpBackend,
    protected appSettingsService: AppSettingsService
  ) {
    super(httpBackend);
  }

  protected override alterHttpRequest(httpRequest: HttpRequest<any>): HttpRequest<any> | Observable<HttpRequest<any>> {
    if (this.appSettingsService.appSettings?.keycloak?.isActive === true) {
      return from(this.keycloakService.getToken().then((token) => this.addToken(httpRequest, token)));
    } else {
      return super.alterHttpRequest(httpRequest);
    }
  }

  protected addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      withCredentials: false,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
