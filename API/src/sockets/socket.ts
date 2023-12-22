import { Server, Socket } from 'socket.io';
import EVENTS from './socket.events';
import { TSpecialTaskAnswerData, TSpecialTaskData } from './socket.types';
import * as SpecialTaskServices from './socket.services';

const socket = async ({ io }: { io: Server }) => {
  console.log('Sockets enabled');

  try {
    io.on(EVENTS.connection, (socket: Socket) => {
      // console.log('New client connected');
      socket.on(EVENTS.connection, () => {
        // console.log('Client connected');
      });
      socket.on(EVENTS.disconnect, () => {
        // console.log('Client disconnected');
      });

      socket.on(
        EVENTS.SERVER.RECEIVE_CREATED_SPECIAL_TASK,
        async (specialTaskData: TSpecialTaskData) => {
          console.log(specialTaskData);
          const createdSpecialTask =
            await SpecialTaskServices.createSpecialTask(specialTaskData);
          if (!createdSpecialTask) {
            io.emit(EVENTS.SERVER.ERROR_CREATING_SPECIAL_TASK, { error: true });
          }

          io.emit(EVENTS.CLIENT.EMIT_SPECIAL_TASK, specialTaskData);
          
          socket
            .to(createdSpecialTask.lecturerId.toString())
            .emit(EVENTS.CLIENT.EMIT_SPECIAL_TASK, createdSpecialTask);
        }
      );

      socket.on(
        EVENTS.SERVER.RECEIVE_SPECIAL_TASK_ANSWER,
        async (specialTaskAnswerData: TSpecialTaskAnswerData) => {
          console.log(specialTaskAnswerData);
          const createdSpecialTaskAnswer =
            await SpecialTaskServices.createSpecialTaskAnswer(
              specialTaskAnswerData
            );
        }
      );

      socket.on(EVENTS.CLIENT.JOIN_ROOM, async (roomId: string) => {
        socket.join(roomId);
        console.log(`Student dołączył do pokoju: ${roomId}`);
      });
    });
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
};

export default socket;
