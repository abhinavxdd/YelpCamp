FROM node:20-alpine
WORKDIR /app

# Install the application dependencies
COPY package*.json ./
RUN npm install

# Copy in the source code
COPY . .
EXPOSE 8080

# Setup an app user so the container doesn't run as the root user
CMD [ "node", "app.js" ]