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

const Container = styled.div<{
  isCurrentlyDragging: boolean;
  isDragDisabled: boolean;
}>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 9px;
  display: flex;
  background-color: ${({ isCurrentlyDragging, isDragDisabled }) =>
    isDragDisabled
      ? "lightgrey"
      : isCurrentlyDragging
      ? "lightgreen"
      : "white"};
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orange;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

const Task = ({ task, indexForDraggable }: TaskProps) => {
  const isDragDisabled = task.id === "task-1";

  return (
    <Draggable
      draggableId={task.id}
      index={indexForDraggable}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot: DraggableStateSnapshot) => (
        <Container
          {...provided.draggableProps} // pozwalają na bycie przesuwanym przez element który ma dragHandleProps
          {...provided.dragHandleProps} // pozwalają na złapanie elementu i przesuwanie elementem który ma draggableProps
          ref={provided.innerRef}
          isCurrentlyDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {/* <Handle {...provided.dragHandleProps} /> */}
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
