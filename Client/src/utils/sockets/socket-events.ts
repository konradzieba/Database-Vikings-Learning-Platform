const SocketEvents = {
	connection: 'connection',
	disconnect: 'disconnect',
	CLIENT: {
		EMIT_SPECIAL_TASK: 'EMIT_SPECIAL_TASK',
	},
	SERVER: {
		RECEIVE_CREATED_SPECIAL_TASK: 'RECEIVE_CREATED_SPECIAL_TASK',
		RECEIVE_SPECIAL_TASK_ANSWER: 'RECEIVE_SPECIAL_TASK_ANSWER',
	},
};

export default SocketEvents;
