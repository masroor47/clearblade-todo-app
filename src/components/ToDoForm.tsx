import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

import { ToDoFormProps } from "./types";

export default function ToDoForm({ addTodo, initialText }: ToDoFormProps) {
  const [value, setValue] = useState(initialText || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{display: "flex"}}>
        <TextField 
          id="outlined-basic" 
          label={initialText ? "Edit" : "Add todo"}
          variant={initialText ? "outlined" : "standard"}
          type="text"
          size="small"
          fullWidth
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button type="submit">
          {initialText ? "Save" : "Add"}
        </Button>
      </div>
    </form>
  );
}