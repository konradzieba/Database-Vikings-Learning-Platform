import { useState } from 'react';
import { Avatar, Box, Flex, Stack, Text, rem } from '@mantine/core';
import classes from './Photo.picker.module.css';
import { IconCheck } from '@tabler/icons-react';
import vikingAngry from '@/assets/vikingAngry.webp';
import vikingConfused from '@/assets/vikingConfused.webp';
import vikingDamaged from '@/assets/vikingDamaged.webp';
import vikingHoldingShip from '@/assets/vikingHoldingShip.webp';
import vikingInLove from '@/assets/vikingInLove.webp';
import vikingSleeping from '@/assets/vikingSleeping.webp';
import vikingStandingWithSword from '@/assets/vikingStandingWithSword.webp';
import vikingWithAnvil from '@/assets/vikingWithAnvil.webp';
import vikingWithBrokenSwordAndShield from '@/assets/vikingWithBrokenSwordAndShield.webp';
import vikingWithCape from '@/assets/vikingWithCape.webp';
import vikingWithDrink from '@/assets/vikingWithDrink.webp';
import vikingWithDrinkAndHam from '@/assets/vikingWithDrinkAndHam.webp';
import vikingWithFish from '@/assets/vikingWithFish.webp';
import vikingWithGoldenAxe from '@/assets/vikingWithGoldenAxe.webp';
import vikingWithShieldWithArrows from '@/assets/vikingWithShieldWithArrows.webp';

import { useParams } from 'react-router-dom';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';
import { useDidUpdate } from '@mantine/hooks';

interface PhotoPickerProps {
	previousLessonsImages:
		| {
				number: number;
				image: string;
		  }[]
		| undefined;
}

function PhotoPicker({ previousLessonsImages }: PhotoPickerProps) {
	// console.log(previousLessonsImages);
	const { id } = useParams();
	const { createdLessonsArray, updateLesson } = useCreateLessonStore();
	const lessonFromGroup = createdLessonsArray.find(lesson => lesson.groupId === +id!);
	const [selectedPhoto, setSelectedPhoto] = useState<string | null>(lessonFromGroup?.lessonImage || null);

	const handleSetLessonImage = (photo: string | null) => {
		if (photo) {
			setSelectedPhoto(photo);
		}
		if (lessonFromGroup && photo) {
			const updatedLessonFromGroup = {
				...lessonFromGroup,
				lessonImage: photo,
			};
			updateLesson(+id!, updatedLessonFromGroup);
		}
	};

	const images = [
		vikingAngry,
		vikingConfused,
		vikingDamaged,
		vikingHoldingShip,
		vikingInLove,
		vikingSleeping,
		vikingStandingWithSword,
		vikingWithAnvil,
		vikingWithBrokenSwordAndShield,
		vikingWithCape,
		vikingWithDrink,
		vikingWithDrinkAndHam,
		vikingWithFish,
		vikingWithGoldenAxe,
		vikingWithShieldWithArrows,
	];

	return (
		<Box mih={rem(550)}>
			<Flex justify='center' align='center' mx='auto' w='80%' mb='xl' mt={rem(43)} wrap='wrap' gap='md'>
				{images.map((image, index) => {
					const usedInPreviousLesson = previousLessonsImages?.find(lesson => lesson.image === image);
					console.log(usedInPreviousLesson);
					return (
						<Stack align='center' gap={rem(5)}>
							<Box
								key={image + index}
								pos='relative'
								className={
									image === selectedPhoto
										? classes.lessonSelectedPhotoWrapper
										: usedInPreviousLesson
										? classes.lessonPreviousPhotoWrapper
										: classes.lessonPhotoWrapper
								}>
								{image === selectedPhoto && (
									<IconCheck className={classes.selectedPhotoIcon} size='2.5rem' stroke={3} />
								)}
								<Avatar
									key={image + index}
									src={image}
									alt={`Zdjęcie lekcji do wyboru nr ${index + 1}`}
									size={rem(123)}
									radius='50%'
									className={
										image == selectedPhoto ? classes.lessonSelectedPhotoContainer : classes.lessonPhotoPickerContainer
									}
									component='button'
									style={{ cursor: 'inherit' }}
									onClick={() => handleSetLessonImage(image)}
								/>
							</Box>
							<Text size='sm'>{usedInPreviousLesson ? `Użyto w lekcji ${usedInPreviousLesson.number}` : '\u00a0'}</Text>
						</Stack>
					);
				})}
			</Flex>
		</Box>
	);
}

export default PhotoPicker;
