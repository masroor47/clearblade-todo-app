import React, { useEffect, useState } from "react";

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
  const [editTodoIndex, setEditTodoIndex] = useState<number | null>(null);
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
    if (editTodoIndex !== null) {
      // if this is an edit, update the todo at editTodoIndex
      const newTodos = [...todos];
      newTodos[editTodoIndex].text = text;
      setTodos(newTodos);
      setEditTodoIndex(null); // set editTodoIndex back to null
    } else {
      const newTodo = { text, isCompleted: false };
      setTodos([newTodo, ...todos]);
    }
  };

  const editTodo = (index: number) => {
    setEditTodoIndex(index);
  };

  const completeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    // move the completed todo to the end of the list
    if (newTodos[index].isCompleted) {
      const completedTodo = newTodos.splice(index, 1);
      newTodos.push(completedTodo[0]);
    }
    setTodos(newTodos);
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <ToDoForm addTodo={addTodo} />
      <FilterSelect filterOption={filterOption} setFilterOption={setFilterOption}/>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {filteredTodos.map((todo, index) => (
          editTodoIndex === index ? (
            <ToDoForm
              key={index}
              addTodo={addTodo}
              initialText={todo.text}
            />
          ) : (
            <ToDo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
              editTodo={() => editTodo(index)}
              removeTodo={removeTodo}
            />
          )
        ))}
      </Stack>
    </div>
  );
}