# Stage 1: deps 
# Use a small, secure base image with Node 20 (Alpine Linux variant)
# Give this step an alias "deps" (short for dependencies)
FROM node:20-alpine AS deps

# Set the working directory inside the container to /app
# All subsequent commands will be executed from this directory
WORKDIR /app

# Copy only the package.json file to the working directory
# This ensures Docker can cache dependencies between builds
COPY package*.json ./

# Install ONLY production dependencies (no dev deps) with a clean, reproducible lockfile install
RUN npm ci --omit=dev


# Stage 2: build 
# Start a fresh stage to build the TypeScript project
# Give this step an alias of "build"
FROM node:20-alpine AS build

# Set the working directory inside the container to /app
# All subsequent commands will be executed from this directory
WORKDIR /app

# # Copy only the package.json file to the working directory
COPY package*.json ./

# Install all dependencies (including devDeps needed for tsc/ts-node)
RUN npm ci

# Copy the TypeScript compiler config into the image
COPY tsconfig.json ./

# Copy all of the application's source code (in src directory)
# into the src directory in the container's working directory (/app/src)
COPY src ./src

# Compile TypeScript to JavaScript into the dist/ folder (as configured in tsconfig)
RUN npm run build    


# Stage 3: runner
# Minimal runtime image that will contain only the built app and prod deps
FROM node:20-alpine AS runner

# Set the working directory inside the container to /app
# All subsequent commands will be executed from this directory
WORKDIR /app

# Set Node.js to production mode (affects some libs & disables certain dev behaviors)
ENV NODE_ENV=production

# Bring in only production node_modules from the deps stage (keeps image small)
COPY --from=deps /app/node_modules ./node_modules

# Copy the compiled JavaScript output from the build stage
COPY --from=build /app/dist ./dist

# Copy package.json for metadata (optional but useful for tooling)
COPY package.json ./

# Expose port 400 to allow external access to the application
# This is typically used for production web applications
EXPOSE 4000

# Default command: start the compiled server
CMD ["node", "dist/index.js"]
