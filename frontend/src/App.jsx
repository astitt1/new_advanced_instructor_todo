import { useState, useEffect } from "react";
import TodoList from "./components/todolist/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false,
  });

  //get todos
  const getTodos = async () => {
    try {
      //not completed
      const res = await fetch("http://localhost:5001/api/todos");
      const foundTodos = await res.json();
      setTodos(foundTodos.reverse());
      //completed
      const resTwo = await fetch("http://localhost:5001/api/todos/completed");
      const foundCompletedTdos = await resTwo.json();
      setCompletedTodos(foundCompletedTdos.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  //create todos
  const createTodo = async () => {
    const body = {
      ...newTodo,
    };
    try {
      const res = await fetch("http://localhost:5001/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const createdTodo = await res.json();
      const todosCopy = [...todos, createdTodo];
      setTodos(todosCopy);
      setNewTodo({
        title: "",
        completed: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  //delete todos

  const deleteTodo = async (id) => {
    try {
      const index = completedTodos.findIndex((todo) => todo._id === id);
      const completedTodosCopy = [...completedTodos];
      const res = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: "DELETE",
        header: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      completedTodosCopy.splice(index, 1);
      setCompletedTodos(completedTodosCopy);
    } catch (error) {
      console.error(error);
    }
  };

  //move to completedls
  

  const moveToCompleted = async (id) => {
    const index = todos.findIndex(todo => todo._id === id);

    const todosCopy = [...todos];
    const subject = todosCopy[index];
    subject.completed = true;

    const res = await fetch(`http://localhost:5001/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subject),
    });

    const updatedTodo = await res.json();
    const completedTDsCopy = [...completedTodos, updatedTodo];
    setCompletedTodos(completedTDsCopy);
    todosCopy.splice(index, 1);
    setTodos(todosCopy)
  };

  return (
    <>
  <TodoList 
      newTodo={newTodo}
      setNewTodo={setNewTodo}
      createTodo={createTodo}
      todos={todos}
      moveToCompleted={moveToCompleted}
      completedTodos={completedTodos}
      deleteTodo={deleteTodo}
    />
    </>
  );
}

export default App;
