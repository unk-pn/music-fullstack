FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY . .
RUN yarn install --immutable
RUN yarn build
EXPOSE 5500
CMD ["yarn", "start:prod"]