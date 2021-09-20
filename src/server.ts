import { DevServer } from '@util/server-config/DevConfig';

const StartServer = async (serverConfig: any) => {
  await serverConfig();
};

StartServer(DevServer);
