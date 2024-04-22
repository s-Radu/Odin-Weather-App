import { createElement } from './utilis.js';

export default function main() {
	const main = createElement({
		type: 'main',
		classes:
			'min-h-96 dark:text-primary text-black container mx-auto grid grid-cols-1 grid-rows-12 mt-20',
		id: 'main',
	});
	return main;
}
