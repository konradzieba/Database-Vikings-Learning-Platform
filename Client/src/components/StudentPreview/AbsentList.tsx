import { List, Text, rem } from '@mantine/core';

interface AbsentListProps {
	absentLessonNumbers: number[];
}

function AbsentList({ absentLessonNumbers }: AbsentListProps) {
	return (
		<List type='ordered' fz='lg'>
			{absentLessonNumbers.length === 0 ? (
				<Text size='lg' c='dimmed' fs='italic'>
					Brak
				</Text>
			) : (
				absentLessonNumbers.map((lessonNumber) => (
					<List.Item key={lessonNumber} my={rem(5)}>
						<Text size='lg'>
							Lekcja nr&nbsp;
							<Text span fw={500}>
								{lessonNumber}
							</Text>
						</Text>
					</List.Item>
				))
			)}
		</List>
	);
}

export default AbsentList;
