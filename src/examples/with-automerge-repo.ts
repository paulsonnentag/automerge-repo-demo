export const REPO_JS_SOURCE = `import { Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";

export const repo = new Repo({
  network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
});
`;

export const MAIN_JS_SOURCE = `import React from "react";
import ReactDOM from "react-dom/client";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { repo } from "./repo.js";
import { App } from "./App.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App />
    </RepoContext.Provider>
  </React.StrictMode>
);
`;

export const APP_JS_SOURCE = `import {repo} from "./repo.js";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useHash } from "./utils.js"


export const App = () => {
  const docUrl = useHash()
  const [doc, changeDoc] = useDocument(docUrl);

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
  )
};`;

const UTILS_JS_SOURCE = `
  export const useHash = () => {
    return location.hash.slice(1)  
  }
`;

export const FILES = {
  "App.js": APP_JS_SOURCE,
  "repo.js": REPO_JS_SOURCE,
  "index.js": MAIN_JS_SOURCE,
  "utils.js": UTILS_JS_SOURCE,
};

export const VISIBLE_FILES = ["/App.js", "/repo.js", "/index.js"];
