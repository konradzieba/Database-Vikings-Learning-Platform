import DateTimeDisplay from '@/components/UI/DateTimeDisplay';
import PrimaryButton from '@/components/UI/PrimaryButton';
import {
	Button,
	Flex,
	Group,
	ScrollArea,
	Stack,
	Text,
	Textarea,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { IconClockHour1, IconCode } from '@tabler/icons-react';
import { IconClockHour11 } from '@tabler/icons-react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';

function TaskAnswerPage() {
	const { id } = useParams();
	const answerTextareaRef = useRef<HTMLTextAreaElement>(null);

	const mockData = {
		lessonNumber: 4,
		taskNumber: 1,
		taskQuestion: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. `,
		openDate: '2023-10-19T19:26:15.000Z',
		closeDate: '2023-10-26T19:26:15.000Z',
	};
	return (
		<Flex px='xl' align='flex-start' justify='space-between'>
			<Stack w='50%' gap={0}>
				{/* <Stack gap={0}> */}
				<Title fw={700} py={0} order={2}>
					Zadanie {mockData.taskNumber}
				</Title>
				<Text fw={500} size='lg' my='xs'>
					Lekcja {mockData.lessonNumber}
				</Text>
				<ScrollArea.Autosize type='auto' mah={280} pb='lg' offsetScrollbars='y'>
					<Text size='md' py='md' px='md' style={{ textWrap: 'balance' }}>
						{mockData.taskQuestion}
					</Text>
				</ScrollArea.Autosize>
				<Stack gap='sm'>
					<Group gap='lg' align='flex-start'>
						<ThemeIcon size='lg' variant='transparent'>
							<IconCode size={36} />
						</ThemeIcon>
						<Textarea
							size='md'
							ref={answerTextareaRef}
							w='100%'
							rows={8}
							placeholder='Twoja odpowiedź...'
							style={{ flex: 1 }}
						/>
					</Group>
					<PrimaryButton
						type='submit'
						maw={300}
						style={{ alignSelf: 'flex-end' }}
					>
						Prześlij
					</PrimaryButton>
				</Stack>
			</Stack>
			<Group gap='lg' style={{ justifySelf: 'flex-end' }}>
				<DateTimeDisplay
					title='Data rozpoczęcia'
					icon={<IconClockHour1 size={20} />}
					date={mockData.openDate}
				/>
				<DateTimeDisplay
					title='Data zakończenia'
					icon={<IconClockHour11 size={20} />}
					date={mockData.closeDate}
				/>
			</Group>
		</Flex>
	);
}

export default TaskAnswerPage;
