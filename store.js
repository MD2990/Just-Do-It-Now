import { proxy } from 'valtio';

const state = proxy({ todos: [], todoName: '',newTodo:'' });

export default state;
