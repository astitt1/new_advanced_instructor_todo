import React from "react";

function Todo({ todo, buttonAction, buttonText}) {
  return (
    <div>
    {todo.title}{' '}
    <button onClick={() => buttonAction(todo._id)}>{buttonText}</button>
  </div>
  );
}

export default Todo;

