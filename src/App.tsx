import { useState } from "react";
import { initialData, Column as IColumn } from "./initial-data";

import Column from "./Column";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

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

    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId); //na tablicy newTaskIds od destination.index indexu, nic nie usuwa, tylko dodaje

    // tworzymy nową (zupdate'owaną) columnę
    const newColumn: IColumn = {
      ...column,
      taskIds: newTaskIds, //  jedynie podmieniamy tablicę z id'kami tasków (żeby po upuszczeniu faktycznie zmieniła się kolejność)
    };

    // robimy update state
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn, // tak na prawdę to jedynie podmieniamy columnę na której ktoś zrobił drag-n-drop
      },
    };

    setData(newState);
  };

  return (
    <DragDropContext
      //  onDragStart={} // another avaliable methods, but they are not required
      //  onDragUpdate={} // another avaliable methods, but they are not required
      onDragEnd={onDragEnd}
    >
      {data.columnOrder.map((columnId, columnIndex) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

export default App;
