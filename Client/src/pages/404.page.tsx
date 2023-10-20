import {
	Image,
	Container,
	Title,
	Text,
	Button,
	SimpleGrid,
	Center,
	rem,
} from '@mantine/core';
import image from '@/assets/lesson1.png';
import classes from './404.page.module.css';
import { useStore } from '@/utils/store';
import { UserRole } from '@/types/Enums';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
	const { role } = useStore();
	const navigate = useNavigate();

	const handleClick = () => {
		if (role === UserRole.STUDENT) {
			navigate('/');
		} else if (role === UserRole.LECTURER || role === UserRole.SUPERUSER) {
			navigate('/dashboard');
		} else {
			navigate('/login');
		}
	};

	return (
		<Container className={classes.root}>
			<SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
				<Image src={image} className={classes.mobileImage} />
				<div>
					<Title className={classes.title}>Coś poszło nie tak...</Title>
					<Text c='dimmed' size='lg'>
						Strona, której szukasz nie istnieje. Upewnij się, że wprowadziłeś
						poprawny adres URL. Jeśli uważasz, że problem stoi po stronie
						aplikacji zgłoś go prowadzącemu.
					</Text>
					<Button
						variant='outline'
						size='md'
						mt='xl'
						className={classes.control}
						onClick={handleClick}
					>
						Wróć do strony głównej
					</Button>
				</div>
				<Image src={image} className={classes.desktopImage} />
			</SimpleGrid>
		</Container>
	);
}

export default NotFoundPage;
