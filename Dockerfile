FROM node:12 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.15.8-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/frontend /usr/share/nginx/html
