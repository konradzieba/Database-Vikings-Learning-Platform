import { useState } from 'react';
import { Avatar, Box, Flex, SimpleGrid, rem } from '@mantine/core';
import classes from './Photo.picker.module.css';
import { IconCheck } from '@tabler/icons-react';

interface PhotoPickerProps {
	avatars: string[];
}

function PhotoPicker({ avatars }: PhotoPickerProps) {
	const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

	return (
		<Flex justify='center' align='center' h={rem(550)}>
			<SimpleGrid cols={avatars.length > 7 ? 5 : 3} spacing='xl'>
				{avatars.map((avatar, index) => (
					<Box
						pos='relative'
						className={avatar == selectedPhoto ? classes.lessonSelectedPhotoWrapper : classes.lessonPhotoWrapper}>
						{avatar === selectedPhoto && <IconCheck className={classes.selectedPhotoIcon} size='2.5rem' stroke={3} />}
						<Avatar
							key={avatar + index}
							src={avatar}
							alt={`Zdjęcie lekcji do wyboru nr ${index + 1}`}
							size={rem(123)}
							radius='50%'
							className={
								avatar == selectedPhoto ? classes.lessonSelectedPhotoContainer : classes.lessonPhotoPickerContainer
							}
							component='button'
							onClick={() => setSelectedPhoto(avatar)}
						/>
					</Box>
				))}
			</SimpleGrid>
		</Flex>
	);
}

export default PhotoPicker;
