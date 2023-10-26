import {
	Box,
	Button,
	Divider,
	Flex,
	Group,
	HoverCard,
	Stack,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './Navbar.module.css';
import UserPanel from '../UI/UserPanel';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

const mockedUserInfo = {
	email: 'lecturer@test.com',
};

const navLinks = [
	{
		label: 'Grupy',
		link: '/dashboard',
	},
	// {
	// 	label: 'Ranking',
	// 	link: '/dashboard/score-board',
	// },
];

const groupNavLinks = [
	{
		label: 'Lekcje',
		link: '/dashboard/group/1/lessons',
	},
	{
		label: 'Studenci',
		link: '/dashboard/group/1/students',
	},
	{
		label: 'Ranking',
		link: '/dashboard/group/1/ranking',
	},
];

function Nav() {
	const { pathname } = useLocation();
	return (
		<Group gap='xl'>
			{/* {navLinks.map(link => {
				return (
					<NavLink
						to={link.link}
						className={({ isActive }) =>
							isActive && pathname.endsWith('dashboard')
								? `${classes.link} ${classes.activeLink}`
								: `${classes.link} ${classes.inactiveLink}`
						}
						key={link.link}>
						{link.label}
					</NavLink>
				);
			})} */}

			<Group align='center' gap='sm'>
				<HoverCard
					// onOpen={() => setIsMenuOpen(true)}
					// onClose={() => setIsMenuOpen(false)}
					offset={10}
				>
					<HoverCard.Target>
						<Group
							gap={rem(5)}
							align='center'
							// size='sm'
							// variant='transparent'
							// rightSection={
							// 	<IconChevronDown size='1.5rem' color='var(--font-color)' />
							// }
						>
							<NavLink
								to={navLinks[0].link}
								className={({ isActive }) =>
									isActive && pathname.endsWith('dashboard')
										? `${classes.link} ${classes.activeLink}`
										: `${classes.link} ${classes.inactiveLink}`
								}
							>
								{navLinks[0].label}{' '}
							</NavLink>
							<IconChevronDown size='1.5rem' color='var(--font-color)' />
						</Group>
					</HoverCard.Target>
					<HoverCard.Dropdown px='sm'>
						<Stack gap='xs'>
							{['Grupa IV - ISI', 'Grupa II - IO'].map((group) => (
								<Button variant='default'>
									<NavLink
										to='/dashboard/group/1/lessons'
										className={`${classes.link} ${classes.inactiveLink} ${classes.groupHoverCardItem} ${classes.groupHoverCardItemDropdown}`}
									>
										{group}
									</NavLink>
								</Button>
							))}
						</Stack>
					</HoverCard.Dropdown>
				</HoverCard>
			</Group>
			{pathname.includes('/dashboard/group/') && (
				<>
					<Divider orientation='vertical' />
					{groupNavLinks.map((link) => {
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
				</>
			)}
		</Group>
	);
}

function LecturerNavbar() {
	return (
		<Flex justify='space-around' gap='xl' py='lg' align='center' mb={rem(60)}>
			<Nav />
			<UserPanel email={mockedUserInfo.email} className={classes.logoutBtn} />
		</Flex>
	);
}

export default LecturerNavbar;
