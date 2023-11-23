import { Socket, Server } from 'socket.io';
import db from '../../db';

export type TExtraTaskData = {
  groupId: number;
  question: number;
};

function socket(io: Server, socket: Socket) {
  console.log('Socket connected: ', socket.id);

  socket.on('createExtraTask', (extraTaskData: TExtraTaskData) => {
    const { groupId, question } = extraTaskData;
    db
  });
}
