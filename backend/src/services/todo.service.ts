// This file handles the interaction between the API & the todos table in the postgreSQL database
import { CreateToDoDTO } from "../dtos/todo.dto";
import { db } from "../database/database";
import { ToDo } from "../types/todo.interface";

// constant for table in the postgreSQL database
const toDoTable = "todos";

export const toDoService = {
  // ts ensure that this dto parameter passed in is of type CreateToDoDTO (see todo.dto.ts)
  async createBooking(dto: CreateToDoDTO): Promise<{ rows: ToDo[] }> {
    // insert a todo item into the todos table with cleaned up parameters passed in
    // from the data transfer object (dto) from todo.dto.ts
    // RETURNING * includes the inserted booking in the result
    return await db.query(
      `INSERT INTO ${toDoTable} (title, text) VALUES ($1, $2) RETURNING *`,
      [dto.title, dto.text]
    );
  },

  async getAllToDos(): Promise<{ rows: ToDo[] }> {
    // reterieve all of the todo items (SELECT * FROM todos)
    return await db.query(`SELECT * FROM ${toDoTable}`);
  },
};
