# syntax=docker/dockerfile:1
ARG NODE_VERSION=24.0.0

# Build static assets
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine AS final
# Copy built assets
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]