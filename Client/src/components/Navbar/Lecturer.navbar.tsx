import { Divider, Flex, Group, rem } from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './Navbar.module.css';
import UserPanel from '../UI/UserPanel';

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
			{navLinks.map(link => {
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
			})}
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
