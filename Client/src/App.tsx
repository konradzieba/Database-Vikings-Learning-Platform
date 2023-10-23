import '@mantine/core/styles.css';
import './global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { resolver, theme } from './theme';
import { MantineProvider, rem } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Router } from './Router';
import queryClient from './utils/query-client';

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider
				theme={{ ...theme }}
				cssVariablesResolver={resolver}
				defaultColorScheme='dark'
			>
				<ModalsProvider
					labels={{ confirm: 'Prześlij', cancel: 'Anuluj' }}
					modalProps={{ overlayProps: { blur: 2 }, yOffset: rem(100) }}
				>
					<Router />
				</ModalsProvider>
			</MantineProvider>
		</QueryClientProvider>
	);
}
