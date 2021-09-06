import { Task as ITask } from "initial-data";
import styled from "styled-components";
import {
  Draggable,
  DraggableStateSnapshot,
  // DroppableStateSnapshot,
} from "react-beautiful-dnd";

// w snapshot: DraggableStateSnapshot ten argument snapschot zawiera rózne informacje dotyczące obecnie przesuwanego elementu np isDragging, albo draggingOver czyli czy jest przesuwany oraz nad jaki element obecnie najeżdza

// przykład:

// --- poniższy element to jest ten użyty ponieważ Task.tsx ma Draggable provider
// const snapschot: DraggableStateSnapshot = {
//   isDragging: false,
//   draggingOver: "column-1",
// };

// const droppableSnapschot: DroppableStateSnapshot = {
//   isDraggingOver: true,
//   draggingOverWith: "task-1",
// };

interface TaskProps {
  task: ITask;
  indexForDraggable: number;
}

const Container = styled.div<{ isCurrentlyDragging: boolean }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 9px;
  background-color: ${({ isCurrentlyDragging }) =>
    isCurrentlyDragging ? "lightgreen" : "white"};
`;

const Task = ({ task, indexForDraggable }: TaskProps) => {
  return (
    <Draggable draggableId={task.id} index={indexForDraggable}>
      {(provided, snapshot: DraggableStateSnapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isCurrentlyDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
