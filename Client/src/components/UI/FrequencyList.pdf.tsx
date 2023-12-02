import { Page, Font, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs';

Font.register({
	family: 'Roboto',
	src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

const styles = StyleSheet.create({
	page: {
		fontFamily: 'Roboto',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: '#E4E4E4',
	},
	section: {
		marginTop: '10px',
	},
	heading1: {
		fontSize: '16px',
	},
	heading2: {
		fontSize: '14px',
	},
	table: {
		marginTop: '10px',
		width: '80%',
		color: '#F8F9FA',
	},
	tableRow: {
		margin: 'auto',
		flexDirection: 'row',
	},
	date: {
		fontSize: '12px',
		alignSelf: 'flex-end',
		marginRight: '5px',
		marginTop: '2px',
		marginBottom: '10px',
	},
	tableCol: {
		width: '33%',
		height: '25px',
	},
	tableHeader: {
		backgroundColor: '#099268',
	},
	tableDateEven: {
		marginTop: '2px',
		backgroundColor: '#1C1C1C',
	},
	tableDateOdd: {
		marginTop: '2px',
		backgroundColor: '#2E2E2E',
	},
	tableCell: {
		margin: 'auto',
		fontSize: 12,
	},
});

interface FrequencyListPDFProps {
	lessonNumber: number;
	groupName: string;
	studentsFromGroup: {
		id: number;
		firstName: string;
		lastName: string;
		indexNumber: number;
		score: number;
		health: number;
		groupId: number;
		lastLogin: string;
		userId: number;
	}[];
	newStudentListIds: number[];
	oldStudentListIds: number[];
	isFrequencyChecked: boolean;
}

function FrequencyListPDF({
	lessonNumber,
	groupName,
	studentsFromGroup,
	newStudentListIds,
	oldStudentListIds,
	isFrequencyChecked,
}: FrequencyListPDFProps) {
	const todaysDate = dayjs().format('DD-MM-YYYY, HH:mm:ss').toString();

	const handleShowFrequencyStatus = (studentId: number) => {
		if (isFrequencyChecked) {
			if (newStudentListIds.includes(studentId)) {
				return 'Nieobecny';
			} else {
				return 'Obecny';
			}
		} else {
			if (oldStudentListIds.includes(studentId) || newStudentListIds.includes(studentId)) {
				return 'Nieobecny';
			} else {
				return 'Obecny';
			}
		}
	};

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.date}>
					<Text>{todaysDate}</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.heading1}>Lista obecności</Text>
					<Text style={styles.heading2}>
						Lekcja {lessonNumber}, {groupName}
					</Text>
				</View>
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={[styles.tableCol, styles.tableHeader]}>
							<Text style={styles.tableCell}>Index</Text>
						</View>
						<View style={[styles.tableCol, styles.tableHeader]}>
							<Text style={styles.tableCell}>Imię i nazwisko</Text>
						</View>
						<View style={[styles.tableCol, styles.tableHeader]}>
							<Text style={styles.tableCell}></Text>
						</View>
					</View>
					{studentsFromGroup.map((student, index) => {
						const frequencyStatus = handleShowFrequencyStatus(student.id);
						return (
							<View style={styles.tableRow} key={index}>
								<View style={[styles.tableCol, styles.tableDateEven]}>
									<Text style={styles.tableCell}>{student.indexNumber}</Text>
								</View>
								<View style={[styles.tableCol, styles.tableDateEven]}>
									<Text style={styles.tableCell}>
										{student.firstName} {student.lastName}
									</Text>
								</View>
								<View style={[styles.tableCol, styles.tableDateEven]}>
									<Text style={styles.tableCell}>{frequencyStatus}</Text>
								</View>
							</View>
						);
					})}
				</View>
			</Page>
		</Document>
	);
}

export default FrequencyListPDF;
