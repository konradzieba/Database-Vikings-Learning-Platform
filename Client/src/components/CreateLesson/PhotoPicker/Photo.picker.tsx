import { useState } from 'react';
import { Avatar, Box, Flex, SimpleGrid, rem } from '@mantine/core';
import classes from './Photo.picker.module.css';
import { IconCheck } from '@tabler/icons-react';
import lesson1 from '@/assets/lesson1.png';
import test from '@/assets/lessonCreatedImage.png';
import { useCreateLessonStore } from '@/utils/store';
import { useParams } from 'react-router-dom';

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
		<Flex justify='center' align='center' h={rem(550)}>
			<SimpleGrid cols={images.length > 7 ? 5 : 3} spacing='xl'>
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
			</SimpleGrid>
		</Flex>
	);
}

export default PhotoPicker;
