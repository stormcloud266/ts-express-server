import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = req.body.text;

  if (typeof text !== "string") {
    throw new Error("Text must be of type string");
  }

  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(200).json({ message: "Created to do", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodos: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const text = req.body.text;

  if (typeof text !== "string") {
    throw new Error("Text must be of type string");
  }

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find to do");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, text);

  res
    .status(201)
    .json({ message: "Updated to do", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find to do");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: "To do deleted" });
};
