import 'dayjs/locale/pl';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import './global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { resolver, theme } from './theme';
import { MantineProvider, rem } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Router } from './Router';
import queryClient from './utils/query-client';
import dayjs from 'dayjs';
import { DatesProvider } from '@mantine/dates';
import modals from './utils/modals';

export default function App() {
	dayjs.locale('pl');
	return (
		<QueryClientProvider client={queryClient}>
			<DatesProvider settings={{ locale: 'pl' }}>
				<MantineProvider
					theme={{ ...theme }}
					cssVariablesResolver={resolver}
					defaultColorScheme='dark'
				>
					<ModalsProvider
						modals={modals}
						labels={{ confirm: 'Prześlij', cancel: 'Anuluj' }}
						modalProps={{ overlayProps: { blur: 2 }, yOffset: rem(100) }}
					>
						<Router />
					</ModalsProvider>
				</MantineProvider>
			</DatesProvider>
		</QueryClientProvider>
	);
}
