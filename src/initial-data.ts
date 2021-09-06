export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Task {
  id: string;
  content: string;
}

export interface InitialData {
  tasks: {
    [key: string]: Task;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
}

export const initialData: InitialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Take out the garbage - not allowed to drag",
    },
    "task-2": {
      id: "task-2",
      content: "Watch my favorite show",
    },
    "task-3": {
      id: "task-3",
      content: "charge my phone",
    },
    "task-4": {
      id: "task-4",
      content: "cook dinner",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "to do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};
