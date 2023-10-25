import { Button, Flex, ThemeIcon } from '@mantine/core';
import classes from './Lesson.card.module.css';
import { IconPlus } from '@tabler/icons-react';

function AddLessonCard() {
	const handleAddLesson = () => {
		console.log('Dodawanie lekcji');
	};

	return (
		<Flex
			direction='column'
			h='100%'
			miw={380}
			px='xs'
			py='xl'
			align='center'
			justify='center'
			className={classes.lessonCardWrapper}>
			<Button onClick={handleAddLesson} variant='transparent' className={classes.addLessonCardButton}>
				<ThemeIcon variant='light' c='var(--mantine-primary-color)' size='md'>
					<IconPlus />
				</ThemeIcon>
			</Button>
		</Flex>
	);
}

export default AddLessonCard;
