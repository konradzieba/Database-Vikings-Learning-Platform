import { Anchor, Box, Text, rem } from '@mantine/core';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';

interface CellProps {
	label: string;
	value: string | number;
	valueWithLts?: boolean;
	dimmed?: boolean;
	href?: string;
}

const excludedLabels = ['Numer indeksu'];

function StatsCell({ label, value, valueWithLts, dimmed, href }: CellProps) {
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
				{href ? (
					<Anchor component={Link} to={href}>
						{String(value) || excludedLabels.includes(label) ? (
							value
						) : (
							<CountUp end={Number(value)} duration={2} /> // todo: fix this probably take it out of Text component
						)}
					</Anchor>
				) : String(value) || excludedLabels.includes(label) ? (
					value
				) : (
					<CountUp end={Number(value)} duration={2} /> // todo: fix this probably take it out of Text component
				)}
			</Text>
		</Box>
	);
}

export default StatsCell;
