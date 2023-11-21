import { useState } from 'react';
import { Avatar, Box, Flex, rem } from '@mantine/core';
import classes from './Photo.picker.module.css';
import { IconCheck } from '@tabler/icons-react';
import lesson1 from '@/assets/lesson1.png';
import test from '@/assets/lessonCreatedImage.png';

import { useParams } from 'react-router-dom';
import { useCreateLessonStore } from '@/utils/stores/useCreateLessonStore';

function PhotoPicker() {
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
		lesson1,
		test,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
		lesson1,
	];
	return (
		<Box mih={rem(550)}>
			<Flex justify='center' align='center' mx='auto' w='80%'  mb='xl' mt={rem(43)} wrap='wrap' gap='md'>
				{images.map((image, index) => (
					<Box
						key={image + index}
						pos='relative'
						className={image === selectedPhoto ? classes.lessonSelectedPhotoWrapper : classes.lessonPhotoWrapper}>
						{image === selectedPhoto && <IconCheck className={classes.selectedPhotoIcon} size='2.5rem' stroke={3} />}
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
				))}
			</Flex>
		</Box>
	);
}

export default PhotoPicker;
