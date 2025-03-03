# Use Node.js as base image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Use Nginx to serve the application
FROM nginx:alpine as production

# Copy built assets from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy images to nginx directory
COPY public/images /usr/share/nginx/html/images

# Expose port 80
EXPOSE 80

# Create .env file with environment variables if needed
# RUN echo "REACT_APP_API_URL=https://api.example.com" > /usr/share/nginx/html/.env

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]