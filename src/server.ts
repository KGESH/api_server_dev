import 'module-alias/register';
import { DeployServer } from '@src/util/server-config/DeployConfig';

const StartServer = async (serverConfig: any) => {
  await serverConfig();
};

StartServer(DeployServer);
