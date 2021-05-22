# Use official node image as the base image
FROM node:latest as build

# Create app directory
WORKDIR /usr/local/app/be

# Copy package.json and install
COPY ./package.json  ./

RUN npm install

# Add the source code to app
COPY . .

# Expose port 3000
EXPOSE 3000
CMD [ "node", "index.js" ]
