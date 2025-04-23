FROM oven/bun

WORKDIR /app

COPY package.json package.json

RUN bun remove butter-api
RUN bun install

COPY . .
RUN bun run build

EXPOSE 3000
ENV ORIGIN=https://dash.buttercup.boo
ENTRYPOINT ["bun", "./build"]