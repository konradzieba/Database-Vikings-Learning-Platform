import AddStudentToGroupModal from '@/modals/AddStudentToGroup.modal';
import AddTaskModal from '@/modals/AddTask.modal';
import AddTaskByHandModal from '@/modals/AddTaskByHand.modal';
import ChangeDefaultPasswordModal from '@/modals/ChangeDefaultPassword.modal';
import CorrectFrequencyModal from '@/modals/CorrectFrequency.modal';
import CreateGroupModal from '@/modals/CreateGroup.modal';
import CreateSpecialTaskModal from '@/modals/CreateSpecialTask.modal';
import DeleteGroupModal from '@/modals/DeleteGroup.modal';
import DeleteLessonModal from '@/modals/DeleteLesson.modal';
import DeleteStudentModal from '@/modals/DeleteStudent.modal';
import EditStudentInfoModal from '@/modals/EditStudentInfo.modal';
import ModifyAddedTaskModal from '@/modals/ModifyAddedTask.modal';
import NotAnsweredListModal from '@/modals/NotAnsweredList.modal';
import PreviewCreatedLessonInfoModal from '@/modals/PreviewCreatedLessonInfo.modal';
import PreviewStudentSpecialTaskAnswerModal from '@/modals/PreviewStudentSpecialTaskAnswer.modal';
import RenameGroupModal from '@/modals/RenameGroup.modal';
import ReorderLessonsModal from '@/modals/ReorderLessons/ReorderLessons.modal';
import RestoreDefaultPasswordModal from '@/modals/RestoreDefaultPassword.modal';
import SendSpecialTaskAnswerModal from '@/modals/SendSpecialTaskAnswer.modal';
import SendTaskAnswerModal from '@/modals/SendTaskAnswer.modal';
import SessionExpiredModal from '@/modals/SessionExpire.modal';
import showStudentDefaultPasswordModal from '@/modals/ShowStudentDefaultPassword.modal';
import SpecialTaskDetailsModal from '@/modals/SpecialTaskDetails.modal';
import StudentGroupChangeModal from '@/modals/StudentGroupChange.modal';
import TaskDetailsModal from '@/modals/TaskDetails.modal';
import CreateAnswerReplyModal from '@/modals/CreateAnswerReply.modal';
import EditAnswerReplyModal from '@/modals/EditAnswerReply.modal';
import EditSpecialTaskAnswerReplyModal from '@/modals/EditSpecialTaskAnswerReply';

export default {
	sessionExpired: SessionExpiredModal,
	addTask: AddTaskModal,
	changeStudentGroup: StudentGroupChangeModal,
	restoreDefaultPassword: RestoreDefaultPasswordModal,
	editStudentInfo: EditStudentInfoModal,
	deleteStudent: DeleteStudentModal,
	createAnswerReply: CreateAnswerReplyModal,
	editAnswerReply: EditAnswerReplyModal,
	editSpecialTaskAnswerReply: EditSpecialTaskAnswerReplyModal,
	changeDefaultPassword: ChangeDefaultPasswordModal,
	createGroup: CreateGroupModal,
	sendTaskAnswer: SendTaskAnswerModal,
	notAnsweredList: NotAnsweredListModal,
	taskDetails: TaskDetailsModal,
	modifyAddedTask: ModifyAddedTaskModal,
	previewCreatedLessonInfo: PreviewCreatedLessonInfoModal,
	deleteLesson: DeleteLessonModal,
	reorderLessons: ReorderLessonsModal,
	renameGroup: RenameGroupModal,
	deleteGroup: DeleteGroupModal,
	correctFrequency: CorrectFrequencyModal,
	addTaskByHand: AddTaskByHandModal,
	addStudentToGroup: AddStudentToGroupModal,
	showStudentDefaultPassword: showStudentDefaultPasswordModal,
	sendSpecialTaskAnswer: SendSpecialTaskAnswerModal,
	createSpecialTask: CreateSpecialTaskModal,
	previewStudentSpecialAnswer: PreviewStudentSpecialTaskAnswerModal,
	specialTaskDetails: SpecialTaskDetailsModal,
};
