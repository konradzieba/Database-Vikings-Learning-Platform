import { Flex, Group, rem } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';
import UserPanel from '../UI/UserPanel';

const mockedUserInfo = {
	email: 'lecturer@test.com',
};

const navLinks = [
	{
		label: 'Główna',
		link: '/dashboard',
	},
	{
		label: 'Ranking',
		link: '/dashboard/score-board',
	},
];

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

function LecturerNavbar() {
	return (
		<Flex justify='space-around' gap='xl' py='lg' align='center' mb={rem(60)}>
			<Nav />
			<UserPanel email={mockedUserInfo.email} className={classes.logoutBtn} />
		</Flex>
	);
}

export default LecturerNavbar;
