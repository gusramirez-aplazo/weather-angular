### STAGE 1: Build ###
FROM node:18.18.2-slim AS build

WORKDIR /usr/src/app

RUN npm cache clean --force

COPY package*.json ./

RUN npm ci --no-progress --loglevel=error --ignore-scripts && \
    rm -f .npmrc

COPY . .

RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.23.4-alpine3.17-slim
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx
COPY --from=build /usr/src/app/dist/weather-reservamos/browser /usr/share/nginx/html
EXPOSE 80
