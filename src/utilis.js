export function createElement({
	type,
	id,
	attributes,
	dataAttributes,
	classes,
	content,
}) {
	const newElement = document.createElement(type);

	//* add Id
	if (id) newElement.id = id;

	//* add attributes
	if (attributes) {
		for (const key in attributes) {
			newElement.setAttribute(key, attributes[key]);
		}
	}

	//* add data-attributes
	if (dataAttributes) {
		for (const key in dataAttributes) {
			newElement.dataset[key] = dataAttributes[key];
		}
	}

	//* add classes
	if (classes) {
		newElement.className = classes;
	}

	//* add content

	if (content) {
		newElement.innerHTML = content;
	}

	return newElement;
}

export function getElement(selector, all = false) {
	const parentElement = document.body;

	return all
		? parentElement.querySelectorAll(selector)
		: parentElement.querySelector(selector);
}
