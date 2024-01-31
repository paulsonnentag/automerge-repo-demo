import { useState } from "react";

const TODO_APP_SOURCE = `function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { description: "do something", isDone: false },
    { description: "something else", isDone: true },
  ]);

  const onAddTodo = () => {
    setTodos((todos) => todos.concat({ isDone: false, description: "" }));
  };

  const onToggleTodoAt = (indexToToggle: number) => {
    setTodos((todos) =>
      todos.map((todo, index) =>
        index === indexToToggle ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onEditTodoAt = (indexToEdit: number, description: string) => {
    setTodos((todos) =>
      todos.map((todo, index) =>
        index === indexToEdit ? { ...todo, description } : todo
      )
    );
  };

  return (
    <div className="w-full h-full bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      <div className="bg-white shadow rounded-lg p-4">
        {todos.map((todo: any, index: number) => (
          <div className="flex items-center gap-2 border-b py-2" key={index}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => onToggleTodoAt(index)}
              className="w-6 h-6 rounded border-gray-300"
            />
            <input
              className="w-full border-none p-2 text-lg bg-transparent focus:outline-none focus:ring-0"
              value={todo.description}
              onChange={(evt) => onEditTodoAt(index, evt.target.value)}
            />
          </div>
        ))}

        <button onClick={onAddTodo} className="mt-4 w-full text-xl">
          +
        </button>
      </div>
    </div>
  );
}
`;

interface Todo {
  isDone: boolean;
  description: string;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { description: "do something", isDone: false },
    { description: "something else", isDone: true },
  ]);

  const onAddTodo = () => {
    setTodos((todos) => todos.concat({ isDone: false, description: "" }));
  };

  const onToggleTodoAt = (indexToToggle: number) => {
    setTodos((todos) =>
      todos.map((todo, index) =>
        index === indexToToggle ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onEditTodoAt = (indexToEdit: number, description: string) => {
    setTodos((todos) =>
      todos.map((todo, index) =>
        index === indexToEdit ? { ...todo, description } : todo
      )
    );
  };

  return (
    <div className="w-full h-full bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      <div className="bg-white shadow rounded-lg p-4">
        {todos.map((todo: any, index: number) => (
          <div className="flex items-center gap-2 border-b py-2" key={index}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => onToggleTodoAt(index)}
              className="w-6 h-6 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
            />
            <input
              className="w-full border-none p-2 text-lg bg-transparent focus:outline-none focus:ring-0"
              value={todo.description}
              onChange={(evt) => onEditTodoAt(index, evt.target.value)}
            />
          </div>
        ))}

        <button onClick={onAddTodo} className="mt-4 w-full text-xl">
          +
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="max-w-6xl m-auto py-4">
      <h1 className="text-4xl mb-4">Just use automerge</h1>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0 overflow-auto">
          <p className="pb-2">Replace useState with useDocument</p>
          <pre className="border rounded border-gray-200 p-2">
            {TODO_APP_SOURCE}
          </pre>
        </div>

        <div className="flex-1 border border-gray-200 rounded">
          <TodoApp />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <p>... and you get</p>

          <div className="bg-gray-100 rounded p-4">
            <h1 className="text-xl">sync across devices</h1>
          </div>

          <div className="bg-gray-100 rounded p-4">
            <h1 className="text-xl">work offline</h1>
          </div>

          <div className="bg-gray-100 rounded p-4">
            <h1 className="text-xl">store full history</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
