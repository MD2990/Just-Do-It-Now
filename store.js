import { proxy } from "valtio";

const state = proxy({
  todos: [],
  todoName: "",
  newTodo: "",
  allTodos: [],
  doneNumber: 0,
  notDoneNumber: 0,
  total: 0,
});

export default state;
