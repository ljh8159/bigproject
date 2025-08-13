FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Use npm install to avoid lockfile requirement in CI builders
RUN npm install --omit=dev
COPY . .
EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "server.js"]

