import { useState } from 'react';
import { Center, Loader, Stack, Tabs, Text } from '@mantine/core';
import { IconTrophy, IconUsersGroup } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';

import useGetScoreBoardQuery from '@/hooks/users/useGetScoreBoardQuery';

import ScoreBoardLecturer from '@/components/ScoreBoard/ScoreBoardLecturer.component';

function GlobalScoreBoardLecturerPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const isGlobal = searchParams.get('type') === 'global';
	const { data: scoreBoardData, isPending } = useGetScoreBoardQuery();

	const filteredBySearchTerm = scoreBoardData?.scoreBoard.filter(
		(student) =>
			student.indexNumber.toString().includes(searchTerm) ||
			`${student.User.firstName} ${student.User.lastName}`
				.toLowerCase()
				.includes(searchTerm.toLowerCase())
	);

	if (isPending) {
		return (
			<Center h={250}>
				<Loader />
			</Center>
		);
	}

	return (
		<Stack>
			<Tabs defaultValue={isGlobal ? 'global' : 'my-groups'}>
				<Tabs.List mb='lg'>
					<Tabs.Tab
						w='50%'
						c={isGlobal ? undefined : 'var(--mantine-primary-color)'}
						value='my-groups'
						leftSection={<IconUsersGroup size='1.5rem' />}
						onClick={() => setSearchParams(undefined)}
					>
						<Text c='var(--font-color)' fw={500} fz='md'>
							Moje grupy
						</Text>
					</Tabs.Tab>
					<Tabs.Tab
						w='50%'
						value='global'
						leftSection={<IconTrophy size='1.5rem' />}
						c={!isGlobal ? undefined : 'var(--mantine-primary-color)'}
						onClick={() => setSearchParams({ type: 'global' })}
					>
						<Text c='var(--font-color)' fw={500} fz='md'>
							Wszystkie grupy
						</Text>
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value='my-groups'>
					<ScoreBoardLecturer
						type='my-groups'
						scoreBoardData={filteredBySearchTerm}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				</Tabs.Panel>

				<Tabs.Panel value='global'>
					<ScoreBoardLecturer
						type='my-groups'
						scoreBoardData={filteredBySearchTerm}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
					/>
				</Tabs.Panel>
			</Tabs>
		</Stack>
	);
}

export default GlobalScoreBoardLecturerPage;
