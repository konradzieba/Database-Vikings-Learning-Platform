import { useState } from 'react';
import { Box, Button, Flex, Text } from '@mantine/core';
import { IconPencilMinus } from '@tabler/icons-react';
import classes from './Task.card.module.css';

interface TaskCardProps {
	taskNumber: number;
}

function TaskCard({ taskNumber }: TaskCardProps) {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<Box
			className={classes.taskCardContainer}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<Flex justify='center' align='center' h='100%'>
				<Button variant='transparent'>
					<Text size='xl' c='var(--font-color)'>
						{isHovered ? <IconPencilMinus size='1.3rem' /> : `${taskNumber}`}
					</Text>
				</Button>
			</Flex>
		</Box>
	);
}

export default TaskCard;
