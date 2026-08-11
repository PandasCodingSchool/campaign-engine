# Base Node Image
FROM node:22-alpine AS base
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Production Build for Vite Frontend
RUN npm run build

# Expose Express server & Vite dev ports
EXPOSE 5000 3000

# Default Command
CMD ["npm", "run", "dev:full"]
