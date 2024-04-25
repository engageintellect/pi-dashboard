import { PUBLIC_BASE_URL } from '$env/static/public';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const res = await fetch(`${PUBLIC_BASE_URL}/pb/_/`);
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data.message);
	} else {
		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'application/json' }
		});
	}
};