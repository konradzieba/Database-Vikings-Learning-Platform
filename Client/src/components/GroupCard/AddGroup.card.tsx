import { Button, Flex, ThemeIcon, rem } from '@mantine/core';
import classes from './Group.card.module.css';
import { IconPlus } from '@tabler/icons-react';

function AddGroupCard() {
	const handleOpenCreateGroupModal = () => {
		console.log('Modal to create group opened');
	};

	return (
		<Button onClick={handleOpenCreateGroupModal} className={classes.groupCardWrapper}>
			<Flex justify='center' align='center'>
				<ThemeIcon variant='light' c='var(--mantine-primary-color)' size='md'>
					<IconPlus size={rem(30)} />
				</ThemeIcon>
			</Flex>
		</Button>
	);
}

export default AddGroupCard;
