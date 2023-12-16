import { Button, Center, Flex, Image, Stack, Text, rem } from '@mantine/core';
import vikingConfused from '@/assets/vikingConfused.webp';
import classes from './DataNotFound.module.css';
import { modals } from '@mantine/modals';

interface DataNotFoundProps {
	firstLineText: string;
	secondLineText: string;
	withAddStudentButton?: boolean;
	groupId?: number;
}

function DataNotFound({
	firstLineText,
	secondLineText,
	withAddStudentButton,
	groupId,
}: DataNotFoundProps) {
	const handleOpenAddStudentToGroupModal = () => {
		modals.openContextModal({
			modal: 'addStudentToGroup',
			title: 'Dodaj studenta do grupy',
			size: 'md',
			closeOnClickOutside: false,
			innerProps: {
				groupId: +groupId!,
			},
		});
	};
	return (
		<Flex justify='center' align='center' h={rem(550)}>
			<Image src={vikingConfused} alt='happy viking holding beer' />
			<Center>
				<Stack gap={0} lts={rem(3)}>
					<Text fz={rem(50)} fw={500} className={classes.infoText}>
						Ups..
					</Text>
					<Text fz={rem(50)} fw={500} className={classes.infoText}>
						{firstLineText}
					</Text>
					<Text fz={rem(50)} fw={500} className={classes.infoText}>
						{secondLineText}.
					</Text>
					{withAddStudentButton && (
						<Button
							mx='auto'
							mt='md'
							onClick={handleOpenAddStudentToGroupModal}
						>
							Dodaj studenta do grupy
						</Button>
					)}
				</Stack>
			</Center>
		</Flex>
	);
}

export default DataNotFound;
