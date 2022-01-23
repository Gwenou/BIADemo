import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  helpUrl: '',
  reportUrl: 'toto',
  enableNotifications: true,
  apiUrl: '../WebApi/api',
  hubUrl: '../WebApi/HubForClients',
  urlAuth: '/api/Auth',
  urlLog: '/api/logs',
  urlEnv: '/api/Environment',
  urlErrorPage: '/static/error.htm',
  urlDMIndex: '/DMIndex',
  urlAppIcon: 'assets/bia/AppIcon.svg',
  useXhrWithCred: false,
  production: true,
  appTitle: 'BIADemo',
  companyName: 'TheBIADevCompany',
  version: '0.0.0',
  logging: {
    conf: {
      serverLoggingUrl: '../WebApi/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }
  },
  singleRoleMode: false
};
