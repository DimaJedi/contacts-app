FROM node:15.4.0-alpine3.10
WORKDIR '/app'
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD ["npm", "run", "start"]
