import type { LayoutServerLoad } from './$types';
import { loadContactData } from '$lib/server/contact';
import { loadCollectionsData } from '$lib/server/collections';
import { loadThemeData } from '$lib/server/theme';

export const load: LayoutServerLoad = () => {
	const collectionsData = loadCollectionsData();
	const contactData = loadContactData();
	const themeData = loadThemeData();

	return {
		collections: collectionsData.collections,
		contact: contactData,
		theme: themeData
	};
};
