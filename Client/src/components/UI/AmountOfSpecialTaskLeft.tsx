import { Box, Flex } from '@mantine/core';

interface AmountOfSpecialTaskAnswersLeftProps {
	answersLeft: number;
}

function AmountOfSpecialTaskAnswersLeft({ answersLeft }: AmountOfSpecialTaskAnswersLeftProps) {
	const barsColors = (amount: number) => {
		let barsColor = 'var(--good-state-color)';

		if (amount === 2) {
			barsColor = 'var(--neutral-state-color)';
		}

		if (amount === 1) {
			barsColor = 'var(--bad-state-color)';
		}

		return barsColor;
	};

	return (
		<Flex gap='sm' mt='xs'>
			<Box
				w='30%'
				h='3px'
				style={{ backgroundColor: answersLeft >= 1 ? barsColors(answersLeft) : 'var(--disabled-color)' }}
			/>
			<Box
				w='30%'
				h='3px'
				style={{ backgroundColor: answersLeft >= 2 ? barsColors(answersLeft) : 'var(--disabled-color)' }}
			/>
			<Box
				w='30%'
				h='3px'
				style={{ backgroundColor: answersLeft >= 3 ? barsColors(answersLeft) : 'var(--disabled-color)' }}
			/>
		</Flex>
	);
}

export default AmountOfSpecialTaskAnswersLeft;
