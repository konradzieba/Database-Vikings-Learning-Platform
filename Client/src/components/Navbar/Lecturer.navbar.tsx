import { Center, Divider, Flex, Group, HoverCard, Loader, rem } from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';
import classes from './Navbar.module.css';
import UserPanel from '../UI/UserPanel';
import { IconChevronDown } from '@tabler/icons-react';
import { useLecturerStore } from '@/utils/store';

function Nav() {
	const { pathname } = useLocation();
	const { groups } = useLecturerStore();

	const groupNavLinks = [
		{
			label: 'Lekcje',
			link: `/dashboard/group/${pathname.split('/')[3]}/lessons`,
		},
		{
			label: 'Studenci',
			link: `/dashboard/group/${pathname.split('/')[3]}/students`,
		},
		{
			label: 'Ranking',
			link: `/dashboard/group/${pathname.split('/')[3]}/ranking`,
		},
	];

	return (
		<Group gap='xl'>
			<Group align='center' gap='sm'>
				<HoverCard offset={10}>
					<HoverCard.Target>
						<Group gap={rem(5)} align='center'>
							<NavLink
								to={'/dashboard'}
								className={({ isActive }) =>
									isActive && pathname.endsWith('dashboard')
										? `${classes.link} ${classes.activeLink}`
										: `${classes.link} ${classes.inactiveLink}`
								}>
								Grupy
							</NavLink>
							<IconChevronDown size='1.5rem' color='var(--font-color)' />
						</Group>
					</HoverCard.Target>
					<HoverCard.Dropdown px='sm'>
						{groups?.length ? (
							groups.map((group, index) => (
								<NavLink
									to={`/dashboard/group/${group.groupId}/lessons`}
									className={`${classes.link} ${classes.inactiveLink}`}
									key={index}>
									{group.groupName}
								</NavLink>
							))
						) : (
							<Center miw={rem(60)}>
								<Loader size='sm' />
							</Center>
						)}
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

interface LecturerNavbarProps {
	lecturerInfo: {
		email: string | null;
	};
}
function LecturerNavbar({ lecturerInfo }: LecturerNavbarProps) {
	return (
		<Flex justify='space-around' gap='xl' py='lg' align='center' mb={rem(60)}>
			<Nav />
			<UserPanel email={lecturerInfo.email} className={classes.logoutBtn} />
		</Flex>
	);
}

export default LecturerNavbar;
