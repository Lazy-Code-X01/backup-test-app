FROM node:20-alpine
WORKDIR /app
ENV DATA_DIR=/app/data
COPY package*.json ./
RUN npm install
COPY . ./
VOLUME ["/app/data"]
EXPOSE 3000
CMD ["npm", "start"]
