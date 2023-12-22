import { Server, Socket } from 'socket.io';
import EVENTS from './socket.events';
import { TSpecialTaskAnswerData, TSpecialTaskData } from './socket.types';
import * as SpecialTaskServices from './socket.services';

const socket = async ({ io }: { io: Server }) => {
  console.log('Sockets enabled');

  try {
    io.on(EVENTS.connection, (socket: Socket) => {
      socket.on(EVENTS.connection, () => {});
      socket.on(EVENTS.disconnect, () => {});

      socket.on(
        EVENTS.SERVER.RECEIVE_CREATED_SPECIAL_TASK,
        async (specialTaskData: TSpecialTaskData) => {
          const createdSpecialTask =
            await SpecialTaskServices.createSpecialTask(specialTaskData);

          if (!createdSpecialTask) {
            io.to(specialTaskData.lecturerId.toString()).emit(
              EVENTS.SERVER.ERROR_CREATING_SPECIAL_TASK,
              { error: true }
            );
          }

          if (createdSpecialTask) {
            io.to(createdSpecialTask.lecturerId.toString()).emit(
              EVENTS.SERVER.SUCCESS_CREATING_SPECIAL_TASK,
              {
                success: true,
              }
            );
          }

          socket
            .to(createdSpecialTask.lecturerId.toString())
            .emit(EVENTS.CLIENT.EMIT_SPECIAL_TASK, createdSpecialTask);
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

      socket.on(EVENTS.CLIENT.JOIN_ROOM, async (roomId: string) => {
        socket.join(roomId);
      });
    });
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
};

export default socket;
