import { readFileSync } from 'fs';
import yaml from 'js-yaml';

export interface ThemeData {
	textColor: string;
	activeColor: string;
	backgroundColor: string;
}

interface ThemeYaml {
	theme: ThemeData;
}

export function loadThemeData(): ThemeData {
	const yamlContent = readFileSync('content/theme.yaml', 'utf-8');
	const data = yaml.load(yamlContent) as ThemeYaml;
	return data.theme;
}
