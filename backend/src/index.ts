// Import the express framework to create and manage the web server
import express, { Application, Request, Response } from "express";

// Enables Cross-Origin Resource Sharing, allowing frontend apps on different ports (like React) to make requests to this backend
import cors from "cors";

import cookieParser from "cookie-parser";

// import route
import toDoRouter from "./routes/todo.route";

import { connectToPostgres } from "./database/database";

// Loads environment variables from a `.env` file into process.env
// Used for storing sensitive data like database credentials, API keys, etc.
import dotenv from "dotenv";
// Must be called immediately after importing to make env vars available
dotenv.config();

// Create an Express application instance
const app: Application = express();
// Define the port your Express server will listen on
const port: number = parseInt(process.env.PORT || "3000", 10);

// connect to postgreSQL database
connectToPostgres();

// ==========================
// Middleware
// ==========================

// Enable cross-origin requests with credentials for production and development
// Ensure origin matches frontend URL exactly
app.use(
  cors({
    origin: [
      // development
      "http://localhost:5173",
      // whatever the production url is whenever I deploy the frontend
      // "https://mediahub-production-domain.com",
    ],
    credentials: true,
  })
);

// Parse cookies from incoming requests
// Required for reading refresh tokens stored in httpOnly cookies
app.use(cookieParser());

// Registers middleware that parses URL-encoded data from incoming HTTP requests
// This is especially useful for handling form submissions (e.g., login, registration)
app.use(
  express.urlencoded({
    // `extended: true` tells body-parser to use the `qs` library, allowing nested objects
    extended: true,
  })
);

// Parses JSON data (from Postman or frontend apps sending JSON)
app.use(express.json());

// mount the route
app.use("/api/todos", toDoRouter);

// Healthcheck route to verify backend is running
app.get("/api/healthcheck", (_, res) => {
  res.send("I'm alive 🚀");
});

// default GET route
app.get("/", (req: Request, res: Response): void => {
  res.send("Welcome to this dummy API!");
});

// Start the Server
// Start listening on the specified port
app.listen(port, () => {
  // Once the server is up and running, log the port number to the console
  console.log(`Server running on port ${port}.`);
});
