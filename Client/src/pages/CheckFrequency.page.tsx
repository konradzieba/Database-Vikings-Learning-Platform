import FrequencyList from '@/components/FrequencyList/FrequencyList.component';
import { Button, Center, Group, Stack, Title } from '@mantine/core';

function CheckFrequencyPage() {
	const handleCheckFrequency = () => {
		console.log('Sprawdzenie obecności bez generowania pdf');
	};

	const handleCheckFrequencyAndGeneratePDF = () => {
		console.log('Sprawdzenie obecności i wygenerowanie PDF');
	};

	return (
		<Center>
			<Stack>
				<Stack align='center'>
					<Title>Obecność</Title>
					<Title order={2}>Lekcja&nbsp;4</Title>
				</Stack>
				<FrequencyList />
				<Group justify='center'>
					<Button variant='outline' onClick={handleCheckFrequency}>
						Potwierdź
					</Button>
					<Button onClick={handleCheckFrequencyAndGeneratePDF}>Potwierdź i wygeneruj PDF</Button>
				</Group>
			</Stack>
		</Center>
	);
}

export default CheckFrequencyPage;
