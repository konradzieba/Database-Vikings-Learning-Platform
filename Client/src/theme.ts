import { CSSVariablesResolver, createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'cyan',
  primaryShade: 8,
  fontFamily: 'Roboto, sans-serif',
  defaultRadius: 'sm',
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--heart-color': theme.colors.red[8],
    '--score-color': theme.colors.yellow[5],
    '--good-state-color': theme.colors.green[8],
    '--neutral-state-color': theme.colors.yellow[8],
    '--bad-state-color': theme.colors.red[8],
  },
  light: {},
  dark: {},
});
