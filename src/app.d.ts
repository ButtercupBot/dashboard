
import type { Sidebar, SidebarRail } from '$lib/components/ui/sidebar';
import type { ComponentProps } from 'svelte';

declare global {
    namespace App {
        type SidebarType = User & ComponentProps<typeof Sidebar.Root>;
        type Guild = {
            name: string;
            id: string,
            icon: string | null;
            plan: 'free' | 'plus';
        };
        type User = {
            avatar: string;
            username: string;
        };
    }
}

declare module "bun" {
    interface Env {
        DISCORD_SECRET: string;
        DISCORD_CALLBACK: string;
        API_KEY: string;
        API_URL: string;
        CLIENT_ID: string;
    }
}