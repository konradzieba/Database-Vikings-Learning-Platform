import { Box, Text, rem } from '@mantine/core';
import CountUp from 'react-countup';

interface CellProps {
	label: string;
	value: string | number;
	valueWithLts?: boolean;
	dimmed?: boolean;
}

const excludedLabels = ['Numer indeksu'];

function StatsCell({ label, value, valueWithLts, dimmed }: CellProps) {
	return (
		<Box ta='center'>
			<Text>{label}</Text>
			<Text
				size='lg'
				fw={500}
				lts={valueWithLts ? rem(0.9) : ''}
				c={dimmed ? 'dimmed' : ''}
				fs={dimmed ? 'italic' : ''}
			>
				{String(value) || excludedLabels.includes(label) ? (
					value
				) : (
					<CountUp end={Number(value)} duration={2} /> // todo: fix this propably take it out of Text component
				)}
			</Text>
		</Box>
	);
}

export default StatsCell;
