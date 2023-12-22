import { Server, Socket } from 'socket.io';
import EVENTS from './socket.events';
import { TSpecialTaskAnswerData, TSpecialTaskData } from './socket.types';
import * as SpecialTaskServices from './socket.services';

const socket = async ({ io }: { io: Server }) => {
  console.log('Sockets enabled');

  try {
    io.on(EVENTS.connection, (socket: Socket) => {
      console.log('New client connected');

      socket.on(EVENTS.disconnect, () => {
        console.log('Client disconnected');
      });

      socket.on(
        EVENTS.SERVER.RECEIVE_CREATED_SPECIAL_TASK,
        async (specialTaskData: TSpecialTaskData) => {
          console.log(specialTaskData);
          const createdSpecialTask =
            await SpecialTaskServices.createSpecialTask(specialTaskData);

          io.emit(EVENTS.CLIENT.EMIT_SPECIAL_TASK, specialTaskData);
        }
      );

      socket.on(
        EVENTS.SERVER.RECEIVE_SPECIAL_TASK_ANSWER,
        async (specialTaskAnswerData: TSpecialTaskAnswerData) => {
          const createdSpecialTaskAnswer =
            await SpecialTaskServices.createSpecialTaskAnswer(
              specialTaskAnswerData
            );
        }
      );
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default socket;
