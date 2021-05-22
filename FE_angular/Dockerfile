# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app/fe

# Copy package.json and install
COPY ./package.json  ./
RUN npm install --save --legacy-peer-deps

# Add the source code to app
COPY . .

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents and copy nginx config.
COPY --from=build /usr/local/app/fe/dist/task-management /usr/share/nginx/html
COPY nginx.conf /etc/nginx/

# Expose port 80
EXPOSE 80
