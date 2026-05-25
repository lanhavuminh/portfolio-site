export const prerender = true;

import type { LayoutServerLoad } from './$types';
import { loadContactData } from '$lib/server/contact';
import { loadCollectionsData } from '$lib/server/collections';
import { loadSpecialProjectsData } from '$lib/server/special-projects';
import { loadThemeData } from '$lib/server/theme';

export const load: LayoutServerLoad = () => {
	const collectionsData = loadCollectionsData();
	const specialProjects = loadSpecialProjectsData();
	const contactData = loadContactData();
	const themeData = loadThemeData();

	return {
		collections: collectionsData.collections,
		specialProjects,
		contact: contactData,
		theme: themeData
	};
};
