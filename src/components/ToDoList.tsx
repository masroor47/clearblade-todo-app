import { useEffect, useState } from "react";

import FilterSelect from "./FilterSelect";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import { Stack } from "@mui/material";

import { TodoType } from "./types";


export default function ToDoList() {
  // initialize todos from local storage if available
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>(todos);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [filterOption, setFilterOption] = useState<string>("all");

  // update local storage when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => {
      if (filterOption === "all") return true;
      if (filterOption === "active") return !todo.isCompleted;
      if (filterOption === "completed") return todo.isCompleted;
      return true;
    });
    setFilteredTodos(filteredTodos);
  }, [filterOption, todos]);

  const addTodo = (text: string) => {
    // if this is an edit, update the todo at editTodoIndex
    if (editTodoId !== null) {
      const newTodos = [...todos];
      const index = todos.findIndex((todo) => todo.id === editTodoId);
      if (index === -1) {
        throw new Error(`No todo with ID ${editTodoId} was found`);
      }
      newTodos[index].text = text;
      setTodos(newTodos);
      setEditTodoId(null); // set editTodoIndex back to null
    } else {
      const newTodo = { id: Date.now(), text, isCompleted: false };
      setTodos([newTodo, ...todos]);
    }
  };

  const editTodo = (id: number) => {
    setEditTodoId(id);
  };

  const completeTodo = (id: number) => {
    const newTodos = [...todos];
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new Error(`No todo with ID ${id} was found`);
    }
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    // move the completed todo to the end of the list
    if (newTodos[index].isCompleted) {
      const completedTodo = newTodos.splice(index, 1);
      newTodos.push(completedTodo[0]);
    }
    setTodos(newTodos);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <ToDoForm addTodo={addTodo} />
      <FilterSelect filterOption={filterOption} setFilterOption={setFilterOption}/>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {filteredTodos.map((todo) => (
          editTodoId === todo.id ? (
            <ToDoForm
              key={todo.id}
              addTodo={addTodo}
              initialText={todo.text}
            />
          ) : (
            <ToDo
              key={todo.id}
              todo={todo}
              completeTodo={() => completeTodo(todo.id)}
              editTodo={() => editTodo(todo.id)}
              removeTodo={() => removeTodo(todo.id)}
            />
          )
        ))}
      </Stack>
    </div>
  );
}