// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = async () => {
	const res = await fetch('https://engage-dev.com/dashboard/api/os');
	const json = await res.json();

	if (!res.ok) {
		throw error(500, 'Failed to fetch data from the API');
	}

		console.log('no error', json);
	return { json };
};;null as any as PageServerLoad;