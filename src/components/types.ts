

export type TodoType = {
  text: string;
  isCompleted: boolean;
};

export type ToDoProps = {
  todo: TodoType;
  index: number;
  completeTodo: (index: number) => void;
  removeTodo: (index: number) => void;
  editTodo: (index: number) => void;
}

export type ToDoFormProps = {
  addTodo: (text: string) => void;
  initialText?: string;
};