export const TODO_APP_USE_STATE_SOURCE = `import { useState } from "react"

export default function TodoApp() {
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

export const TODO_APP_USE_DOCUMENT_SOURCE = `import {repo} from "./repo.js";
import { useDocument } from "@automerge/automerge-repo-react-hooks";

export default function TodoApp () {
  const [doc, changeDoc] = useDocument("");

  const onAddTodo = () => {
    changeDoc((doc) => doc.todos.push({ isDone: false, description: "" }));
  };

  const onToggleTodoAt = (indexToToggle: number) => {
    changeDoc(
      (doc) =>
        (doc.todos[indexToToggle].isDone = !doc.todos[indexToToggle].isDone)
    );
  };

  const onEditTodoAt = (indexToEdit: number, description: string) => {
    changeDoc((doc) => (doc.todos[indexToEdit].description = description));
  };

  if (!doc) {
    return;
  }

  return (
    <div className="w-full h-full bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      <div className="bg-white shadow rounded-lg p-4">
        {doc.todos.map((todo: any, index: number) => (
          <div className="flex items-center gap-2" key={index}>
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={() => onToggleTodoAt(index)}
              className="w-6 h-6"
            />
            <input
              className="w-full border-none p-2 text-lg focus:outline-none"
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

export const REPO_JS_SOURCE = `import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";

export const repo = new Repo({
  network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
});`;

export const MAIN_JS_SOURCE = `import React from "react";
import ReactDOM from "react-dom";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { repo } from "./repo.js";
import App from "./App.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App />
    </RepoContext.Provider>
  </React.StrictMode>
);`;
