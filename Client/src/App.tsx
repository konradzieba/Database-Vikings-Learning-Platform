import 'dayjs/locale/pl';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import './global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { resolver, theme } from './theme';
import { MantineProvider, rem } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Router } from './Router';
import queryClient from './utils/query-client';
import dayjs from 'dayjs';
import { DatesProvider } from '@mantine/dates';
import SessionExpiredModal from './modals/SessionExpire.modal';
import AddTaskModal from './modals/AddTask.modal';
import StudentGroupChangeModal from './modals/StudentGroupChange.modal';
import EditStudentInfoModal from './modals/EditStudentInfo.modal';
import DeleteStudentModal from './modals/DeleteStudent.modal';
import PreviewStudentAnswerModal from './modals/PreviewStudentAnswer.modal';
import ChangeDefaultPasswordModal from './modals/ChangeDefaultPassword.modal';
import CreateGroupModal from './modals/CreateGroup.modal';
import SendTaskAnswerModal from './modals/SendTaskAnswer.modal';
import RestoreDefaultPasswordModal from './modals/RestoreDefaultPassword.modal';
import NotAnsweredListModal from './modals/NotAnsweredList.modal';
import TaskDetailsModal from './modals/TaskDetails.modal';
import ModifyAddedTaskModal from './modals/ModifyAddedTask.modal';
import PreviewCreatedLessonInfoModal from './modals/PreviewCreatedLessonInfo.modal';

export default function App() {
	dayjs.locale('pl');
	return (
		<QueryClientProvider client={queryClient}>
			<DatesProvider settings={{ locale: 'pl' }}>
				<MantineProvider theme={{ ...theme }} cssVariablesResolver={resolver} defaultColorScheme='dark'>
					<ModalsProvider
						modals={{
							sessionExpired: SessionExpiredModal,
							addTask: AddTaskModal,
							changeStudentGroup: StudentGroupChangeModal,
							restoreDefaultPassword: RestoreDefaultPasswordModal,
							editStudentInfo: EditStudentInfoModal,
							deleteStudent: DeleteStudentModal,
							previewStudentAnswer: PreviewStudentAnswerModal,
							changeDefaultPassword: ChangeDefaultPasswordModal,
							createGroup: CreateGroupModal,
							sendTaskAnswer: SendTaskAnswerModal,
							notAnsweredList: NotAnsweredListModal,
							taskDetails: TaskDetailsModal,
							modifyAddedTask: ModifyAddedTaskModal,
							previewCreatedLessonInfo: PreviewCreatedLessonInfoModal,
						}}
						labels={{ confirm: 'Prześlij', cancel: 'Anuluj' }}
						modalProps={{ overlayProps: { blur: 2 }, yOffset: rem(100) }}>
						<Router />
					</ModalsProvider>
				</MantineProvider>
			</DatesProvider>
		</QueryClientProvider>
	);
}
