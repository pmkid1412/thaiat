# STEP 1: Build React app
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

# Copy source code
COPY . .

# Build production bundle
RUN npm run build

# STEP 2: Serve with NGINX
FROM nginx:alpine
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
