import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: 
        [{id: '1', text: 'Listen to AIC', done: false},
        {id: '2', text: 'Write some code', done: false}]
    ,
    reducers: {
      // increment: state => {
      //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
      //   // doesn't actually mutate the state because it uses the Immer library,
      //   // which detects changes to a "draft state" and produces a brand new
      //   // immutable state based off those changes
      //   state.value += 1;
      // },
      // decrement: state => {
      //   state.value -= 1;
      // },
      addTodo: (state, action) => {
        state.push(action.payload);
      },
      updateTodo(state, action) {
        const {id, text} = action.payload;
        const existingTodo = state.find(todo => todo.id === id);
        if (existingTodo) {
            existingTodo.text = text
        }
      },
      markTodoAsDone(state, action) {
        const {id, done} = action.payload;
        const existingTodo = state.find(todo => todo.id === id);
        if (done === false) {
          existingTodo.done = true;
        }
        else {
          existingTodo.done = false;
        }
      },
      deleteTodo(state, action) {
        const {id} = action.payload;
        state = state.filter(function(ele){
          return ele.id !== id; 
        });
        return state
      }
    },
  });

  export const { addTodo, updateTodo, markTodoAsDone, deleteTodo } = todoSlice.actions;
  
  export const selectTodos = state => state.todos;

  export default todoSlice.reducer;