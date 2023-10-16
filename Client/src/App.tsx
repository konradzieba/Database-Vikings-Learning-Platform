import '@mantine/core/styles.css';
import './global.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { resolver, theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={{ ...theme }} cssVariablesResolver={resolver}>
      <Router />
    </MantineProvider>
  );
}
