# Building the applicaiton for production
FROM node:20-buster-slim AS build

WORKDIR /app

COPY package*.json .

RUN --mount=type=cache,target=/app/.npm \
  npm set cache /app/.npm && \
  npm install

COPY . .

RUN npm run build

FROM nginx:1-alpine-slim AS prod

COPY --from=build /app/dist /usr/share/nginx/html