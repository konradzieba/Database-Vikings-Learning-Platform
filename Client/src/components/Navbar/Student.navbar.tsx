import { Button, Flex, Group, Rating, Stack, Text, rem } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { IconCoins, IconHeartFilled } from '@tabler/icons-react';
import classes from './Student.Navbar.module.css';

const navLinks = [
	{
		label: 'Główna',
		link: '/',
	},
	{
		label: 'Tablica wyników',
		link: '/scoreboard',
	},
	{
		label: 'Moje zadania',
		link: '/my-tasks',
	},
];

const mockedUserInfo = {
	score: 600,
	lifes: 3,
	email: '162624@student.uwm.edu.pl',
};

function Nav() {
	return (
		<>
			{navLinks.map((link) => {
				return (
					<NavLink
						to={link.link}
						className={({ isActive }) =>
							isActive ? `${classes.link} ${classes.activeLink}` : classes.link
						}
						key={link.link}
					>
						{link.label}
					</NavLink>
				);
			})}
		</>
	);
}

function Info() {
	return (
		<Group>
			<Stack align='center' gap={1}>
				<Text size='lg' fw={500}>
					Wynik
				</Text>
				<Group className={classes.score}>
					<IconCoins size={18} />
					<Text size='lg' fw={500}>
						{mockedUserInfo.score}
					</Text>
				</Group>
			</Stack>
			<Stack align='center' gap={1}>
				<Text size='lg' fw={500}>
					Życia
				</Text>
				<Group>
					<Rating
						defaultValue={2}
						readOnly
						count={3}
						emptySymbol={
							<IconHeartFilled size={22} className={classes.unfilledHeart} />
						}
						fullSymbol={
							<IconHeartFilled size={22} className={classes.filledHeart} />
						}
					/>
				</Group>
			</Stack>
			<Stack gap={1} align='flex-end'>
				<Text size='lg' fw={500}>
					{mockedUserInfo.email}
				</Text>
				<Button ta='right' variant='transparent'>
					<Text size='lg' fw={500} className={classes.logoutBtn}>
						Wyloguj
					</Text>
				</Button>
			</Stack>
		</Group>
	);
}

function StudentNavbar() {
	return (
		<Flex justify='space-between' mx='xl'>
			<Nav />
			<Info />
		</Flex>
	);
}

export default StudentNavbar;
