import { Divider, Flex, Group, HoverCard, rem } from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './Navbar.module.css';
import UserPanel from '../UI/UserPanel';
import { IconChevronDown } from '@tabler/icons-react';

const mockedUserInfo = {
	email: 'lecturer@test.com',
};

const navLinks = [
	{
		label: 'Grupy',
		link: '/dashboard',
	},
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
			<Group align='center' gap='sm'>
				<HoverCard offset={10}>
					<HoverCard.Target>
						<Group gap={rem(5)} align='center'>
							<NavLink
								to={navLinks[0].link}
								className={({ isActive }) =>
									isActive && pathname.endsWith('dashboard')
										? `${classes.link} ${classes.activeLink}`
										: `${classes.link} ${classes.inactiveLink}`
								}>
								{navLinks[0].label}{' '}
							</NavLink>
							<IconChevronDown size='1.5rem' color='var(--font-color)' />
						</Group>
					</HoverCard.Target>
					<HoverCard.Dropdown px='sm'>
						{['Grupa IV - ISI', 'Grupa II - IO'].map((group, index) => (
							<NavLink
								to='/dashboard/group/1/lessons'
								className={`${classes.link} ${classes.inactiveLink}`}
								key={index}>
								{group}
							</NavLink>
						))}
					</HoverCard.Dropdown>
				</HoverCard>
			</Group>
			{pathname.includes('/dashboard/group/') && (
				<>
					<Divider orientation='vertical' />
					{groupNavLinks.map(link => {
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
