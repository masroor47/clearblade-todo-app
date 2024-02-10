import { useEffect, useState } from "react";

import SearchTodo from "./SearchTodo";
import FilterSelect from "./FilterSelect";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import { Box, Stack, Button } from "@mui/material";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { TodoType } from "./types";


export default function ToDoList() {
  // initialize todos from local storage if available
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [searchText, setSearchText] = useState<string>("");
  const [addingTodo, setAddingTodo] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>(todos);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [filterOption, setFilterOption] = useState<string>("all");

  // update local storage when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredTodos(filteredTodos);
  }, [searchText]);

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
      setAddingTodo(false);
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

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(filteredTodos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFilteredTodos(items);
  };

  return (
    <div>
      <Box mb={2}>
        <SearchTodo searchText={searchText} setSearchText={setSearchText} />
      </Box>

      <Box mb={2}>
        {addingTodo ? (
          <ToDoForm addTodo={addTodo} setAddingTodo={setAddingTodo}/>
        ) : (
          <Button variant="contained" onClick={() => setAddingTodo(true)}>Add Todo</Button>
          // <button onClick={() => setAddingTodo(true)}>Add Todo</button>
        )}
      </Box>

      <Box mb={2} >
        <FilterSelect filterOption={filterOption} setFilterOption={setFilterOption}/>
      </Box>

      <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="filteredTodos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {editTodoId === todo.id ? (
                        <ToDoForm
                          addTodo={addTodo}
                          initialText={todo.text}
                        />
                      ) : (
                        <ToDo
                          todo={todo}
                          completeTodo={() => completeTodo(todo.id)}
                          editTodo={() => editTodo(todo.id)}
                          removeTodo={() => removeTodo(todo.id)}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
    </div>
  );
}