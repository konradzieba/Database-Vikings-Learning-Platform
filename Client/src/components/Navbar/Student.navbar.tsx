import { Flex, Group, Stack, Text, rem } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { IconCoins, IconHeartFilled } from '@tabler/icons-react';
import UserPanel from '../UI/UserPanel';

import classes from './Navbar.module.css';

interface HearthCounterProps {
	hearts: number;
}

const navLinks = [
	{
		label: 'Główna',
		link: '/',
	},
	{
		label: 'Tablica wyników',
		link: '/score-board',
	},
	{
		label: 'Moje zadania',
		link: '/my-tasks',
	},
];

const mockedUserInfo = {
	score: 1600,
	hearts: 2,
	email: '162624@student.uwm.edu.pl',
};

function Nav() {
	return (
		<Group gap='xl'>
			{navLinks.map(link => {
				return (
					<NavLink
						to={link.link}
						className={({ isActive }) =>
							isActive ? `${classes.link} ${classes.activeLink}` : `${classes.link} ${classes.inactiveLink}`
						}
						key={link.link}>
						{link.label}
					</NavLink>
				);
			})}
		</Group>
	);
}

function HeartCounter({ hearts }: HearthCounterProps) {
	return (
		<Group gap={0} py={rem(6.5)}>
			<IconHeartFilled size={22} className={hearts >= 1 ? classes.filledHeart : classes.unfilledHeart} />
			<IconHeartFilled size={22} className={hearts >= 2 ? classes.filledHeart : classes.unfilledHeart} />
			<IconHeartFilled size={22} className={hearts >= 3 ? classes.filledHeart : classes.unfilledHeart} />
		</Group>
	);
}

function Info() {
	return (
		<Group gap='xl'>
			<Stack align='center' gap={rem(1)}>
				<Text size='lg' fw={500}>
					Wynik
				</Text>
				<Group className={classes.score} gap={rem(2)} py={rem(3.1)}>
					<IconCoins size={22} />
					<Text size='lg' fw={500}>
						{mockedUserInfo.score}
					</Text>
				</Group>
			</Stack>
			<Stack align='center' gap={rem(1)}>
				<Text size='lg' fw={500}>
					Życia
				</Text>
				<HeartCounter hearts={mockedUserInfo.hearts} />
			</Stack>
			<UserPanel email={mockedUserInfo.email} className={classes.logoutBtn} />
		</Group>
	);
}

function StudentNavbar() {
	return (
		<Flex justify='space-around' gap='xl' py='lg' align='center' mb={rem(60)}>
			<Nav />
			<Info />
		</Flex>
	);
}

export default StudentNavbar;
