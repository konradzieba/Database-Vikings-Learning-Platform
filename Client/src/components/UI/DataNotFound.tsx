import { Center, Flex, Image, Stack, Text, rem } from '@mantine/core';
import vikingConfused from '@/assets/vikingConfused.webp';
import classes from './DataNotFound.module.css';

interface DataNotFoundProps {
	firstLineText: string;
	secondLineText: string;
}

function DataNotFound({ firstLineText, secondLineText }: DataNotFoundProps) {
	return (
		<Flex justify='center' align='center' h={rem(550)}>
			<Image src={vikingConfused} alt='happy viking holding beer' />
			<Center>
				<Stack gap={0} lts={rem(3)}>
					<Text fz={rem(50)} fw={500} className={classes.infoText}>
						Ups..
					</Text>
					<Text fz={rem(50)} fw={500} className={classes.infoText}>
						{firstLineText}
					</Text>
					<Text fz={rem(50)} fw={500} className={classes.infoText}>
						{secondLineText}.
					</Text>
				</Stack>
			</Center>
		</Flex>
	);
}

export default DataNotFound;
