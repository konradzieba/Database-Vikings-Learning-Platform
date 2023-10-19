import '@mantine/core/styles.css';
import './global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { resolver, theme } from './theme';
import { MantineProvider } from '@mantine/core';
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
				<Router />
			</MantineProvider>
		</QueryClientProvider>
	);
}
