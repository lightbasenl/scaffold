FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY node_modules node_modules
COPY .next .next
COPY public public

CMD ["yarn", "start"]
