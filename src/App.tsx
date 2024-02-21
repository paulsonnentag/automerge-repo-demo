import { useEffect, useMemo, useState } from "react";
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
  const [container, setContainer] = useState<HTMLDivElement | null>();
  const [editorHeight, setEditorHeight] = useState(0);

  const iframe = useMemo(() => {
    if (!container) {
      return;
    }

    return container.querySelector("iframe");
  }, [container]);

  // propagate changing hash to iframe
  useEffect(() => {
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

  // resize editor height
  useEffect(() => {
    if (!container) {
      return;
    }

    const onWindowResize = () => {
      setEditorHeight(container.clientHeight);
    };

    onWindowResize();

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [container]);

  const files =
    activeTab === "with-automerge-repo"
      ? WITH_AUTOMERGE_REPO_FILES
      : PLAIN_REACT_FILES;

  const visibleFiles =
    activeTab === "with-automerge-repo"
      ? WITH_AUTOMERGE_REPO_VISIBLE_FILES
      : PLAIN_REACT_VISIBLE_FILES;

  return (
    <div className="p-4 m-auto py-4 h-screen flex flex-col gap-2">
      <h1 className="text-4xl mb-4">Automerge in 5 minutes</h1>

      <p className="pb-2">Replace useState with useDocument</p>

      <Tabs value={activeTab} onValueChange={(tab) => setActiveTab(tab)}>
        <TabsList>
          <TabsTrigger value="plain">plain react</TabsTrigger>
          <TabsTrigger value="with-automerge-repo">with automerge</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex-1 overflow-hidden min-h-0" ref={setContainer}>
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
            editorHeight,
            visibleFiles: visibleFiles as any,
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        />
      </div>
    </div>
  );
}

export default App;
