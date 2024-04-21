import processWeatherData from './getData';
import { createElement, getElement } from './utilis';

const suggestionParent = getElement('#suggestions');

export default async function handleInput(input) {
	const query = input.value; // Get input value.
	suggestionParent.innerHTML = ''; // Clear the previous suggestions.

	// Only fetch suggestions if the input is not empty.
	if (query) {
		// await on API for autocomplete suggestions.
		const suggestions = await getAutocompleteSuggestions(query);
		// For each suggestion received from the API create a new div, add the suggestions received from API, add event listener and append it to the parent element.
		suggestions.forEach((suggestion) => {
			const div = createElement({
				type: 'div',
				classes: 'cursor-pointer hover:bg-gray-200 rounded-md mt-2',
				content: `${suggestion.name}`,
			});
			// Add event listener for each suggestion received from API.
			div.addEventListener('click', () => {
				handleSuggestion(input, div);
			});
			suggestionParent.appendChild(div);
		});
	}
}

function handleSuggestion(input, div) {
	input.value = div.textContent; // Set the input value to the clicked suggestion
	processWeatherData(input.value); // Call the processWeatherData to get information
	suggestionParent.innerHTML = ''; // Clear the suggestions
	setTimeout(() => {
		input.value = ''; // Clear input value
	}, 300);
}

async function getAutocompleteSuggestions(query) {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/search.json?key=025edeae7fbf45ad949194206241504&q=${query}`,
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}
