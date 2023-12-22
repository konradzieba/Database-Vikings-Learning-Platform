import { Anchor, Box, Text, rem } from '@mantine/core';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import classes from './StatsCell.module.css';

interface CellProps {
	label: string;
	value: string | number;
	valueWithLts?: boolean;
	dimmed?: boolean;
	href?: string;
}

const excludedLabels = ['Numer indeksu', 'Imię', 'Nazwisko', 'Życia'];

function StatsCell({ label, value, valueWithLts, dimmed, href }: CellProps) {
	return (
		<Box ta='center'>
			<Text>{label}</Text>
			{href ? (
				<Text
					size='lg'
					fw={500}
					lts={valueWithLts ? rem(0.9) : ''}
					c={dimmed ? 'dimmed' : ''}
					fs={dimmed ? 'italic' : ''}>
					<Anchor component={Link} to={href}>
						{String(value) || (excludedLabels.includes(label) && value)}
					</Anchor>
				</Text>
			) : excludedLabels.includes(label) ? (
				<Text
					size='lg'
					fw={500}
					lts={valueWithLts ? rem(0.9) : ''}
					c={dimmed ? 'dimmed' : ''}
					fs={dimmed ? 'italic' : ''}>
					{value}
				</Text>
			) : (
				<CountUp className={classes.countUpWrapper} start={0} end={+value} />
			)}
		</Box>
	);
}

export default StatsCell;
