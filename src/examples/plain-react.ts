const APP_JS_SOURCE = `import { useState } from "react"



export const App = () => {
  const [todos, setTodos] = useState([
    { description: "do something", isDone: false },
    { description: "something else", isDone: true },
  ]);

  const onAddTodo = () => {
    setTodos((todos) => todos.concat({ isDone: false, description: "" }));
  };

  const onToggleTodoAt = (indexToToggle) => {
    setTodos((todos) =>
      todos.map((todo, index) =>
        index === indexToToggle ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onEditTodoAt = (indexToEdit, description) => {
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
        {todos.map((todo, index) => (
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
};`;

export const INDEX_JS_SOURCE = `import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

export const FILES = {
  "App.js": APP_JS_SOURCE,
  "index.js": INDEX_JS_SOURCE,
};

export const VISIBLE_FILES = ["/App.js", "/index.js"];
