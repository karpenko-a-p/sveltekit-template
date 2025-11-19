FROM node:24.11.1-alpine3.22
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
ENTRYPOINT ["node", "./build/index.js"]