import {
	Image,
	Container,
	Title,
	Text,
	Button,
	SimpleGrid,
} from '@mantine/core';
import vikingSleeping from '@/assets/vikingSleeping.webp';
import classes from './404.page.module.css';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
	return (
		<Container className={classes.root}>
			<SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
				<Image src={vikingSleeping} className={classes.mobileImage} />
				<div>
					<Title className={classes.title}>Coś poszło nie tak...</Title>
					<Text c='dimmed' size='lg'>
						Strona, której szukasz nie istnieje. Upewnij się, że wprowadziłeś
						poprawny adres URL. Jeśli uważasz, że problem stoi po stronie
						aplikacji zgłoś go prowadzącemu.
					</Text>
					<Button
						component={Link}
						to='/'
						variant='outline'
						size='md'
						mt='xl'
						className={classes.control}
					>
						Wróć do strony głównej
					</Button>
				</div>
				<Image src={vikingSleeping} className={classes.desktopImage} />
			</SimpleGrid>
		</Container>
	);
}

export default NotFoundPage;
