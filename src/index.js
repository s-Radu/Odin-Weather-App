// **** Imports ****
import toggleDarkMode from './darkMode';
import processWeatherData from './getData';
import handleInput from './inputSuggestions';
import nav from './nav';
import './style.css';
import { getElement } from './utilis';

// **** Variables ****

const location = getElement('#location');
const parentElement = document.body;

// **** Add elements to page ****

parentElement.appendChild(nav());

// **** Event listeners ****

let darkModeToggle = getElement('#toggle');
darkModeToggle.addEventListener('click', toggleDarkMode);

location.addEventListener('keydown', getLocation);

location.addEventListener('input', function () {
	handleInput(this);
});

// **** Functions ****

function getLocation(e) {
	if (e.key === 'Enter') {
		processWeatherData(location.value);
		location.value = '';
	}
}
