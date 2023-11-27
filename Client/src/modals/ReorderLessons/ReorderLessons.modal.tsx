import { ContextModalProps } from '@mantine/modals';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Box, Text } from '@mantine/core';
import classes from './ReorderLesson.modal.module.css';
import cx from 'clsx';

const data = [
	{ position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
	{ position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
	{ position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
	{ position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
	{ position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

interface ReorderLessonsModalInnerProps {
	groupId: number;
}
function ReorderLessonsModal({
	context,
	id,
	innerProps,
}: ContextModalProps<ReorderLessonsModalInnerProps>) {
	const [state, handlers] = useListState(data);

	const items = state.map((item, index) => (
		<Draggable key={item.symbol} index={index} draggableId={item.symbol}>
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
						<Text className={classes.symbol}>{item.symbol}</Text>
						<Box>
							<Text>{item.name}</Text>
							<Text c='dimmed' size='sm'>
								Position: {item.position} • Mass: {item.mass}
							</Text>
						</Box>
					</Box>
				);
			}}
		</Draggable>
	));

	return (
		<DragDropContext
			onDragEnd={({ destination, source }) =>
				handlers.reorder({ from: source.index, to: destination?.index || 0 })
			}
		>
			<Text mb='sm'>Dostosuj kafelki według kolejności wyświetlania:</Text>
			<Droppable droppableId='dnd-list' direction='vertical'>
				{(provided) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						style={{
							overflowX: 'unset',
						}}
					>
						{items}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default ReorderLessonsModal;
