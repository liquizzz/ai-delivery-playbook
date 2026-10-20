# SPDX-License-Identifier: MIT
# Crewbook by Hai Nguyen (github.com/liquizzz/crewbook-build)
#
# The product. A placeholder for a plain Node app in app/ that listens on PORT.
# During setup the Lead rewrites it for the stack the owner chose.
FROM node:22-alpine
WORKDIR /srv
COPY app/package*.json ./
RUN npm install --omit=dev
COPY app/ ./
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
