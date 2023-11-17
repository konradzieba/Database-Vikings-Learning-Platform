import ScoreBoardStudent from '@/components/ScoreBoard/ScoreBoardStudent.component';
import useGetScoreBoardQuery from '@/hooks/users/useGetScoreBoardQuery';
import { useStudentStore } from '@/utils/stores/useStudentStore';
import { Center, Loader, Stack, Tabs, Text } from '@mantine/core';
import { IconTrophy, IconUsersGroup } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';

function ScoreBoardPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { studentData } = useStudentStore();
	const { data: scoreBoardData, isPending } = useGetScoreBoardQuery();
	const isGlobal = searchParams.get('type') === 'global';
	const studentInfo = {
		studentId: studentData?.studentId,
		groupId: studentData?.groupId,
	};

	if (isPending) {
		return (
			<Center h={120}>
				<Loader />
			</Center>
		);
	}

	return (
		<Center>
			<Stack>
				<Tabs defaultValue={isGlobal ? 'global' : 'local'}>
					<Tabs.List mb='lg'>
						<Tabs.Tab
							w='50%'
							c={isGlobal ? undefined : 'var(--mantine-primary-color)'}
							value='local'
							leftSection={<IconUsersGroup size='1.5rem' />}
							onClick={() => setSearchParams(undefined)}>
							<Text c='var(--font-color)' fw={500} fz='md'>
								Grupa
							</Text>
						</Tabs.Tab>
						<Tabs.Tab
							w='50%'
							value='global'
							leftSection={<IconTrophy size='1.5rem' />}
							c={!isGlobal ? undefined : 'var(--mantine-primary-color)'}
							onClick={() => setSearchParams({ type: 'global' })}>
							<Text c='var(--font-color)' fw={500} fz='md'>
								Rok
							</Text>
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value='local'>
						<ScoreBoardStudent type='local' studentInfo={studentInfo} scoreBoardData={scoreBoardData} />
					</Tabs.Panel>

					<Tabs.Panel value='global'>
						<ScoreBoardStudent type='global' studentInfo={studentInfo} scoreBoardData={scoreBoardData} />
					</Tabs.Panel>
				</Tabs>
			</Stack>
		</Center>
	);
}

export default ScoreBoardPage;
