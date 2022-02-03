import {NgxLoggerLevel} from 'ngx-logger';

export const environment = {
  helpUrl: '',
  reportUrl: '',
  enableNotifications: true,
  apiUrl: 'http://localhost/BIADemo/WebApi/api',
  hubUrl: 'http://localhost/BIADemo/WebApi/HubForClients',
  urlAuth: '/api/Auth',
  urlLog: '/api/logs',
  urlEnv: '/api/Environment',
  urlErrorPage: 'http://localhost/static/error.htm',
  urlDMIndex: 'http://localhost/DMIndex',
  urlAppIcon: 'assets/bia/AppIcon.svg',
  useXhrWithCred: true,
  production: false,
  appTitle: 'BIADemo',
  companyName: 'TheBIADevCompany',
  version: '0.0.0',
  logging: {
    conf: {
      serverLoggingUrl: 'http://localhost/BIADemo/WebApi/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR
    }
  },
  singleRoleMode: false
};
