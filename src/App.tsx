import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import ToDoList from './components/ToDoList';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm" >
        <Box sx={{ my: 4 }}>
          <CssBaseline />
          <ToDoList />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
