import { Button, Flex, ThemeIcon } from '@mantine/core';
import classes from './Lesson.card.module.css';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function AddLessonCard() {
	return (
		<Flex
			direction='column'
			mih={589}
			miw={380}
			px='xs'
			py='xl'
			align='center'
			justify='center'
			className={classes.lessonCardWrapper}
		>
			<Button
				component={Link}
				to='create-lesson'
				variant='transparent'
				className={classes.addLessonCardButton}
			>
				<ThemeIcon variant='light' c='var(--mantine-primary-color)' size='md'>
					<IconPlus />
				</ThemeIcon>
			</Button>
		</Flex>
	);
}

export default AddLessonCard;
