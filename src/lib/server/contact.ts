import { readFileSync } from 'fs';
import yaml from 'js-yaml';

export interface ContactData {
	note: string;
	email: string;
	instagram: string;
	linkedin: string;
	ual: string;
	imageAbout: string;
	imageContact: string;
}

interface ContactYaml {
	contact: ContactData;
}

export function loadContactData(): ContactData {
	const yamlContent = readFileSync('content/contact.yaml', 'utf-8');
	const data = yaml.load(yamlContent) as ContactYaml;
	return data.contact;
}
