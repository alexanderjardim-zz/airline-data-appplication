FROM node:12 AS build

RUN mkdir /build

COPY . /build

WORKDIR /build

RUN ls -lash \
&&  npm install \
&&  npm test

FROM node:12-alpine AS release

RUN addgroup -S airlinedata \
&&  adduser -S airlinedata -G airlinedata

USER airlinedata

WORKDIR /home/airlinedata

COPY --from=build /build/node_modules /home/airlinedata/node_modules

COPY . . 

RUN ls -lash

ENV NODE_ENV=production
EXPOSE 8080
CMD ["node","index.js"]