import { proxy } from "valtio";

const state = proxy({
  allTodos: [],
  notDoneTodos: [],
  doneTodos: [],
  todoName: "",
  newTodo: "",
  allData:[],
  doneNumber: 0,
  notDoneNumber: 0,
  total: 0,
  isLoaded: false,
});

export default state;
