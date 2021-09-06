import { Column as IColumn, Task as ITask } from "initial-data";
import styled from "styled-components";

import { Droppable, DroppableStateSnapshot } from "react-beautiful-dnd";

// w snapshot: DraggableStateSnapshot ten argument snapschot zawiera rózne informacje dotyczące obecnie przesuwanego elementu np isDragging, albo draggingOver czyli czy jest przesuwany oraz nad jaki element obecnie najeżdza

// przykład:

// const snapschot: DraggableStateSnapshot = {
//   isDragging: false,
//   draggingOver: "column-1",
// };

// --- poniższy element to jest ten użyty ponieważ Task.tsx ma Draggable provider
// const droppableSnapschot: DroppableStateSnapshot = {
//   isDraggingOver: true,
//   draggingOverWith: "task-1",
// };

import Task from "./Task";

export interface ColumnProps {
  column: IColumn;
  tasks: ITask[];
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex; // ważne, ponieważ trzeba nadać TaskList jakaś wysokość i najlepiej jest dać mu flex-grow, dlatego tutaj flex
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isAnyItemDraggingOverTaskList: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isAnyItemDraggingOverTaskList }) =>
    isAnyItemDraggingOverTaskList ? "skyblue" : "white"};

  display: flex;
`;

const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable
        droppableId={column.id}
        // ustawienie czy droppable ma działać horyzontalnie czy vertykalnie (czy możes przesuwać lewo-prawo czy góra-dół - domyslnie jest góra-dół)
        direction="horizontal"
      >
        {(probided, snapschot: DroppableStateSnapshot) => (
          <TaskList
            ref={probided.innerRef}
            {...probided.droppableProps}
            isAnyItemDraggingOverTaskList={snapschot.isDraggingOver}
          >
            {tasks.map((item, index) => (
              <Task key={item.id} task={item} indexForDraggable={index} />
            ))}
            {probided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;
