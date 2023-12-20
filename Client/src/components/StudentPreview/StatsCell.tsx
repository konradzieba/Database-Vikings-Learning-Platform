import { Box, Text, rem } from '@mantine/core';

interface CellProps {
	label: string;
	value: string | number;
	valueWithLts?: boolean;
}

function StatsCell({ label, value, valueWithLts }: CellProps) {
	return (
		<Box ta='center'>
			<Text>{label}</Text>
			<Text size='xl' fw={500} lts={valueWithLts ? rem(0.9) : ''}>
				{value}
			</Text>
		</Box>
	);
}

export default StatsCell;
