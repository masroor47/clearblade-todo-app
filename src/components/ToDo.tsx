import Stack from '@mui/material/Stack';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';


type Todo = {
  text: string;
  isCompleted: boolean;
};

interface ToDoProps {
  todo: Todo;
  index: number;
  completeTodo: (index: number) => void;
  removeTodo: (index: number) => void;
  editTodo: (index: number) => void;
}

export default function ToDo({
  todo,
  index,
  completeTodo,
  removeTodo,
  editTodo
}: ToDoProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {/* change color to green if todo.completed is true: */}
        
      <div style={{backgroundColor: todo.isCompleted ? "green" : ""}}>
        {todo.text}
      </div>
      <div>
        <IconButton onClick={() => completeTodo(index)}>
          <CheckIcon />
        </IconButton>
        <IconButton onClick={() => removeTodo(index)}>
          <CloseIcon />
        </IconButton>
        <IconButton onClick={() => editTodo(index)}>
          <EditIcon />
        </IconButton>
      </div>
    </Stack>
  );
} 