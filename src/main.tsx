import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { repo } from "./repo.ts";

//@ts-ignore
window.repo = repo;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App />
    </RepoContext.Provider>
  </React.StrictMode>
);
