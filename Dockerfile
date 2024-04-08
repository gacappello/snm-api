FROM node:21

WORKDIR /snm-api
COPY . .
RUN npm install
CMD ["npm", "run", "prod"]
ARG WEB_API_PORT
EXPOSE $WEB_API_PORT
