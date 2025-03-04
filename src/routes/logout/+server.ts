import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ cookies }) => {
    for (const cookie of cookies.getAll()) {
        cookies.delete(cookie.name, { path: '/' });
    }
    // this route doesnt technically work bcs elysia just hates deleting cookies
    return redirect(308, `${Bun.env.API_URL}/auth/logout`);
};