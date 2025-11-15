# Todo API -- Docker Deployment Overview
This project demonstrates how to containerize and run a full backend application using Docker. The application is a **TypeScript Node.js REST API** that allows users to **add and retrieve todo items**, 
A PostgreSQL database is used as the data layer, with a SQL initialization script that automatically creates a todo table on first boot. backed by a PostgreSQL database. A SQL initialization script is included to automatically create the `todo` table during the database’s first boot

This repository provides two ways to run the entire stack locally:

## Manual Setup (No Docker Compose)
### Run postgresql container:
* **docker run**: Tells Docker to create and start a new container based on an image.
* **-d** (detached mode): Runs the container in the background (doesn’t block your terminal). Useful for services like databases that you don’t need to interact with directly.
* **--env-file**: Loads environment variables from the specified file (*In this case, the file is ./backend/.env*)
* **-v**: Creates (or uses) a **named volume** (*In this case, it's called 'docker_dbdata'*). This volume is mounted to the directory in the container where PostgreSQL stores its data (`/var/lib/postgresql/data`). This ensures data persists even if the container is deleted.
* **-p**: Maps a host port → container port (*In this case 5433 = port on your laptop (host) -> 5432 = default Postgres port inside the container*)
* **postgres:16-alpine** is the official Postgres image; 16 is the version. The image must **ALWAYS** be at the **END** of the `docker run` command.



* `docker run -d --name postgres_db --env-file ./backend/.env -v docker_dbdata:/var/lib/postgresql/data -p 5433:5432 postgres:16-alpine`

### Navigate to the backend directory build the backend image:
* `cd backend`
### Build the backend image:
* `docker build -t {image-name} .` 
### Run a container based on that image:
* `docker run -d --name backend_api -p 4000:4000 --env-file ./.env -e PORT=4000 -e PGHOST=host.docker.internal -e PGPORT=5433 -e PGUSER=$PG_USERNAME -e PGPASSWORD=$PG_PASSWORD -e PGDATABASE=$PG_DATABASE {image-name}`

# Test backend api in postman:
### Check to see if API is running:
GET http://localhost:4000/
### Get all todo items:
GET http://localhost:4000/api/todos 
### Add a todo item:
POST http://localhost:4000/api/todos
* Body of post request: `{ "title": "Go to the Gym", "text": ""}`

## Clean up:

### Stop both containers
* `docker stop backend_api`
* `docker stop postgres_d`

### Remove both containers
* `docker rm -f backend_api`
* `docker rm -f postgres_db`



## Simplified Setup With Docker Compose

### From the root project directory, execute the following commands:

Start up both the postgres & backend containers: 
* `docker compose up --build -d`

# Test backend api in postman:
### Check to see if API is running:
GET http://localhost:4000/
### Get all todo items:
GET http://localhost:4000/api/todos 
### Add a todo item:
POST http://localhost:4000/api/todos
* Body of post request: `{ "title": "Go to the Gym", "text": ""}`

Clean up:
* `docker compose down`


