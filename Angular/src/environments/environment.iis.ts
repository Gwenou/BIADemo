import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  helpUrl: '',
  reportUrl: '',
  apiUrl: 'http://localhost/BIADemo/WebApi/api',
  hubUrl: 'http://localhost/BIADemo/WebApi/HubForClients',
  urlErrorPage: 'http://localhost/static/error.htm',
  useXhrWithCred: true,
  production: false,
  logging: {
    conf: {
      serverLoggingUrl: 'http://localhost/BIADemo/WebApi/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }
  },
  keycloak: {
    conf: {
      realm: 'BIA-Realm',
      authServerUrl: 'http://localhost:8080/',
      resource: 'biademo-front'
    },
    login: {
      idpHint: 'darwin'
    }
  }
};
