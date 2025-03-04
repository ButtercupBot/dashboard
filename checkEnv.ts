import Bun from 'bun';

if (!Bun.env.DISCORD_SECRET) throw new Error('DISCORD_SECRET not set');
if (!Bun.env.DISCORD_CALLBACK) throw new Error('DISCORD_CALLBACK not set');
if (!Bun.env.API_KEY) throw new Error('API_KEY not set');
if (!Bun.env.API_URL) throw new Error('API_URL not set');
if (!Bun.env.CLIENT_ID) throw new Error('CLIENT_ID not set');
