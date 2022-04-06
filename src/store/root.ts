import { createAction, createReducer } from "@reduxjs/toolkit";

interface Todo {
  text: string;
  completed: boolean;
}

export const addTodo = createAction<Todo>("todos/add");
export const toggleTodo = createAction<number>("todos/toggle");

const rootReducer = createReducer([] as Todo[], builder => {
  builder
    .addCase(addTodo, (state, action) => {
      // This push() operation gets translated into the same
      // extended-array creation as in the previous example.
      const todo = action.payload;
      state.push(todo);
    })
    .addCase(toggleTodo, (state, action) => {
      // The "mutating" version of this case reducer is much
      //  more direct than the explicitly pure one.
      const index = action.payload;
      const todo = state[index];
      todo.completed = !todo.completed;
    });
});

export default rootReducer;
