/* actions/todos.ts */

// This action takes in a `string` and returns `Todo` as its payload.
const addTodo = createAction<Todo>(
  types.ADD_TODO,
  (text: string) => ({ text, completed: false })
);

/* reducers/todos.ts */

// This reducer takes current state of Todo[] and returns a new state of Todo[].
export default handleActions<Todo[]>({
  [ADD_TODO]: (state: Todo[], action: Action): Todo[] => {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: action.payload.completed,
      text: action.payload.text
    }, ...state];
  }
  // ...
}, initialState);