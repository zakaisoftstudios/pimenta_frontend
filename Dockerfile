# Build step
FROM node:8.9.4 as node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN REACT_APP_API_URL=https://c2su-api-dev.g.pimenta.cloud/v1 REACT_APP_WS_URL=wss://c2su-api-dev.g.pimenta.cloud/cable npm run build

# Deploy step

FROM nginx:1.13.9-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=node /usr/src/app/build /usr/share/nginx/html
ADD entrypoint.sh /bin/

EXPOSE 80
CMD ["entrypoint.sh"] 