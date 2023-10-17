import { Button, Flex, Group, Stack, Text, rem } from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconCoins, IconHeartFilled } from '@tabler/icons-react';
import classes from './Student.Navbar.module.css';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logoutQueryFn } from '@/utils/axios-queries';

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
		link: '/scoreboard',
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
			{navLinks.map((link) => {
				return (
					<NavLink
						to={link.link}
						className={({ isActive }) =>
							isActive
								? `${classes.link} ${classes.activeLink}`
								: `${classes.link} ${classes.inactiveLink}`
						}
						key={link.link}
					>
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
			<IconHeartFilled
				size={22}
				className={hearts >= 1 ? classes.filledHeart : classes.unfilledHeart}
			/>
			<IconHeartFilled
				size={22}
				className={hearts >= 2 ? classes.filledHeart : classes.unfilledHeart}
			/>
			<IconHeartFilled
				size={22}
				className={hearts >= 3 ? classes.filledHeart : classes.unfilledHeart}
			/>
		</Group>
	);
}

function Info() {
	const navigate = useNavigate();

	const logoutMutation = useMutation({
		mutationFn: logoutQueryFn,
		onSuccess: () => {
			navigate('/login');
		},
		onError: (error: AxiosError) => {
			console.error(error);
		},
	});

	return (
		<Group gap='xl'>
			<Stack align='center' gap={1}>
				<Text size='lg' fw={500}>
					Wynik
				</Text>
				<Group className={classes.score} gap={2} py={3.1}>
					<IconCoins size={22} />
					<Text size='lg' fw={500}>
						{mockedUserInfo.score}
					</Text>
				</Group>
			</Stack>
			<Stack align='center' gap={1}>
				<Text size='lg' fw={500}>
					Życia
				</Text>
				<HeartCounter hearts={mockedUserInfo.hearts} />
			</Stack>
			<Stack gap={0} align='flex-end'>
				<Text size='lg' fw={500}>
					{mockedUserInfo.email}
				</Text>
				<Button
					ta='right'
					variant='transparent'
					px={0}
					onClick={() => {
						logoutMutation.mutate();
					}}
				>
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
		<Flex justify='space-around' gap='xl' py='lg' align='center'>
			<Nav />
			<Info />
		</Flex>
	);
}

export default StudentNavbar;
