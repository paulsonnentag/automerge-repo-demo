import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { repo } from "./repo";
import { AutomergeUrl, isValidAutomergeUrl } from "@automerge/automerge-repo";
import { Sandpack } from "@codesandbox/sandpack-react";
import {
  FILES as WITH_AUTOMERGE_REPO_FILES,
  VISIBLE_FILES as WITH_AUTOMERGE_REPO_VISIBLE_FILES,
} from "./examples/with-automerge-repo";
import {
  FILES as PLAIN_REACT_FILES,
  VISIBLE_FILES as PLAIN_REACT_VISIBLE_FILES,
} from "./examples/plain-react";

let DOC_URL: AutomergeUrl = location.hash.slice(0) as AutomergeUrl;

if (!DOC_URL || !isValidAutomergeUrl(DOC_URL)) {
  const handle = repo.create<TodosDoc>();

  handle.change((doc) => {
    doc.todos = [
      { description: "do something", isDone: false },
      { description: "something else", isDone: true },
    ];
  });

  location.hash = DOC_URL = handle.url;
}

interface Todo {
  description: string;
  isDone: boolean;
}

interface TodosDoc {
  todos: Todo[];
}

function App() {
  const [activeTab, setActiveTab] = useState("with-automerge-repo");
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>();

  useEffect(() => {
    console.log("iframe", iframe);
    if (!iframe) {
      return;
    }

    const updateIframeHash = () => {
      const url = iframe.src.split("#")[0];
      const hash = location.hash.slice(1);
      iframe.src = `${url}#${hash}`;
    };

    window.addEventListener("hashchange", updateIframeHash);

    iframe.addEventListener("load", updateIframeHash);
    updateIframeHash();

    return () => {
      window.removeEventListener("hashchange", updateIframeHash);
      iframe.removeEventListener("load", updateIframeHash);
    };
  }, [iframe]);

  const files =
    activeTab === "with-automerge-repo"
      ? WITH_AUTOMERGE_REPO_FILES
      : PLAIN_REACT_FILES;

  const visibleFiles =
    activeTab === "with-automerge-repo"
      ? WITH_AUTOMERGE_REPO_VISIBLE_FILES
      : PLAIN_REACT_VISIBLE_FILES;

  return (
    <div className="p-4 m-auto py-4 h-screen flex flex-col">
      <h1 className="text-4xl mb-4">Automerge in 5 minutes</h1>

      <div className="flex gap-4 items-stretch flex-1">
        <div className="flex-1 min-w-0 overflow-auto flex flex-col">
          <p className="pb-2">Replace useState with useDocument</p>

          <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab)}>
            <TabsList>
              <TabsTrigger value="plain">plain react</TabsTrigger>
              <TabsTrigger value="with-automerge-repo">
                with automerge
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div
            className="flex-1"
            ref={(current) => {
              if (current) {
                setIframe(current.querySelector("iframe"));
              }
            }}
          >
            <Sandpack
              files={files}
              customSetup={{
                entry: "index.js",
                dependencies:
                  activeTab === "with-automerge-repo"
                    ? {
                        "@automerge/automerge": "^2.1.10",
                        "@automerge/automerge-repo": "^1.1.0",
                        "@automerge/automerge-repo-network-websocket": "^1.1.0",
                        "@automerge/automerge-repo-react-hooks": "^1.1.0",
                        "@automerge/automerge-repo-storage-indexeddb": "^1.1.0",
                      }
                    : {},
              }}
              template="react"
              options={{
                visibleFiles: visibleFiles as any,
                externalResources: ["https://cdn.tailwindcss.com"],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
