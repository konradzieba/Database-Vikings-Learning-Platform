import app, { httpServer, io } from './app';
import { config } from './utils/config';
import socket from './sockets/socket';

httpServer.listen(config.port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${config.port}`);
  socket({ io });
  /* eslint-enable no-console */
});
