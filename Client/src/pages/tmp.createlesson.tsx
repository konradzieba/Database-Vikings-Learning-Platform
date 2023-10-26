// import {
// 	Avatar,
// 	Button,
// 	Center,
// 	Flex,
// 	Group,
// 	Paper,
// 	ScrollArea,
// 	SimpleGrid,
// 	Stack,
// 	Text,
// 	ThemeIcon,
// 	Title,
// 	rem,
// } from '@mantine/core';
// import { IconArrowUpRight, IconPlus } from '@tabler/icons-react';
// import { useNavigate } from 'react-router-dom';
// import lesson1 from '@/assets/lesson1.png';
// import { useState } from 'react';
// import { set } from 'zod';

// const data = {
// 	lessonNumber: 4,
// 	groupName: 'Grupa 2 ISI',
// 	taskNumbers: [1, 2, 3, 4, 5, 6, 7, 8],
// 	avatars: [
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 		lesson1,
// 	],
// };

// interface TaskTabProps {
// 	taskNumber: number;
// }
// function Tmp({ taskNumber }: TaskTabProps) {
// 	return (
// 		<Button
// 			miw={150}
// 			variant='default'
// 			leftSection={<Text size='sm'>{`Zadanie ${taskNumber}`}</Text>}
// 			rightSection={<IconArrowUpRight size='1.4rem' />}
// 		></Button>
// 	);
// }

// function CreateLessonPage() {
// 	const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
// 	const navigate = useNavigate();

// 	const handleCreateLesson = () => {
// 		console.log('Tworzenie lekcji bez sprawdzania obecności');
// 	};

// 	const handleCreateLessonAndCheckFrequency = () => {
// 		console.log('Tworzenie lekcji i sprawdzenie obecności');
// 		navigate('/dashboard/group/1/lessons/checkFrequency');
// 	};

// 	return (
// 		// <Center>
// 		<Stack>
// 			<Title order={2} mx='auto'>
// 				{data.groupName}
// 			</Title>
// 			<Title order={3} mx='auto' mb='lg'>
// 				Tworzenie lekcji&nbsp;
// 				<Text span fz='inherit' fw='inherit' c='var(--mantine-primary-color)'>
// 					{data.lessonNumber}
// 				</Text>
// 			</Title>
// 			<Flex justify='space-evenly'>
// 				<Paper withBorder px='lg' py='sm' bg='transparent'>
// 					<Title order={4} my='sm' ta='center'>
// 						Zadania
// 					</Title>
// 					<ScrollArea type='auto' px='md' h={300} offsetScrollbars>
// 						<SimpleGrid cols={2}>
// 							{data.taskNumbers.map((taskNumber) => (
// 								<TaskTab key={taskNumber} taskNumber={taskNumber} />
// 							))}
// 						</SimpleGrid>
// 					</ScrollArea>
// 					<Center mt='md'>
// 						<Button
// 							miw={300}
// 							// variant='default'
// 							c='var(--mantine-primary-color)'
// 						>
// 							<ThemeIcon size='sm' variant='transparent'>
// 								<IconPlus />
// 							</ThemeIcon>
// 						</Button>
// 					</Center>
// 				</Paper>
// 				<Paper withBorder px='lg' py='sm' bg='transparent' maw='50%' h='100%'>
// 					<Title order={4} mx='auto' mb='lg' ta='center'>
// 						Grafika zadania
// 					</Title>
// 					<ScrollArea type='auto' px='md' h={300} offsetScrollbars>
// 						<Stack>
// 							<SimpleGrid cols={3}>
// 								{data.avatars.map((avatar, index) => (
// 									<Avatar
// 										src={avatar}
// 										key={index}
// 										size='xl'
// 										style={{ border: '2px solid green' }}
// 										onClick={() => setSelectedPhoto(avatar)}
// 									/>
// 								))}
// 							</SimpleGrid>
// 						</Stack>
// 					</ScrollArea>
// 				</Paper>
// 			</Flex>
// 			<Group mx='auto'>
// 				<Button variant='outline' onClick={handleCreateLesson}>
// 					Stwórz
// 				</Button>
// 				<Button onClick={handleCreateLessonAndCheckFrequency}>
// 					Stwórz i sprawdz obecność
// 				</Button>
// 			</Group>
// 		</Stack>
// 		// </Center>
// 	);
// }

// export default Tmp;
