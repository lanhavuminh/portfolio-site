import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	test('should render video element', () => {
		render(Page);
		const video = screen.getByRole('main').querySelector('video');
		expect(video).toBeInTheDocument();
	});
});
