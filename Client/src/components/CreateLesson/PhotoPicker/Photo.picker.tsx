import { useState } from 'react';
import { Avatar, Box, Flex, Stack, Text, rem } from '@mantine/core';
import classes from './Photo.picker.module.css';
import { IconCheck } from '@tabler/icons-react';
import vikingAngry from '@/assets/vikingAngry.webp';
import vikingWithTorch from '@/assets/vikingWithTorch.webp';
import vikingDamaged from '@/assets/vikingDamaged.webp';
import vikingWithTwoSwords from '@/assets/vikingWithTwoSwords.webp';
import vikingInLove from '@/assets/vikingInLove.webp';
import vikingWithTreasure from '@/assets/vikingWithTreasure.webp';
import vikingStandingWithSword from '@/assets/vikingStandingWithSword.webp';
import vikingWithAnvil from '@/assets/vikingWithAnvil.webp';
import vikingWithBrokenSwordAndShield from '@/assets/vikingWithBrokenSwordAndShield.webp';
import vikingWithCape from '@/assets/vikingWithCape.webp';
import vikingZombie from '@/assets/vikingZombie.webp';
import vikingWithDrinkAndHam from '@/assets/vikingWithDrinkAndHam.webp';
import vikingWithFish from '@/assets/vikingWithFish.webp';
import vikingWithGoldenAxe from '@/assets/vikingWithGoldenAxe.webp';
import vikingWithShieldWithArrows from '@/assets/vikingWithShieldWithArrows.webp';

import { useParams } from 'react-router-dom';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';

interface PhotoPickerProps {
	previousLessonsImages:
		| {
				number: number;
				image: string;
		  }[]
		| undefined;
}

function PhotoPicker({ previousLessonsImages }: PhotoPickerProps) {
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
		vikingWithTorch,
		vikingDamaged,
		vikingWithTwoSwords,
		vikingInLove,
		vikingWithTreasure,
		vikingStandingWithSword,
		vikingWithAnvil,
		vikingWithBrokenSwordAndShield,
		vikingWithCape,
		vikingZombie,
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
					return (
						<Stack align='center' gap={rem(5)} key={image + index}>
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
									onClick={() => handleSetLessonImage(image)}
								/>
							</Box>
							<Text c='dimmed' fs='italic' size='sm'>
								{usedInPreviousLesson ? `Użyto w lekcji ${usedInPreviousLesson.number}` : '\u00a0'}
							</Text>
						</Stack>
					);
				})}
			</Flex>
		</Box>
	);
}

export default PhotoPicker;
