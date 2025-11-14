// This file validates and sanitizes the data coming from API requests for todos

import { ToDoCreateInput } from "../types/todo.interface";

export class CreateToDoDTO implements ToDoCreateInput {
  // Declare class properties with their expected types
  title: string;
  text: string;

  // Ensure that the object passed to this constructor matches the shape of BookingCreateInput
  // text field is optional so set its default value to an empty string
  constructor({ title, text = "" }: ToDoCreateInput) {
    if (typeof title !== "string" || title.trim().length === 0) {
      throw new Error(
        "Error (POST /api/todos/): 'title' field must be a non-empty string."
      );
    }

    if (typeof text !== "string") {
      throw new Error(
        "Error (POST /api/todos/): 'text' is optional but it must be of type string if entered."
      );
    }

    // Assign validated and cleaned values to the DTO instance
    this.title = title;
    this.text = text;
  }
}
