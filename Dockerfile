FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm test \
&&  npm install
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node","index.js"]