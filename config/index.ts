import localConfig from './local.json';
import developmentConfig from './development.json';
import productionConfig from './production.json';

interface Config {
  BACKEND_URL: {
    AUTH_SERVICE: string;
    CORE_SERVICE: string;
  };
  FRONTEND_URL: {
    APP: string;
    CARBON_NEWTRAL: string;
  };
}

let config: Config;

switch (process.env.NEXT_PUBLIC_APP_MODE as string) {
  case 'production':
    config = productionConfig;
    break;
  case 'development':
    config = developmentConfig;
    break;
  case 'local':
    config = localConfig;
    break;
  default:
    config = localConfig;
}

export default config;
