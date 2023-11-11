FROM node as development

WORKDIR /app/client

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .

# For development environment
CMD ["npm", "run", "dev"]
EXPOSE 5173


# For production environment
FROM node as production

WORKDIR /app/client

COPY package.json .
RUN npm install --legacy-peer-deps

COPY . .

# For production environment
CMD ["npm", "run", "start"]
EXPOSE 5173