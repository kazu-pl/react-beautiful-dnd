import { useState } from "react";
import { initialData, Column as IColumn, InitialData } from "./initial-data";

import Column from "./Column";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

function App() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // destipation może czasami być undefined lub null w przypadku jak np ktoś upuścił poza obszarem Droppable
    if (!destination) return;

    // sprawdzenie czy po upuszczeniu przesuwanego elementu zmieniła się jego pozysja (czy zmienił się droppable Area lub czy zmieniła się kolejność wewnątrz tej samej droppable area)
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return; // jak się nie zmieniła to nic nie robimy bo po co

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    // jesli zmieniamy kolejność ale w obrębie tej samej kolumny:
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId); //na tablicy newTaskIds od destination.index indexu, nic nie usuwa, tylko dodaje

      // tworzymy nową (zupdate'owaną) columnę
      const newColumn: IColumn = {
        ...startColumn,
        taskIds: newTaskIds, //  jedynie podmieniamy tablicę z id'kami tasków (żeby po upuszczeniu faktycznie zmieniła się kolejność)
      };

      // robimy update state
      const newState: InitialData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn, // tak na prawdę to jedynie podmieniamy columnę na której ktoś zrobił drag-n-drop
        },
      };

      setData(newState);
    } else {
      // jeśli zmieniliśmy kolumnę:

      // -------- update kolumny z której zaczęto przesuwać element
      const newStartColumnTaskIds = Array.from(startColumn.taskIds);
      newStartColumnTaskIds.splice(source.index, 1);

      const newStartColumn: IColumn = {
        ...startColumn,
        taskIds: newStartColumnTaskIds,
      };

      // -------- update kolumny do której upuszczono element
      const newFinishColumnTaskIds = Array.from(finishColumn.taskIds);
      newFinishColumnTaskIds.splice(destination.index, 0, draggableId);

      const newFinishColumn: IColumn = {
        ...finishColumn,
        taskIds: newFinishColumnTaskIds,
      };

      // -------- zapisanie state z nowymi kolumnami
      const newState: InitialData = {
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      };

      setData(newState);
    }
  };

  return (
    <DragDropContext
      //  onDragStart={} // another avaliable methods, but they are not required
      //  onDragUpdate={} // another avaliable methods, but they are not required
      onDragEnd={onDragEnd}
    >
      <Container>
        {data.columnOrder.map((columnId, columnIndex) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
}

export default App;
