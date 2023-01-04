FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  neofetch -y \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY 7kv7r2uh4dio2t6
ENV PM2_SECRET_KEY v59xl1233ynk672

CMD ["pm2-runtime", "index.js"]
