import { Center, Flex, Image, SimpleGrid, Stack, Text, rem } from '@mantine/core';
import vikingWithDrink from '@/assets/vikingWithDrink.webp';
import classes from './LessonCreated.component.module.css';

function LessonCreated() {
	return (
		<Flex justify='center' align='center' h={rem(550)}>
			<SimpleGrid cols={2}>
				<Image src={vikingWithDrink} alt='happy viking holding beer' />
				<Center>
					<Stack gap={0} lts={rem(3)}>
						<Text fw={700} fz={rem(70)} className={classes.primaryText}>
							Lekcja stworzona
						</Text>
						<Text fw={700} fz={rem(70)} className={classes.secondaryText}>
							pomyślnie!
						</Text>
					</Stack>
				</Center>
			</SimpleGrid>
		</Flex>
	);
}

export default LessonCreated;
