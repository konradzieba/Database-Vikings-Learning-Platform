import { Button, Flex, ThemeIcon, rem } from '@mantine/core';
import classes from './Group.card.module.css';
import { IconPlus } from '@tabler/icons-react';

function AddGroupCard() {
	const handleOpenCreateGroupModal = () => {
		console.log('Modal to create group opened');
	};

	return (
		<Flex justify='center' align='center' className={classes.groupCardWrapper}>
			<Button onClick={handleOpenCreateGroupModal} variant='transparent' className={classes.addGroupCardButton}>
				<ThemeIcon variant='light' c='var(--mantine-primary-color)' size='md'>
					<IconPlus />
				</ThemeIcon>
			</Button>
		</Flex>
	);
}

export default AddGroupCard;
