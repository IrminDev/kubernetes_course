FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy the source code
COPY . .

# Install the dependencies
RUN npm install

# Run the code
CMD ["node", "index.js"]