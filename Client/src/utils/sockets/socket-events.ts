const SocketEvents = {
	connection: 'connection',
	disconnect: 'disconnect',
	CLIENT: {
		EMIT_SPECIAL_TASK: 'EMIT_SPECIAL_TASK',
		JOIN_ROOM: 'JOIN_ROOM',
	},
	SERVER: {
		RECEIVE_CREATED_SPECIAL_TASK: 'RECEIVE_CREATED_SPECIAL_TASK',
		RECEIVE_SPECIAL_TASK_ANSWER: 'RECEIVE_SPECIAL_TASK_ANSWER',
		ERROR_CREATING_SPECIAL_TASK: 'ERROR_CREATING_SPECIAL_TASK',
		SUCCESS_CREATING_SPECIAL_TASK: 'SUCCESS_CREATING_SPECIAL_TASK',
	},
};

export default SocketEvents;
