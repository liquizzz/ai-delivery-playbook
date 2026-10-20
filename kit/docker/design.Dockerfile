# SPDX-License-Identifier: MIT
# Crewbook by Hai Nguyen (github.com/liquizzz/crewbook-build)
#
# UI/UX prototype: built from design/ and packages/tokens/ only, served as static files.
# Keep design/ free of imports from app/, so product changes never change the prototype.
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /repo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/tokens ./packages/tokens
COPY design ./design
RUN pnpm install --frozen-lockfile --filter design... && pnpm --filter design build

FROM nginx:1.27-alpine
COPY --from=build /repo/design/dist /usr/share/nginx/html
EXPOSE 80
