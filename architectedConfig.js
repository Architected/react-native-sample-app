import { API_URL, APP_KEY, APP_ENV } from '@env';

const architectedConfig = {
  apiUrl: API_URL,
  appKey: APP_KEY,
  appEnv: APP_ENV,
  siteName: 'Merkki',
  siteMode: 'app',
  timeout: 20000,
  connectType: 'FC',
  clientType: 'MOB',
  challengeMethod: 'SHA256',
};

module.exports = { architectedConfig };
