import { Button, Flex, ThemeIcon } from '@mantine/core';
import classes from './Group.card.module.css';
import { IconPlus } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useMeQuery } from '@/hooks/users/useMeQuery';

function AddGroupCard() {
	const { refetch } = useMeQuery();
	const handleOpenCreateGroupModal = () => {
		modals.openContextModal({
			modal: 'createGroup',
			title: 'Stwórz grupę',
			size: 'xl',
			closeOnClickOutside: false,
			onClose: () => refetch(),
			innerProps: {},
		});
	};

	return (
		<Flex
			justify='center'
			align='center'
			className={classes.addGroupCardWrapper}
		>
			<Button
				onClick={handleOpenCreateGroupModal}
				variant='transparent'
				className={classes.addGroupCardButton}
			>
				<ThemeIcon variant='light' c='var(--mantine-primary-color)' size='md'>
					<IconPlus />
				</ThemeIcon>
			</Button>
		</Flex>
	);
}

export default AddGroupCard;
