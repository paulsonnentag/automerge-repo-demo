import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { repo } from "./repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { AutomergeUrl } from "@automerge/automerge-repo";

let DOC_URL: AutomergeUrl = localStorage.getItem("DOC_URL") as AutomergeUrl;

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

const TODO_APP_USE_DOCUMENT_SOURCE = `function TodoApp() {
  const [doc, changeDoc] = useDocument<TodosDoc>("${DOC_URL}");

  const onAddTodo = () => {
    changeDoc((doc) => {
      doc.todos.push({ isDone: false, description: "" });
    });
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
}`;

const TODO_APP_USE_STATE_SOURCE = `function TodoApp() {
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

interface TodosDoc {
  todos: Todo[];
}

function TodoAppWithUseState() {
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
}

function TodoAppWithUseDocument() {
  const [doc, changeDoc] = useDocument<TodosDoc>(DOC_URL);

  const onAddTodo = () => {
    changeDoc((doc) => {
      doc.todos.push({ isDone: false, description: "" });
    });
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
}

function App() {
  return (
    <div className="p-4 m-auto py-4">
      <h1 className="text-4xl mb-4">Just use automerge</h1>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0 overflow-auto">
          <p className="pb-2">Replace useState with useDocument</p>

          <Tabs defaultValue="use-state">
            <TabsList>
              <TabsTrigger value="use-state">useState</TabsTrigger>
              <TabsTrigger value="use-document">useDocument</TabsTrigger>
            </TabsList>
            <TabsContent value="use-state">
              <pre>{TODO_APP_USE_STATE_SOURCE}</pre>
            </TabsContent>
            <TabsContent value="use-document">
              <pre>{TODO_APP_USE_DOCUMENT_SOURCE}</pre>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex-1 border border-gray-200 rounded">
          <TodoAppWithUseDocument />
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
