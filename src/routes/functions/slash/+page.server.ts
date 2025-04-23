import { treaty } from '@elysiajs/eden';
import type { API } from 'butter-api';
import type { Actions } from '@sveltejs/kit';

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