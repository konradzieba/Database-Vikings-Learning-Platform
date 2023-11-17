import { Button, ButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonProps {
	children: ReactNode;
	loading?: boolean;
	type?: 'button' | 'submit' | 'reset';
}

function PrimaryButton({ loading = false, type = 'button', children, ...ButtonProps }: PrimaryButtonProps) {
	return (
		<Button type={type} loading={loading} {...ButtonProps}>
			{loading ? '' : children}
		</Button>
	);
}

export default PrimaryButton;
