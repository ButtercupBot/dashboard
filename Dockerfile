FROM oven/bun AS build

WORKDIR /app

COPY package.json package.json

RUN bun remove butter-api
RUN bun install

COPY . .

ENV NODE_ENV=production

RUN bun run build

FROM oven/bun

WORKDIR /app

COPY --from=build /app/build build

ENV NODE_ENV=production

EXPOSE 3000
ENTRYPOINT ["bun", "./build"]
