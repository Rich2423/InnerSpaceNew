import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.innerspace.twa',
  appName: 'InnerSpace',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
