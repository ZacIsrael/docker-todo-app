// This file is used to connect to this application's database

// postgreSQL module
import pg from "pg";

// Loads environment variables from a `.env` file into process.env
// Used for storing sensitive data like database credentials, API keys, etc.
import dotenv from "dotenv";
// Must be called immediately after importing to make env vars available
dotenv.config();

// Docker testing
const db = new pg.Client({
  user: process.env.PG_USERNAME,
  // Host where the PostgreSQL server is running
  host: process.env.PG_HOST,
  // access the Media Hub database in postgreSQL,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

// Connect to postgreSQL database
async function connectToPostgres() {
  try {
    // Intoate connection to the database using the credentials above
    await db.connect();
    console.log("Connect to postgreSQL database");
  } catch (err) {
    console.error("Error connecting to postgreSQL database: ", err);
    process.exit(1);
  }
}

export { db, connectToPostgres };
