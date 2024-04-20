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
