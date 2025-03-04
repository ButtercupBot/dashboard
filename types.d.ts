declare module "bun" {
    interface env {
        DISCORD_SECRET: string;
        DISCORD_CALLBACK: string;
        API_KEY: string;
        API_URL: string
    }
}