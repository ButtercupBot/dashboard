import { treaty } from '@elysiajs/eden';
import type { API } from 'butter-api';
import type { PageServerLoad } from './$types';
import { activeGuildStore } from '$lib/stores';
import { get } from 'svelte/store';
import { page } from '$app/state';
import type { Actions } from '@sveltejs/kit';
import { readableStreamToText } from 'bun';
import type { Role } from 'discord.js';

const api = treaty<API>(Bun.env.API_URL, {
    headers: {
        Authorization: `Bearer ${Bun.env.API_KEY}`,
    },
});

export const actions: Actions = {
    default: async ({ request }) => {
        const roles = JSON.stringify((await api.guild({ id: (await request.formData()).get('id') as string }).roles.get()).data);
        return roles;
    }
};