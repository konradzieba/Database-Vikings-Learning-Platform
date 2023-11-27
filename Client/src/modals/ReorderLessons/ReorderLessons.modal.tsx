import React, { useState } from 'react';
import { ContextModalProps } from '@mantine/modals';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
	Avatar,
	Box,
	Button,
	Center,
	Group,
	Loader,
	Text,
} from '@mantine/core';
import classes from './ReorderLesson.modal.module.css';
import cx from 'clsx';
import { useGetLessonsByGroupId } from '@/hooks/lessons/useGetLessonsByGroupId';

interface ReorderLessonsModalInnerProps {
	groupId: number;
}

interface LessonOrder {
	lessonId: number;
	newLessonNumber: number;
	oldLessonNumber: number;
}

function ReorderLessonsModal({
	context,
	id,
	innerProps,
}: ContextModalProps<ReorderLessonsModalInnerProps>) {
	const {
		data: lessonsData,
		isPending,
		isError,
	} = useGetLessonsByGroupId(innerProps.groupId);

	const [state, handlers] = useListState(lessonsData?.lessons || []);
	const [newOrder, setNewOrder] = useState<number[]>(
		state.map((lesson) => lesson.id)
	);

	const handleReorderLessons = () => {
		const lessonOrders: LessonOrder[] = newOrder.map((lessonId, index) => {
			const item = state.find((lesson) => lesson.id === lessonId);

			return {
				lessonId: lessonId,
				newLessonNumber: index + 1,
				oldLessonNumber: item ? item.number : 0,
			};
		});

		console.log('Reorder lessons', lessonOrders);
	};

	const handleResetOrder = () => {
		setNewOrder(state.map((lesson) => lesson.id));
	};

	const onDragEnd = ({ destination, source }: any) => {
		if (!destination) {
			return;
		}

		const reorderedIds = [...newOrder];
		const movedId = reorderedIds.splice(source.index, 1)[0];
		reorderedIds.splice(destination.index, 0, movedId);

		setNewOrder(reorderedIds);
	};

	const items = newOrder.map((lessonId, index) => {
		const item = state.find((lesson) => lesson.id === lessonId);

		if (!item) {
			return null;
		}

		return (
			<Draggable key={item.id} index={index} draggableId={`${item.id}`}>
				{(provided, snapshot) => {
					return (
						<Box
							className={cx(classes.item, {
								[classes.itemDragging]: snapshot.isDragging,
							})}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							style={{
								...provided.draggableProps.style,
								top: 'auto',
								left: 'auto',
							}}
							ref={provided.innerRef}
						>
							<Avatar
								src={item.image}
								size={50}
								radius='50%'
								className={classes.symbol}
							/>
							<Box ml='sm'>
								<Text fw={500}>Nowy numer lekcji: {index + 1}</Text>
								<Text size='sm'>Pierwotny numer lekcji: {item.number}</Text>
							</Box>
						</Box>
					);
				}}
			</Draggable>
		);
	});

	if (isPending) {
		return (
			<Center h={80}>
				<Loader />
			</Center>
		);
	}
	if (isError) {
		return (
			<Center h={80}>
				<Text>Wystąpił błąd podczas pobierania danych</Text>
			</Center>
		);
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Text mb='sm'>Dostosuj kafelki według kolejności wyświetlania:</Text>
			<Droppable droppableId='dnd-list' direction='vertical'>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{items}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<Group justify='center' mt='md'>
				<Button variant='outline' onClick={handleResetOrder}>
					Resetuj
				</Button>
				<Button onClick={handleReorderLessons} style={{ marginRight: '8px' }}>
					Zmień kolejność
				</Button>
			</Group>
		</DragDropContext>
	);
}

export default ReorderLessonsModal;
