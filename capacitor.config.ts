import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'test.com',
  appName: 'mylogin',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
