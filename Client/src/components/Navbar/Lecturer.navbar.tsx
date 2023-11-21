import { Center, Divider, Flex, Group, HoverCard, Loader, Text, rem } from '@mantine/core';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import classes from './Navbar.module.css';
import UserPanel from '../UI/UserPanel';
import { IconChevronDown } from '@tabler/icons-react';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';

function Nav() {
	const { pathname } = useLocation();
	const { groups } = useLecturerStore();
	let { id } = useParams();

	const relativeGroupLink = (link: string, groupId: number) => {
		const splitLink = link.split('/');
		if (!splitLink[2]) {
			return `/dashboard/group/${groupId}/lessons`;
		}
		return `/${splitLink[1]}/${splitLink[2]}/${groupId}/${splitLink[4]}`;
	};

	const groupNavLinks = [
		{
			label: 'Lekcje',
			link: `/dashboard/group/${id}/lessons`,
		},
		{
			label: 'Studenci',
			link: `/dashboard/group/${id}/students`,
		},
		{
			label: 'Ranking',
			link: `/dashboard/group/${id}/ranking`,
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
							groups.map((group, index) => {
								let link = relativeGroupLink(pathname, group.groupId);
								return (
									<NavLink to={link} className={`${classes.link} ${classes.inactiveLink}`} key={index}>
										{group.groupName}
									</NavLink>
								);
							})
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
		firstName: string | null;
		lastName: string | null;
		email: string | null;
	};
}
function LecturerNavbar({ lecturerInfo }: LecturerNavbarProps) {
	const { groups } = useLecturerStore();
	const { pathname } = useLocation();
	let { id } = useParams();
	return (
		<Flex justify='space-around' gap='xl' py='lg' align='center' mb={rem(60)}>
			<Nav />
			<Flex gap='xs' align='center'>
				{pathname.includes('/dashboard/group/') && id && groups && (
					<>
						<Text c='var(--mantine-primary-color)' fw={500} size='lg'>
							{groups?.find(group => group.groupId === +id!)?.groupName}
						</Text>
						<Divider orientation='vertical' />
					</>
				)}
				<UserPanel
					firstName={lecturerInfo.firstName}
					lastName={lecturerInfo.lastName}
					email={lecturerInfo.email}
					className={classes.logoutBtn}
				/>
			</Flex>
		</Flex>
	);
}

export default LecturerNavbar;
