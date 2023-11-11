FROM node:lts-alpine as base

WORKDIR /usr/src/api
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /
CMD ["node", "index.ts"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /
CMD ["nodemon", "index.ts"]


# docker build -t api-container .
# docker run -p 3000:3000 api-container