import toggleDarkMode from './darkMode';
import showWeatherData from './getData';
import nav from './nav';
import './style.css';
import { getElement } from './utilis';

const parentElement = document.body;

parentElement.appendChild(nav());

let darkModeToggle = getElement('#toggle');
darkModeToggle.addEventListener('click', toggleDarkMode);

showWeatherData();
