# --- Stage 1: Build React App ---
FROM node:22-alpine AS builder
WORKDIR /app

# Dependencies install karein
COPY package*.json ./
RUN npm install

# Source code copy karein aur build banayein
COPY . .
RUN npm run build

# --- Stage 2: Serve using Nginx (Non-Root User) ---
# Assignment ke mutabiq non-root user required hai [cite: 91]
FROM nginxinc/nginx-unprivileged:alpine

# Custom Nginx config copy karein
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Stage 1 (builder) se generated build ('dist' folder) ko Nginx html folder mein copy karein
COPY --from=builder /app/dist /usr/share/nginx/html

# Unprivileged Nginx default 8080 par run karta hai
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]