# SPDX-License-Identifier: MIT
# AI Delivery Playbook by Hai Nguyen (github.com/liquizzz/ai-delivery-playbook)
#
# The product. This example builds a Node app from app/ and packages/tokens/;
# the Lead or DevOps session rewrites it for your stack during setup.
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /repo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/tokens ./packages/tokens
COPY app ./app
RUN pnpm install --frozen-lockfile --filter app... && pnpm --filter app build

FROM node:22-alpine
WORKDIR /srv
COPY --from=build /repo/app ./
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
CMD ["node", "dist/server.js"]
