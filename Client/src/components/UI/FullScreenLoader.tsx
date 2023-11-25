import { Center, Loader } from '@mantine/core';

function FullScreenLoader() {
	return (
		<Center h='65vh'>
			<Loader size='lg' />
		</Center>
	);
}

export default FullScreenLoader;
