# --- Stage 1: Build & Dependencies ---
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# --- Stage 2: Production Runner ---
FROM node:22-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy built artifacts and node_modules from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./

# Use the built-in non-root 'node' user from the alpine image
USER node

# Expose API port
EXPOSE 5000

# Health check command for Docker
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/tasks || exit 1

# Start the application
CMD ["node", "server.js"]