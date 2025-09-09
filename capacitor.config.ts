import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.56037d6a11d84edd83715ecfb1dff570',
  appName: 'AI Sports Talent Scout',
  webDir: 'dist',
  server: {
    url: 'https://56037d6a-11d8-4edd-8371-5ecfb1dff570.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;