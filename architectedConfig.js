import { API_URL, APP_KEY, APP_ENV, APP_NAME, APP_MODE } from '@env';

const architectedConfig = {
  apiUrl: API_URL,
  appKey: APP_KEY,
  appEnv: APP_ENV,
  siteName: APP_NAME,
  siteMode: APP_MODE,
  timeout: 20000,
  connectType: 'FC',
  clientType: 'MOB',
  challengeMethod: 'SHA256',
};

module.exports = { architectedConfig };
