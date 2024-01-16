import { Button, Flex, Tabs, Text, rem } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useSearchParams } from 'react-router-dom';

interface SpecialTaskAnswersStatsProps {
	specialTaskId: number;
}

function SpecialTaskAnswersStats({ specialTaskId }: SpecialTaskAnswersStatsProps) {
	const [_, setSearchParams] = useSearchParams();

	const handleOpenSpecialTaskDetailsModal = () => {
		modals.openContextModal({
			modal: 'specialTaskDetails',
			title: 'Szczegóły zadania specjalnego',
			size: 'xl',
			closeOnClickOutside: false,
			innerProps: {
				specialTaskId: specialTaskId,
				modalBody: '',
			},
		});
	};

	return (
		<Flex gap={rem(10)} justify='space-between' align='center' mx='lg' mt='sm'>
			<Tabs miw={450} defaultValue='notReplied'>
				<Tabs.List grow>
					<Tabs.Tab value='notReplied' onClick={() => setSearchParams(undefined)}>
						<Text fz='md' fw={500}>
							Do sprawdzenia
						</Text>
					</Tabs.Tab>
					<Tabs.Tab value='replied' onClick={() => setSearchParams({ status: 'replied' })}>
						<Text fz='md' fw={500}>
							Sprawdzone
						</Text>
					</Tabs.Tab>
				</Tabs.List>
			</Tabs>
			<Button size='xs' c='var(--font-color)' fz='md' variant='outline' onClick={handleOpenSpecialTaskDetailsModal}>
				Szczegóły zadania
			</Button>
		</Flex>
	);
}

export default SpecialTaskAnswersStats;
