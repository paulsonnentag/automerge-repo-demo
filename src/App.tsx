import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { repo } from "./repo";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { Sandpack } from "@codesandbox/sandpack-react";
import {
  TODO_APP_USE_STATE_SOURCE,
  TODO_APP_USE_DOCUMENT_SOURCE,
  MAIN_JS_SOURCE,
  REPO_JS_SOURCE,
} from "./example";

let DOC_URL: AutomergeUrl = localStorage.getItem("DOC_URL") as AutomergeUrl;

interface Todo {
  description: string;
  isDone: boolean;
}

interface TodosDoc {
  todos: Todo[];
}

if (!DOC_URL) {
  const handle = repo.create<TodosDoc>();

  handle.change((doc) => {
    doc.todos = [
      { description: "do something", isDone: false },
      { description: "something else", isDone: true },
    ];
  });

  localStorage.setItem("DOC_URL", handle.url);
  DOC_URL = handle.url;
}

function App() {
  const [activeTab, setActiveTab] = useState("use-state");

  const files = useMemo(() => {
    switch (activeTab) {
      case "use-state":
        return { "App.js": TODO_APP_USE_STATE_SOURCE };
      case "use-document":
        return {
          "App.js": TODO_APP_USE_DOCUMENT_SOURCE,
          "repo.js": { source: REPO_JS_SOURCE, hide: true },
          "index.js": { source: MAIN_JS_SOURCE, hide: true },
        };
    }
  }, [activeTab]);

  return (
    <div className="p-4 m-auto py-4 h-screen flex flex-col">
      <h1 className="text-4xl mb-4">Automerge in 5 minutes</h1>

      <div className="flex gap-4 items-stretch flex-1">
        <div className="flex-1 min-w-0 overflow-auto flex flex-col">
          <p className="pb-2">Replace useState with useDocument</p>

          <Tabs value="use-state" onValueChange={(tab) => setActiveTab(tab)}>
            <TabsList>
              <TabsTrigger value="use-state">useState</TabsTrigger>
              <TabsTrigger value="use-document">useDocument</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex-1">
            <Sandpack
              files={files}
              customSetup={{
                dependencies: {
                  "@automerge/automerge": "^2.1.10",
                  "@automerge/automerge-repo": "^1.1.0",
                  "@automerge/automerge-repo-network-websocket": "^1.1.0",
                  "@automerge/automerge-repo-react-hooks": "^1.1.0",
                  "@automerge/automerge-repo-storage-indexeddb": "^1.1.0",
                },
              }}
              template="react"
              options={{
                externalResources: ["https://cdn.tailwindcss.com"],
                showTabs: true,
                editorHeight: "500px",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p>... and you get</p>

          <div className="bg-gray-100 rounded p-4">
            <h1 className="text-xl">sync across devices</h1>
          </div>

          <div className="bg-gray-100 rounded p-4">
            <h1 className="text-xl">work offline</h1>
          </div>

          <div className="bg-gray-100 rounded p-4">
            <h1 className="text-xl">persist full history</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
