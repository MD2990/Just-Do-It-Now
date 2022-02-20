import { proxy } from "valtio";

const state = proxy({
  todos: [],
  todoName: "",
  newTodo: "",
  allTodosLength: null,
  notDone: [],
  done: [],
});

export default state;
