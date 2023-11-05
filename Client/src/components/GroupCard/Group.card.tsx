import { Box, Flex, Group, Text, ThemeIcon } from '@mantine/core';
import classes from './Group.card.module.css';
import { IconListTree, IconUsers } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

interface GroupCardProps {
	groupId: number;
	groupName: string;
	assignedStudents: number;
	assignedLessons: number;
}

function GroupCard({ groupId, groupName, assignedStudents, assignedLessons }: GroupCardProps) {
	const navigate = useNavigate();
	const studentsMultiple = (studentsNumber: number) => {
		if (studentsNumber === 1) {
			return `${studentsNumber} student`;
		} else {
			return `${studentsNumber} studentów`;
		}
	};

	const lessonsMultiple = (lessonsNumber: number) => {
		if (lessonsNumber === 1) {
			return `${lessonsNumber} lekcja`;
		}
		if (lessonsNumber < 5 && lessonsNumber > 1) {
			return `${lessonsNumber} lekcje`;
		} else {
			return `${lessonsNumber} lekcji`;
		}
	};
	return (
		<Box component='a' onClick={() => navigate(`group/${groupId}/lessons`)} tabIndex={1}>
			<Flex direction='column' px='md' py='md' gap='md' className={classes.groupCardWrapper}>
				<Text fz='md' fw={500}>
					{groupName}
				</Text>
				<Flex direction='column'>
					<Group>
						<ThemeIcon variant='transparent' c='var(--mantine-primary-color)'>
							<IconUsers />
						</ThemeIcon>
						{studentsMultiple(assignedStudents)}
					</Group>
					<Group>
						<ThemeIcon variant='transparent' c='var(--mantine-primary-color)'>
							<IconListTree />
						</ThemeIcon>
						{lessonsMultiple(assignedLessons)}
					</Group>
				</Flex>
			</Flex>
		</Box>
	);
}

export default GroupCard;
