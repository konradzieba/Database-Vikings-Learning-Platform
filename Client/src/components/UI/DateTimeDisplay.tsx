import {
	Group,
	Stack,
	StackProps,
	Text,
	ThemeIcon,
	rem,
} from '@mantine/core';
import dayjs from 'dayjs';

interface DateTimeDisplayProps extends StackProps {
	date: string;
	title: string;
	icon: JSX.Element;
}

function DateTimeDisplay({
	date,
	title,
	icon,
	...stackProps
}: DateTimeDisplayProps) {
	const formattedDate = dayjs(date).format('D/MM/YYYY, HH:mm');
	return (
		<Stack {...stackProps}>
			<Text fw={500} size='md'>
				{title}
			</Text>
			<Group gap={rem(5)}>
				<ThemeIcon variant='transparent'>{icon}</ThemeIcon>
				<Text>{formattedDate}</Text>
			</Group>
		</Stack>
	);
}

export default DateTimeDisplay;
