import './style.css';
import { getElement } from './utilis';
import nav from './nav';
import toggleDarkMode from './darkMode';

const parentElement = document.body;

parentElement.appendChild(nav());

let darkModeToggle = getElement('#toggle');
darkModeToggle.addEventListener('click', toggleDarkMode);

let x;
