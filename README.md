# Awesome ToDo List App!
Presenting to you - Awesome ToDo List app! Write any tasks that you want to complete in a nice user friendly UI and seize the day!

## Tech
* React with TypeScript
* Material UI for styling
* Using local storage to persist todo items
* react-beautiful-dnd for drag and drop functionality

## Usage
This is a classic todo list app with the following features:
* add todo items by hitting the "add todo" button
* mark items as complete
* filter todos by the "complete" status
* search the todo list by title
* delete items
* rearrange items by dragging and dragging
* don't worry about accidentally refreshing the page, your tasks will persist!

Subscription tear coming soon!


## Engineering Decisions

### State
I used React's useState to keep track of the lists of todos, filter option status, and more.

### Persistance using localStorage
This step was straightforward. I used the browser storage API to save and load the todos whenever something changed.
This way when you first load the app, it will display all todos saved from previous session, 
and it will automatically save the current state as you use this app.

### Unique Id for each todo item
The fact that there is filter and search funcitonality poses a challenge:
we need to maintain the full list of todos while displaying only the filtered seleciton.

If the 'complete' and 'edit' features depended on the todos' index in the filtered list, 
then completing or editing the todo would not affect the correct todo in the general list.

Because of this I opted to use unique ids. I added an attribute to TodoType, and I used id to 
identify and affect the todos, instead of their index.

### Drag & Drop
I used react-beautiful-dnd to enable the drag and drop feature. This was fairly 
straightforward even though required many components and nesting.

### UI/UX
One issue is that the search bar and the "Add Todo" text input fields both look 
similar and both are located at the top of the page. This creates confusion, it may not 
be super obvious or intuitive which text box to use. May even create irritation if the user keeps clicking the wrong one.

To address this I hid the "add todo" text field behind a button. To create a new item user must first hit the button, which
reveals the text bar.