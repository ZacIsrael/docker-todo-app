// Import the express framework to create and manage the web server
import express from "express";

import { createToDo, getAllToDos } from "../controllers/todo.controller";

const router = express.Router();

// creates a new ToDo item and stores it in the "todos" table
// in demos PostgreSQL database
router.post("/", createToDo);

// retrieves all of the ToDo items from the "todos" table
// in demos PostgreSQL database
router.get("/", getAllToDos);

export default router;
