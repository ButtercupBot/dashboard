import { treaty } from '@elysiajs/eden';
import type { API } from 'butter-api';
import { XataClient } from '$lib/xata';
import type { LayoutServerLoad } from './$types';
import type { User } from 'discord-auth.ts/src/interfaces/user/user';
import type { Guild } from 'discord-auth.ts/src/interfaces/guild/guild';
import { activeGuildStore } from '$lib/stores';
import { get } from 'svelte/store';

const api = treaty<API>(Bun.env.API_URL, {
    headers: {
        Authorization: `Bearer ${Bun.env.API_KEY}`,
    },
});

const xata = new XataClient({
    apiKey: Bun.env.XATA_API_KEY,
    branch: Bun.env.XATA_BRANCH,
});

export const load: LayoutServerLoad = async ({ cookies }) => {
    const token = cookies.get('token');
    const loggedIn = !!token;
    const userData = loggedIn ? JSON.parse(cookies.get('userData') as string) as User : undefined;

    const guilds: App.Guild[] = [];

    if (loggedIn) {
        const records = await xata.db.guilds
            .select(['guild_id', 'managers', 'plan'])
            .filter({ managers: { $includes: userData?.id } })
            .getAll();
        for (const record of records) {
            const guild = (await api.guild({ id: record.guild_id }).get()).data as Guild;
            if (guild) {
                guild.icon;
                const guildObj: App.Guild = {
                    icon: guild.icon || '',
                    id: guild.id,
                    name: guild.name,
                    plan: record.plan as 'free' | 'plus'
                };
                guilds.push(guildObj);
            }
        }
    }

    return {
        loggedIn,
        userData,
        guilds,
        activeGuild: get(activeGuildStore),
        api_url: Bun.env.API_URL
    };
};
