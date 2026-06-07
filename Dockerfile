# Stage 1: Build the TypeScript application
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json tsconfig.json ./

# Install all dependencies (including devDependencies needed for build)
RUN npm ci

# Copy the TypeScript source code
COPY src ./src

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Production runner
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy compiled files from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose port (configured to match port 5000 in .env/defaults)
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
