import { useState } from 'react';
import { Box, Button, Flex, Text } from '@mantine/core';
import { IconPencilMinus } from '@tabler/icons-react';
import classes from './Task.card.module.css';
import { modals } from '@mantine/modals';
import { useParams } from 'react-router-dom';

interface TaskCardProps {
	number: number;
	question: string;
	closeDate: string;
	isMarkdown: boolean;
	isExtra: boolean;
}

function TaskCard({ number, question, closeDate, isMarkdown, isExtra }: TaskCardProps) {
	const { id } = useParams();
	const [isHovered, setIsHovered] = useState(false);

	const handleOpenModifyAddedTaskModal = () => {
		modals.openContextModal({
			modal: 'modifyAddedTask',
			title: `Podgląd zadania ${number}`,
			size: 'xl',
			innerProps: {
				modalBody: '',
				groupId: +id!,
				number: number,
				question: question,
				closeDate: closeDate,
				isMarkdown: isMarkdown,
				isExtra: isExtra,
			},
		});
	};

	return (
		<Box
			className={classes.taskCardContainer}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<Flex justify='center' align='center' h='100%'>
				<Button variant='transparent' onClick={handleOpenModifyAddedTaskModal}>
					<Text size='xl' c='var(--font-color)'>
						{isHovered ? <IconPencilMinus size='1.3rem' /> : `${number}`}
					</Text>
				</Button>
			</Flex>
		</Box>
	);
}

export default TaskCard;
