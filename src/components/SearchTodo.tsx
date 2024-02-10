import { TextField } from "@mui/material";

type SearchTodoProps = {
  searchText: string;
  setSearchText: (arg: string) => void;
};

export default function SearchTodo({searchText, setSearchText}: SearchTodoProps) {

  return (
    <div>
      <TextField 
        fullWidth 
        label="search todos" 
        id="fullWidth" 
        size="small" 
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)} 
      />
    </div>
  );
}