import type { LayoutServerLoad } from './$types';
import { loadContactData } from '$lib/server/contact';
import { loadCollectionsData } from '$lib/server/collections';

export const load: LayoutServerLoad = () => {
	const collectionsData = loadCollectionsData();
	const contactData = loadContactData();

	return {
		collections: collectionsData.collections,
		contact: contactData
	};
};
