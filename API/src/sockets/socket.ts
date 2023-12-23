import { Server, Socket } from 'socket.io';
import EVENTS from './socket.events';
import {
  TSpecialTaskAnswerData,
  TSpecialTaskData,
  TSpecialTaskResponseData,
} from './socket.types';
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
        async (specialTaskAnswerData: TSpecialTaskResponseData) => {
          const specialTask = await SpecialTaskServices.findSpecialTaskById(
            specialTaskAnswerData.answerData.specialTaskId
          );

          if (specialTask?.numberOfAnswers === 0) {
            io.to(specialTaskAnswerData.lecturerId.toString()).emit(
              EVENTS.SERVER.STATUS_NO_MORE_ANSWERS_LEFT,
              {
                status: true,
              }
            );
          }

          if (specialTask?.numberOfAnswers! > 0) {
            const createdSpecialTaskAnswer =
              await SpecialTaskServices.createSpecialTaskAnswer({
                solution: specialTaskAnswerData.answerData.solution,
                specialTaskId: specialTaskAnswerData.answerData.specialTaskId,
                studentId: specialTaskAnswerData.answerData.studentId,
              });

            if (!createdSpecialTaskAnswer) {
              io.to(specialTaskAnswerData.lecturerId.toString()).emit(
                EVENTS.SERVER.ERROR_CREATING_SPECIAL_TASK_ANSWER,
                {
                  error: true,
                }
              );
            }

            if (createdSpecialTaskAnswer) {
              io.to(specialTaskAnswerData.lecturerId.toString()).emit(
                EVENTS.SERVER.SUCCESS_CREATING_SPECIAL_TASK_ANSWER,
                {
                  success: true,
                }
              );
              await SpecialTaskServices.decreaseAmountOfSpecialTaskAnswers(
                createdSpecialTaskAnswer.specialTaskId
              );

              socket
                .to(specialTaskAnswerData.lecturerId.toString())
                .emit(EVENTS.CLIENT.REDUCE_AMOUNT_OF_TASKS, {
                  specialTaskId: createdSpecialTaskAnswer.specialTaskId,
                });
              io.to(specialTaskAnswerData.lecturerId.toString()).emit(
                EVENTS.CLIENT.REDUCE_AMOUNT_OF_TASKS,
                {
                  specialTaskId: createdSpecialTaskAnswer.specialTaskId,
                }
              );
            }
          }
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
