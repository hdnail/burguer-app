FROM node:14-buster-slim

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

VOLUME "/app"

CMD ["npm", "start"]
