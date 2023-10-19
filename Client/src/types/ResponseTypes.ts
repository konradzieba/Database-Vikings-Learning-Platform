export type TMessageResponse = {
	message: string;
};

type TLecturerInfo = {
	lecturerId: number;
	isAdmin: boolean;
	idCheck: number;
};

type TStudentInfo = {
	studentId: number;
	indexNumber: number;
	score: number;
	health: number;
	rank: number;
	idCheck: number;
};

export type TMeResponse = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	role: UserRole;
} & ({ lecturerInfos: TLecturerInfo } | { studentInfos: TStudentInfo });
