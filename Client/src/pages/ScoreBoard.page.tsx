import ScoreBoard from '@/components/ScoreBoard/ScoreBoard.component';
import { Center, Stack, Tabs, Text } from '@mantine/core';
import { IconTrophy, IconUsersGroup } from '@tabler/icons-react';
import { useSearchParams } from 'react-router-dom';

function ScoreBoardPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const isGlobal = searchParams.get('type') === 'global';
	return (
		<Center>
			<Stack>
				<Tabs defaultValue={isGlobal ? 'global' : 'local'}>
					<Tabs.List mb='lg'>
						<Tabs.Tab
							w='50%'
							c={isGlobal ? undefined : 'var(--mantine-primary-color)'}
							value='local'
							leftSection={<IconUsersGroup />}
							onClick={() => setSearchParams(undefined)}
						>
							<Text c='var(--font-color)' fw={500} fz='md'>
								Grupa
							</Text>
						</Tabs.Tab>
						<Tabs.Tab
							w='50%'
							value='global'
							leftSection={<IconTrophy />}
							c={!isGlobal ? undefined : 'var(--mantine-primary-color)'}
							onClick={() => setSearchParams({ type: 'global' })}
						>
							<Text c='var(--font-color)' fw={500} fz='md'>
								Rok
							</Text>
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value='local'>
						<ScoreBoard type='local' />
					</Tabs.Panel>

					<Tabs.Panel value='global'>
						<ScoreBoard type='global' />
					</Tabs.Panel>
				</Tabs>
			</Stack>
		</Center>
	);
}

export default ScoreBoardPage;
