import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const guildId = formData.get('id') as string;
        const action = formData.get('action') as string;

        const kvdb = Bun.redis;

        if (action === 'getKv') {
            return JSON.stringify([
                await kvdb.hkeys(guildId),
                await kvdb.hvals(guildId)
            ]);
        }
        if (action === 'delKv') {
            const field = formData.get('field') as string;
            await kvdb.send('HDEL', [guildId, field]);
            return true;
        }
        if (action === 'setKv') {
            const field = formData.get('field') as string;
            const value = formData.get('value') as string;
            await kvdb.hmset(guildId, [field, value]);
            return true;
        }
        return false;
    }
};