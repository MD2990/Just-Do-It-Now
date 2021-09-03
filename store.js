import { proxy } from 'valtio';

const state = proxy({ todos: [], todoName: '' });

export default state;
