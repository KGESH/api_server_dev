import 'module-alias/register';
import { DevServer } from '@src/util/server-config/DevConfig';

const StartServer = async (serverConfig: any) => {
  await serverConfig();
};

StartServer(DevServer);
