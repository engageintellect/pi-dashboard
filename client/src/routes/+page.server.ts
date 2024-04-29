import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const res = await fetch('https://engage-dev.com/dashboard/api/os');
	const json = await res.json();

	if (!res.ok) {
		throw error(500, 'Failed to fetch data from the API');
	}

	return { json };
};