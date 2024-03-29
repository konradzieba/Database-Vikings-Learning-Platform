import { CSSVariablesResolver, createTheme } from '@mantine/core';

export const theme = createTheme({
	primaryColor: 'teal',
	primaryShade: 8,
	fontFamily: 'Roboto, sans-serif',
	defaultRadius: 'xs',
});

export const resolver: CSSVariablesResolver = theme => ({
	variables: {
		'--mantine-primary-color': theme.colors.teal[8],
		'--mantine-primary-color-lighter': theme.colors.teal[6],
		'--placeholder-color': theme.colors.gray[6],
		'--disabled-color': theme.colors.gray[7],
		'--primary-bg-color': '#1C1C1C',
		'--primary-bg-color-lighter': '#2E2E2E',
		'--font-color': theme.colors.gray[0],
		'--heart-color': theme.colors.red[8],
		'--score-color': theme.colors.yellow[5],
		'--good-state-color': theme.colors.green[8],
		'--neutral-state-color': theme.colors.yellow[8],
		'--bad-state-color': theme.colors.red[8],
		'--special-task-color': theme.colors.violet[8],
	},
	light: {},
	dark: {},
});
