import { Center, Loader } from '@mantine/core';

function FullScreenLoader() {
	return (
		<Center h='85vh'>
			<Loader size='lg' />
		</Center>
	);
}

export default FullScreenLoader;
