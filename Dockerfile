FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  neofetch \
  ffmpeg \
  wget \
  yarn \
  webp \
  imagemagick && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN yarn
RUN pwd
RUN ls

#COPY . .
WORKDIR /root/botmd

RUN npm install pm2 -g
RUN cd node_modules/@adiwajshing/baileys && npm run build:tsc && cp src/Defaults/baileys-version.json lib/Defaults/baileys-version.json && cd /root/apibotv4
RUN cp node_modules/@adiwajshing/baileys/src/Defaults/baileys-version.json node_modules/@adiwajshing/baileys/lib/Defaults/baileys-version.json
RUN ls node_modules/@adiwajshing/baileys/lib/Defaults

RUN ls

#awal pm2
#USER PM2 DI SINI kalau mau makek pm2 yang CMD ["npm","run","dev"] di Block aja command nya

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY 7kv7r2uh4dio2t6
ENV PM2_SECRET_KEY v59xl1233ynk672
CMD pm2-runtime start run.js --name botwa

#akhir pm2

EXPOSE 5000
#CMD ["npm","run","dev"] #run via nodemon

CMD pm2 start main.js && \
pm2 save & \
pm2 logs
