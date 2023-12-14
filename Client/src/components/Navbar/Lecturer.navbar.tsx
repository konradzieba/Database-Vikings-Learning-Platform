import { useMemo } from 'react';
import { Center, Divider, Flex, Group, HoverCard, Loader, Text, rem } from '@mantine/core';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import classes from './Navbar.module.css';
import UserPanel from '../UI/UserPanel';
import { IconChevronDown } from '@tabler/icons-react';
import { useLecturerStore } from '@/utils/stores/useLecturerStore';
import useGetGroupsByLecturerId from '@/hooks/users/useGetGroupsByLecturerId';

interface LecturerNavProps {
	groups: {
		groupId: number;
		groupName: string;
		lessonsCount: number;
		studentsCount: number;
	}[];
	isPending: boolean;
}

function Nav({ groups, isPending }: LecturerNavProps) {
	const { pathname } = useLocation();
	const { id } = useParams();

	const relativeGroupLink = useMemo(
		() => (link: string, groupId: number) => {
			const splitLink = link.split('/');
			if (!splitLink[4]) {
				return `/dashboard/group/${groupId}`;
			}
			if (
				splitLink[4] === 'create-lesson' ||
				splitLink[4] === 'lesson-dashboard' ||
				splitLink[4] === 'check-frequency'
			) {
				return `/dashboard/group/${groupId}`;
			}
			return `/${splitLink[1]}/${splitLink[2]}/${groupId}/${splitLink[4]}`;
		},
		[]
	);

	const getLinkClassName = useMemo(
		() => (isActive: boolean, link: string) => {
			if (
				(isActive && pathname.endsWith(link)) ||
				(isActive && pathname.includes('check-frequency')) ||
				(isActive && pathname.includes('lesson-dashboard'))
			) {
				return `${classes.link} ${classes.activeLink}`;
			}
			return `${classes.link} ${classes.inactiveLink}`;
		},
		[pathname]
	);

	const isGroupPath = useMemo(() => pathname.includes('/dashboard/group/'), [pathname]);

	const groupNavLinks = [
		{
			label: 'Lekcje',
			link: `/dashboard/group/${id}`,
		},
		{
			label: 'Studenci',
			link: `/dashboard/group/${id}/students`,
		},
		{
			label: 'Ranking',
			link: `/dashboard/group/${id}/score-board`,
		},
	];

	return (
		<Group gap='xl'>
			<Group align='center' gap='md'>
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
						{isPending ? (
							<Center miw={rem(60)}>
								<Loader size='sm' />
							</Center>
						) : (
							groups.map((group, index) => {
								let link = relativeGroupLink(pathname, group.groupId);
								return (
									<NavLink to={link} className={`${classes.link} ${classes.inactiveLink}`} key={index}>
										{group.groupName}
									</NavLink>
								);
							})
						)}
					</HoverCard.Dropdown>
				</HoverCard>
				{(pathname.endsWith('/dashboard') || pathname.endsWith('/dashboard/score-board')) && (
					<NavLink
						to={'/dashboard/score-board'}
						className={({ isActive }) => getLinkClassName(isActive, '/dashboard/score-board')}>
						Rankingi zbiorcze
					</NavLink>
				)}
			</Group>
			{isGroupPath && (
				<>
					<Divider orientation='vertical' />
					{groupNavLinks.map(link => (
						<NavLink to={link.link} className={({ isActive }) => getLinkClassName(isActive, link.link)} key={link.link}>
							{link.label}
						</NavLink>
					))}
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
	const { lecturerData } = useLecturerStore();
	const { pathname } = useLocation();
	let { id } = useParams();

	const { data: groupsData, isPending } = useGetGroupsByLecturerId(lecturerData.lecturerId);

	useMemo(() => {
		if (groupsData?.groups) {
			groupsData.groups.sort((a, b) => a.groupId - b.groupId);
		}
	}, [groupsData?.groups]);

	const isGroupPath = useMemo(() => pathname.includes('/dashboard/group/'), [pathname]);

	return (
		<Flex justify='space-around' gap='xl' py='lg' align='center' mb={rem(60)}>
			<Nav groups={groupsData?.groups!} isPending={isPending} />
			<Flex gap='xs' align='center'>
				{isGroupPath && id && groupsData?.groups && (
					<>
						<Text c='var(--mantine-primary-color)' fw={500} size='lg'>
							{groupsData?.groups.find(group => group.groupId === +id!)?.groupName}
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
