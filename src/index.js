// **** Imports ****
import toggleDarkMode from './darkMode';
import processWeatherData from './getData';
import handleInput from './inputSuggestions';
import main from './main';
import nav from './nav';
import './style.css';
import { getElement } from './utilis';

// **** selecting the body so we can append elements ****

const parentElement = document.body;

// **** Add elements to page ****

const elements = [nav(), main()];
elements.forEach((element) => {
	parentElement.appendChild(element);
});

// **** variables that need to be after appending the elements to the page ***

const location = getElement('#location');

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
