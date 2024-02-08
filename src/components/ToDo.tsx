import Stack from '@mui/material/Stack';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

import { ToDoProps } from './types';

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
        
      <div>
        <Checkbox
          checked={todo.isCompleted}
          onClick={() => completeTodo(index)}
        />
        {todo.text}
      </div>
      <div>

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
