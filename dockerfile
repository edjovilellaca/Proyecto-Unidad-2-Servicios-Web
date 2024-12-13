# Use an official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk1.0-0 \
    libx11-xcb1 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libasound2 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libnspr4 \
    libxss1 && \
    npm install && \
    npx puppeteer install

# Copy the application code
COPY . .

# Set environment variables (adjust as needed)
ENV PUPPETEER_CACHE_DIR=/tmp/puppeteer-cache
ENV NODE_ENV=production

# Expose the port Apollo Server will run on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
