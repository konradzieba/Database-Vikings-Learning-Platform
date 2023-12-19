import { Button, Divider, Flex, Group, HoverCard, Indicator, Stack, Text, ThemeIcon, rem } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { IconClock, IconCoins, IconStar, IconStarFilled } from '@tabler/icons-react';
import UserPanel from '../UI/UserPanel';
import classes from './Navbar.module.css';
import HeartCounter from '../UI/HeartCounter';

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
	{
		label: 'Statystyki',
		link: '/my-stats',
	},
];

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
			<Flex style={{ alignSelf: 'flex-start' }}>
				<HoverCard width={280} shadow='md' withArrow arrowSize={15}>
					<HoverCard.Target>
						{/* disabled or not when special task pops up */}
						<Indicator color='red' size={7}>
							<ThemeIcon variant='transparent' size={rem(24)} c='var(--special-task-color)'>
								<IconStarFilled />
							</ThemeIcon>
						</Indicator>
					</HoverCard.Target>
					<HoverCard.Dropdown>
						{/* text or card render depends on is there a special task added */}
						{/* :taskId will be changed depend on specialTaskID */}
						<Flex direction='column' gap='sm'>
							<NavLink to={`special-task/1`} className={classes.specialTaskCard}>
								<Text fw={500}>Zadanie specjalne 1</Text>
								<Group>
									<IconClock />
									<Text>00-00-2000 15:15</Text>
								</Group>
							</NavLink>
							<Text mx='auto' c='dimmed' fs='italic'>
								Brak zadań specjalnych
							</Text>
							<Divider />
							<NavLink to='/my-special-tasks' className={classes.specialTaskButton}>
								Moje zadania specjalne
							</NavLink>
						</Flex>
					</HoverCard.Dropdown>
				</HoverCard>
			</Flex>
		</Group>
	);
}

interface InfoProps {
	studentInfo: StudentNavbarProps['studentInfo'];
}
function Info({ studentInfo }: InfoProps) {
	return (
		<Group gap='xl'>
			<Stack align='center' gap={rem(1)}>
				<Text size='lg' fw={500}>
					Wynik
				</Text>
				<Group className={classes.score} gap={rem(2)} py={rem(3.1)}>
					<ThemeIcon variant='transparent' size={rem(24)} className={classes.score}>
						<IconCoins />
					</ThemeIcon>
					<Text size='lg' fw={500}>
						{studentInfo.score}
					</Text>
				</Group>
			</Stack>
			<Stack align='center' gap={rem(1)}>
				<Text size='lg' fw={500}>
					Życia
				</Text>
				<HeartCounter hearts={studentInfo.health} />
			</Stack>
			<UserPanel
				firstName={studentInfo.firstName}
				lastName={studentInfo.lastName}
				email={studentInfo.email}
				className={classes.logoutBtn}
			/>
		</Group>
	);
}

interface StudentNavbarProps {
	studentInfo: {
		firstName: string | null;
		lastName: string | null;
		score: number | null;
		health: number | null;
		email: string | null;
	};
}
function StudentNavbar({ studentInfo }: StudentNavbarProps) {
	return (
		<Flex justify='space-around' gap='xl' py='lg' align='center' mb={rem(60)}>
			<Nav />
			<Info studentInfo={studentInfo} />
		</Flex>
	);
}

export default StudentNavbar;
