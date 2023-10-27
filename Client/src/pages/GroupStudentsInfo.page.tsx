import StudentInfoCard from '@/components/StudentInfoCard/StudentInfo.card';
import { Center, Flex } from '@mantine/core';

const mockData = [
	{
		firstName: 'Roman',
		lastName: 'Romanowski',
		index: 111111,
		score: 420,
		hearts: 3,
		lastLoggedIn: '2023-10-19T19:26:15.000Z',
		currentGroup: 'IV-ISI',
	},
	{
		firstName: 'Jan',
		lastName: 'Kowalski',
		index: 222222,
		score: 900,
		hearts: 2,
		lastLoggedIn: '2023-10-19T19:26:15.000Z',
		currentGroup: 'III-ISI',
	},
	{
		firstName: 'Monika',
		lastName: 'Brodka',
		index: 333333,
		score: 45,
		hearts: 1,
		lastLoggedIn: '2023-10-19T19:26:15.000Z',
		currentGroup: 'I-IO',
	},
	{
		firstName: 'Maciej',
		lastName: 'Maciejowski',
		index: 444444,
		score: 620,
		hearts: 0,
		lastLoggedIn: '2023-10-19T19:26:15.000Z',
		currentGroup: 'III-ISI',
	},
];

function GroupStudentsInfoPage() {
	return (
		<Flex direction='column' align='center' justify='center' gap='md'>
			{mockData.map(data => (
				<StudentInfoCard
					firstName={data.firstName}
					lastName={data.lastName}
					index={data.index}
					score={data.score}
					hearts={data.hearts}
					lastLoggedIn={data.lastLoggedIn}
					currentGroup={data.currentGroup}
				/>
			))}
		</Flex>
	);
}

export default GroupStudentsInfoPage;
