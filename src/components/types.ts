

export type TodoType = {
  text: string;
  isCompleted: boolean;
  id: number;
};

export type ToDoProps = {
  todo: TodoType;
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number) => void;
}

export type ToDoFormProps = {
  addTodo: (text: string) => void;
  initialText?: string;
};