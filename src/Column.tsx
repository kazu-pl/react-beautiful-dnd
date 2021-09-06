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
  min-width: 220px;

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

  flex-grow: 1; // nadajemy flex-grow aby ten element miał zawsze max dostepną wysokość bo to on ma droppableProps i ref i to w nim można umieszczać elementy
  min-height: 100px; // ważne, w przypadku jakby w kolumnie nie było żadnych elementów to TaskList miałby wysokosć 0 więc nie dałoby się do niego dodać żadnego tasku dlatego trzeba dodac jakąś minimalną wysokość
`;

const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable
        droppableId={column.id}
        // type={'tasks'} // możesz ustawić type itemów dla Droppable i wtedy jeśli item będzie miał inny typ to nie będzie tam można upuszczać itemów
        // isDropDisabled={true} // jak jest true to nie będzie można upuszczać tutaj nawet tasków tego samego typu
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
