import { Group, ThemeIcon, rem } from '@mantine/core';
import { IconHeartFilled } from '@tabler/icons-react';
import classes from './HeartCounter.module.css';

interface HearthCounterProps {
	hearts: number | null;
}

function HeartCounter({ hearts }: HearthCounterProps) {
	if (hearts === null) {
		return null;
	}
	return (
		<Group gap={0} py={rem(6.5)}>
			<ThemeIcon
				variant='transparent'
				size={rem(24)}
				className={hearts >= 1 ? classes.filledHeart : classes.unfilledHeart}
			>
				<IconHeartFilled />
			</ThemeIcon>
			<ThemeIcon
				variant='transparent'
				size={rem(24)}
				className={hearts >= 2 ? classes.filledHeart : classes.unfilledHeart}
			>
				<IconHeartFilled />
			</ThemeIcon>
			<ThemeIcon
				variant='transparent'
				size={rem(24)}
				className={hearts >= 3 ? classes.filledHeart : classes.unfilledHeart}
			>
				<IconHeartFilled />
			</ThemeIcon>
		</Group>
	);
}
export default HeartCounter;
