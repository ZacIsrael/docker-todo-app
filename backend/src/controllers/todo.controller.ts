// This file is responsible for handling API requests that come in for todo items

// import { db } from "../database/database";
import { Request, Response } from "express";
import { CreateToDoDTO } from "../dtos/todo.dto";
import { toDoService } from "../services/todo.service";
import { ToDo } from "../types/todo.interface";

// constant for table in the postgreSQL database
const toDoTable = "todos";

// called for (POST /api/todos/) route
export const createToDo = async (req: Request, res: Response) => {
  // data transfer object (object that will hold the processed request)
  let dto: CreateToDoDTO;

  // process the body of the request (see todo.dto.ts)
  try {
    dto = new CreateToDoDTO(req.body);
  } catch (err: any) {
    // Error stems from client-side/body of the request
    // see (todo.dto.js) to see all possible error messages
    return res.status(400).json({
      error: `Bad Request (POST /api/todos/): ${err.message}`,
      stack: err.stack,
    });
  }

  // Insert todo item in the todos table in the postgreSQL database
  try {
    const result = await toDoService.createBooking(dto);

    const todo: ToDo = result.rows[0];

    // Insertion into the todos table was successful
    // return necessary response (status 201 & new ToDo item information if successful)
    res.status(201).json({
      message: `Successfully inserted booking into the ${toDoTable} table`,
      // just incase I need the added todo item on the frontend for whatever reason
      todo,
    });
  } catch (err: any) {
    // error inserting todo item into the todos table in the postgreSQL database
    res.status(500).json({
      error: `Server Error (POST /api/todo/): ${err.message}`,
      stack: err.stack,
    });
  }
};

// called for (GET /api/todos/) route
export const getAllToDos = async (req: Request, res: Response) => {
  try {
    // retreive all todo items
    const toDoResults = await toDoService.getAllToDos();

    res.status(200).json({
      message:
        // different message is returned in the response depending on if there are any todo items in the database
        toDoResults.rows.length === 0
          ? `The ${toDoTable} table is empty`
          : `Successfully retreived all ToDo items from the ${toDoTable} table in the postgreSQL database.`,
      // return the clients in the repsonse
      todos: toDoResults.rows,
    });
  } catch (err: any) {
    // error occured when retreiving all todo items from the todos table in the postgreSQL database
    res.status(500).json({
      error: `Server Error (GET /api/todos/): ${err.message}`,
      stack: err.stack,
    });
  }
};
