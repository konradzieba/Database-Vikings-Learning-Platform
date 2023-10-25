import { Divider, Flex, Group, Menu, Popover, Stack, Text, ThemeIcon, rem } from '@mantine/core';
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);
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
				<NavLink
					to={navLinks[0].link}
					className={({ isActive }) =>
						isActive && pathname.endsWith('dashboard')
							? `${classes.link} ${classes.activeLink}`
							: `${classes.link} ${classes.inactiveLink}`
					}>
					{navLinks[0].label}
				</NavLink>
				<Menu onOpen={() => setIsMenuOpen(true)} onClose={() => setIsMenuOpen(false)} position='bottom-end' offset={20}>
					<Menu.Target>
						<ThemeIcon
							variant='transparent'
							className={isMenuOpen ? `${classes.rotateGroupMenuIcon}` : `${classes.groupMenuIcon}`}
							size='md'
							mb={5}
							c='var(--font-color)'>
							<IconChevronDown />
						</ThemeIcon>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Item>
							<NavLink
								to='/dashboard/group/1/lessons'
								className={`${classes.link} ${classes.inactiveLink} ${classes.groupMenuItem}`}>
								Grupa - ISI - 3
							</NavLink>
						</Menu.Item>
						<Menu.Item>
							<NavLink
								to='/dashboard/group/1/lessons'
								className={`${classes.link} ${classes.inactiveLink} ${classes.groupMenuItem}`}>
								Grupa - ISI - 4
							</NavLink>
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
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
