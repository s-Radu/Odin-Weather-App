import toggleDarkMode from './darkMode';
import processWeatherData from './getData';
import nav from './nav';
import './style.css';
import { getElement } from './utilis';

const location = getElement('#location');
const parentElement = document.body;

parentElement.appendChild(nav());

let darkModeToggle = getElement('#toggle');
darkModeToggle.addEventListener('click', toggleDarkMode);

location.addEventListener('keydown', getLocation);

function getLocation(e) {
	if (e.key === 'Enter') {
		processWeatherData(location.value);
		location.value = '';
	}
}

const suggestionsDiv = document.getElementById('suggestions');

location.addEventListener('input', async function () {
	const query = this.value;
	suggestionsDiv.innerHTML = ''; // Clear the previous suggestions
	if (query) {
		// Only fetch suggestions if the input is not empty
		const suggestions = await getAutocompleteSuggestions(query);
		suggestions.forEach((suggestion) => {
			const div = document.createElement('div');
			div.textContent = suggestion.name;
			div.addEventListener('click', function () {
				location.value = this.textContent; // Set the input value to the clicked suggestion
				processWeatherData(location.value); // Call the function to trigger the search
				location.value = '';
				suggestionsDiv.innerHTML = ''; // Clear the suggestions
			});
			suggestionsDiv.appendChild(div);
		});
	}
});

async function getAutocompleteSuggestions(query) {
	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/search.json?key=025edeae7fbf45ad949194206241504&q=${query}`,
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
}
