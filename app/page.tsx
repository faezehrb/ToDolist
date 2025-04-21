'use client'
import { useEffect, useState } from "react";

type Todo = { id: number; text: string };

export default function Home() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");



  useEffect(() => {
  
    const localData = localStorage.getItem("todos");

    if (localData) {
      setTodos(JSON.parse(localData));
    } else {
      fetch("data/mock-todos.json")
        .then(res => res.json())
        .then(data => {
          setTodos(data);
          localStorage.setItem("todos", JSON.stringify(data));
        });
    }
  }, []);



  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = { id: Date.now(), text: input };
    const updated = [...todos, newTodo];
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
    setInput("");
  };



  const deleteTodo = (id: number) => {
    const updated = todos.filter(todo => todo.id !== id);
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };



  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">ToDo App</h1>


      <div className="flex mb-4">
        <input
          className="border flex-1 p-2 rounded-l"
          placeholder="New task..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r"
          onClick={addTodo}
        >
          Add
        </button>
      </div>


      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between border-b py-1">
            {todo.text}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500"
            >
              x
            </button>
          </li>
        ))}
      </ul>


    </div>
  );
}