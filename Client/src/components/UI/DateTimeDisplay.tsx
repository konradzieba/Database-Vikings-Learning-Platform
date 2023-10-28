import { Group, Stack, StackProps, StyleProp, Text, ThemeIcon, rem } from '@mantine/core';
import dayjs from 'dayjs';

interface DateTimeDisplayProps extends StackProps {
	date: string;
	title: string;
	icon: JSX.Element;
	titleTextAlgin?: StyleProp<React.CSSProperties['textAlign']>;
}

function DateTimeDisplay({ date, title, icon, titleTextAlgin = 'end', ...stackProps }: DateTimeDisplayProps) {
	const formattedDate = dayjs(date).format('D/MM/YYYY, HH:mm');
	return (
		<Stack {...stackProps} gap={0}>
			<Text fw={500} size='md' ta={titleTextAlgin}>
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
