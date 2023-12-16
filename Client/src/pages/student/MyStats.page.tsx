import { Flex, Group, Text } from '@mantine/core';
import CountUp from 'react-countup';

function MyStatsPage() {
	return (
		<Flex w='80%' direction='column' mx='auto'>
			<Group gap='sm'>
				<Text fz='2.5rem'>Wykonane zadania</Text>
				<CountUp end={100} duration={2} style={{fontSize: '3rem'}}/>
			</Group>
		</Flex>
	);
}

export default MyStatsPage;
