/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/darkMode.js":
/*!*************************!*\
  !*** ./src/darkMode.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toggleDarkMode)
/* harmony export */ });
/* harmony import */ var _utilis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilis */ "./src/utilis.js");

let circle;
function updateTheme(isDarkMode) {
  const html = document.querySelector('html');
  circle.classList.toggle('translate-x-5', isDarkMode);
  html.classList.toggle('dark', isDarkMode);
}
function setInitialTheme() {
  circle = (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.getElement)('#circle');
  const isDarkMode = localStorage.getItem('color-theme') === 'dark' || !('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches;
  updateTheme(isDarkMode);
}
function toggleDarkMode() {
  const isDarkMode = !circle.classList.contains('translate-x-5');
  updateTheme(isDarkMode);

  //? Update the color-theme in localStorage
  localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
}

//! Call the functions after the page has finished loading
window.onload = function () {
  setInitialTheme();
};

/***/ }),

/***/ "./src/footer.js":
/*!***********************!*\
  !*** ./src/footer.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ footer)
/* harmony export */ });
/* harmony import */ var _utilis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilis */ "./src/utilis.js");

function footer() {
  return (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    type: 'footer',
    classes: 'flex items-center dark:text-primary justify-center min-h-14',
    content: `
        <p class="mr-4">Built by lilVoid</p>
			<a href="https://github.com/s-Radu">
				<svg
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					width="40"
					height="40">
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"></g>
					<g id="SVGRepo_iconCarrier">
						<path
							d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path>
					</g>
				</svg>
			</a>
        `
  });
}

/***/ }),

/***/ "./src/getData.js":
/*!************************!*\
  !*** ./src/getData.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ processWeatherData)
/* harmony export */ });
/* harmony import */ var _utilis__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilis */ "./src/utilis.js");

let main;
window.addEventListener('DOMContentLoaded', () => {
  main = (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.getElement)('#main');
});
async function callWeatherAPI(city) {
  // !Stop forgeting to use FETCH in order to fetch the data from the API!!!!!!!

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=025edeae7fbf45ad949194206241504&q=${city}&days=5&aqi=no&alerts=yes`, {
      mode: 'cors'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
function extractWeatherData(data) {
  main.innerHTML = '';
  const location = {
    city: data.location.name,
    country: data.location.country
  };
  const currentDay = {
    tempC: data.current.temp_c,
    feelsLikeC: data.current.feelslike_c,
    humidity: data.current.humidity,
    uv: data.current.uv,
    windDirection: data.current.wind_dir,
    windSpeed: data.current.wind_kph,
    condition: data.current.condition.text,
    icon: data.current.condition.icon
  };
  const forecast = data.forecast.forecastday.map(day => ({
    date: day.date,
    dayOfWeek: new Date(day.date).toLocaleDateString('en-US', {
      weekday: 'long'
    }),
    sunrise: day.astro.sunrise,
    sunset: day.astro.sunset,
    minTempC: day.day.mintemp_c,
    maxTempC: day.day.maxtemp_c,
    avgHumidity: day.day.avghumidity,
    uv: day.day.uv,
    avgVisibilityKm: day.day.avgvis_km,
    chancesOfRain: day.day.daily_chance_of_rain,
    condition: day.day.condition.text,
    icon: day.day.condition.icon,
    hourly: day.hour.map(hour => ({
      time: hour.time,
      temp: hour.temp_c,
      rainChances: hour.chance_of_rain,
      icon: hour.condition.icon
    }))
  }));
  displayData(location, currentDay, forecast);
}
async function processWeatherData(city) {
  try {
    const data = await callWeatherAPI(city);
    // The below console logs the data in a json format that's pretty easy to read, but at the moment, I need it in an array so I can choose what I want
    // console.log(JSON.stringify(data, null, 2));
    if (data) {
      extractWeatherData(data);
      console.log(data);
    }
  } catch (err) {
    console.log(err);
  }
}
function displayData(location, currentDay, forecast) {
  const city = (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    type: 'div',
    classes: 'flex flex-col items-center mt-4 row-span-1',
    content: `
		<h1 class="text-3xl">${location.city}</h1>
				<h3 class="mt-2 ml-16">${location.country}</h3>
				<img
					src="${currentDay.icon}"
					alt=""
					class="mr-4" />
		`
  });
  const today = (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    type: 'div',
    classes: 'row-span-1 md:max-w-md container mx-auto m-4',
    content: `
		<h1 class="text-3xl text-center m-8">Today</h1>
				<div class="flex flex-wrap justify-around items-center m-4">
					<div>
					<p class="m-1 text-lg">Temp: ${currentDay.tempC}°C</p>
					<p class="m-1 text-lg">Feels Like: ${currentDay.feelsLikeC}°C</p>
					<p class="m-1 text-lg">Humidity: ${currentDay.humidity}%</p>
					</div>
					<div>
					<p class="m-1 text-lg">UV: ${currentDay.uv}</p>
					<p class="m-1 text-lg">Wind Direction: ${currentDay.windDirection}</p>
					<p class="m-1 text-lg">Wind Speed: ${currentDay.windSpeed} kph</p>
					</div>
					<p class="self-start text-xl mt-6">Conditions ${currentDay.condition}</p>
				</div>
		`
  });
  const forecastDays = forecast.map(day => {
    // Generate the HTML for the hourly forecast
    const hourlyHtml = day.hourly.map(hour => {
      const timeOnly = hour.time.split(' ')[1];
      return `
			  <div class="flex flex-col items-center min-w-44">
				<h1 class="text-xl">${timeOnly}</h1>
				<img src="${hour.icon}" alt="" />
				<p class="m-1">Temp: ${hour.temp}°C</p>
				<p class="m-1">Chance of Rain: ${hour.rainChances}%</p>
			  </div>
			`;
    }).join('');

    // Create the element for the day's forecast
    return (0,_utilis__WEBPACK_IMPORTED_MODULE_0__.createElement)({
      type: 'div',
      classes: 'row-span-2 flex flex-col',
      content: `<div class="flex flex-col justify-around">
		<h1 class="text-center m-4 text-3xl">${day.dayOfWeek}</h1>
	<div class="flex flex-col items-center md:flex-row justify-around">
		<div>
				<p class="m-1 text-lg">Sunrise: ${day.sunrise}</p>
				<p class="m-1 text-lg">Sunset: ${day.sunset}</p>
			</div>
			<div>
				<p class="m-1 text-lg">Min Temp: ${day.minTempC}°C</p>
				<p class="m-1 text-lg">Max Temp: ${day.maxTempC}°C</p>
				<p class="m-1 text-lg">Avg Humidity: ${day.avgHumidity}</p>
				<p class="m-1 text-lg">UV: ${day.uv}</p>
			</div>
			<div>
				<p class="m-1 text-lg">Avg Visibility: ${day.avgVisibilityKm} km</p>
				<p class="m-1 text-lg">Chances of Rain: ${day.chancesOfRain}</p>
				<p class="m-1 text-lg">Conditions: ${day.condition}</p>
			</div>
		</div>
		<img
			src="${day.icon}"
			alt=""
			class="self-center m-4" />
	</div>
	<div class="overflow-scroll flex">
			${hourlyHtml}
	</div>
</div>`
    });
  });
  const elements = [city, today, ...forecastDays];
  elements.forEach(element => {
    main.appendChild(element);
  });
  console.log(forecast);
}

/***/ }),

/***/ "./src/inputSuggestions.js":
/*!*********************************!*\
  !*** ./src/inputSuggestions.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handleInput)
/* harmony export */ });
/* harmony import */ var _getData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getData */ "./src/getData.js");
/* harmony import */ var _utilis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilis */ "./src/utilis.js");


let suggestionParent;
window.addEventListener('DOMContentLoaded', () => {
  suggestionParent = (0,_utilis__WEBPACK_IMPORTED_MODULE_1__.getElement)('#suggestions');
});
async function handleInput(input) {
  const query = input.value; // Get input value.
  suggestionParent.innerHTML = ''; // Clear the previous suggestions.

  // Only fetch suggestions if the input is not empty.
  if (query) {
    // await on API for autocomplete suggestions.
    const suggestions = await getAutocompleteSuggestions(query);
    // For each suggestion received from the API create a new div, add the suggestions received from API, add event listener and append it to the parent element.
    suggestions.forEach(suggestion => {
      const div = (0,_utilis__WEBPACK_IMPORTED_MODULE_1__.createElement)({
        type: 'div',
        classes: 'mt-1 hover:bg-slate-400 cursor-pointer w-full text-center rounded-md',
        content: `${suggestion.name}`
      });
      // Add event listener for each suggestion received from API.
      div.addEventListener('click', () => {
        handleSuggestion(input);
      });
      suggestionParent.appendChild(div);
    });
  }
}
function handleSuggestion(input) {
  (0,_getData__WEBPACK_IMPORTED_MODULE_0__["default"])(input.value); // Call the processWeatherData to get information
  input.value = 'Searching...'; // Set the input value to the clicked suggestion
  suggestionParent.innerHTML = ''; // Clear the suggestions
  setTimeout(() => {
    input.value = ''; // Clear input value
  }, 500);
}
async function getAutocompleteSuggestions(query) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=025edeae7fbf45ad949194206241504&q=${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _utilis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilis.js */ "./src/utilis.js");

function main() {
  const main = (0,_utilis_js__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    type: 'main',
    classes: 'min-h-[80vh] dark:text-primary text-black container mx-auto grid grid-cols-1 grid-rows-12 mt-20',
    id: 'main'
  });
  return main;
}

/***/ }),

/***/ "./src/nav.js":
/*!********************!*\
  !*** ./src/nav.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ nav)
/* harmony export */ });
/* harmony import */ var _imgs_logo_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imgs/logo.png */ "./src/imgs/logo.png");
/* harmony import */ var _utilis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilis.js */ "./src/utilis.js");


function nav() {
  const header = (0,_utilis_js__WEBPACK_IMPORTED_MODULE_1__.createElement)({
    type: 'header',
    classes: 'dark:text-primary text-black container mx-auto min-h-10',
    content: `
		<div class="container mx-auto flex flex-wrap p-5 items-center justify-between relative">
				<div class="relative flex w-20 h-10">
					<a href="#">
						<img src="${_imgs_logo_png__WEBPACK_IMPORTED_MODULE_0__["default"]}" alt="Icon" class="w-20 absolute" />
					</a>
				</div>

				<div class="absolute left-2/4 top-7 -translate-x-2/4 max-w-36">
					<input
						type="text"
						id="location"
						class="rounded-md indent-2 outline-none bg-slate-700 text-white dark:bg-slate-100 dark:text-black" />
					<div id="suggestions" class="flex flex-col">
					</div>
				</div>

				<div
					id="toggle"
					class="w-12 h-6 flex items-center group relative bg-gray-800 dark:bg-gray-300 rounded-full p-1 cursor-pointer transform duration-200 ease-in-expo hover:scale-105">
					<div
						id="circle"
						class="w-5 h-5 bg-gray-300 dark:bg-gray-800 rounded-full duration-500 translate-x-5 ease-in-expo"></div>
					<span
						class="absolute text-xs bg-gray-700 text-gray-100 dark:bg-gray-100 dark:text-gray-700 p-1 min-w-20 text-center rounded-lg opacity-0 group-hover:opacity-100 -bottom-16 -left-1/3 transition-all duration-200 ease-in-expo"
						x-show="showTooltip">
						Toggle dark mode
					</span>
				</div>
			</div>
        `
  });
  return header;
}

/***/ }),

/***/ "./src/utilis.js":
/*!***********************!*\
  !*** ./src/utilis.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createElement: () => (/* binding */ createElement),
/* harmony export */   getElement: () => (/* binding */ getElement)
/* harmony export */ });
function createElement(_ref) {
  let {
    type,
    id,
    attributes,
    dataAttributes,
    classes,
    content
  } = _ref;
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
function getElement(selector) {
  let all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const parentElement = document.body;
  return all ? parentElement.querySelectorAll(selector) : parentElement.querySelector(selector);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/style.css":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/style.css ***!
  \***********************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;1,300;1,400&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;1,6..12,300;1,6..12,400&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
! tailwindcss v3.4.1 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  -o-tab-size: 4;
     tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  text-decoration: underline;
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::-moz-placeholder, textarea::-moz-placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
  display: none;
}

*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 rgba(0,0,0,0);
  --tw-ring-shadow: 0 0 rgba(0,0,0,0);
  --tw-shadow: 0 0 rgba(0,0,0,0);
  --tw-shadow-colored: 0 0 rgba(0,0,0,0);
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 rgba(0,0,0,0);
  --tw-ring-shadow: 0 0 rgba(0,0,0,0);
  --tw-shadow: 0 0 rgba(0,0,0,0);
  --tw-shadow-colored: 0 0 rgba(0,0,0,0);
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}
.container {
  width: 100%;
}
@media (min-width: 640px) {

  .container {
    max-width: 640px;
  }
}
@media (min-width: 768px) {

  .container {
    max-width: 768px;
  }
}
@media (min-width: 1024px) {

  .container {
    max-width: 1024px;
  }
}
@media (min-width: 1280px) {

  .container {
    max-width: 1280px;
  }
}
@media (min-width: 1536px) {

  .container {
    max-width: 1536px;
  }
}

.btn {
  margin-top: 0px;
  align-items: center;
  border-radius: 0.5rem;
  border-width: 0px;
  --tw-bg-opacity: 1;
  background-color: rgba(79, 79, 79, 1);
  background-color: rgba(79, 79, 79, var(--tw-bg-opacity));
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.btn:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(70, 69, 69, 1);
  background-color: rgba(70, 69, 69, var(--tw-bg-opacity));
}

.btn:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.center {
  position: absolute;
  top: 0px;
  left: 2.5rem;
}
.animate {
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.noice {
  padding-bottom: 0.5rem;
	background: linear-gradient(currentColor 0, currentColor 0) left 50% bottom 0 /
			10% 3px no-repeat,
		linear-gradient(currentColor 0, currentColor 0) right 50% bottom 0 /
			10% 3px no-repeat;
	background: linear-gradient(currentColor 0, currentColor 0) left var(--p, 50%) bottom 0 /
			var(--d, 10%) 3px no-repeat,
		linear-gradient(currentColor 0, currentColor 0) right var(--p, 50%) bottom 0 /
			var(--d, 10%) 3px no-repeat;
	background: linear-gradient(currentColor 0 0) left 50% bottom 0 /
			10% 3px no-repeat,
		linear-gradient(currentColor 0 0) right 50% bottom 0 /
			10% 3px no-repeat;
	transition: 0.3s, background-position 0.3s 0.3s;
}

@supports (background: linear-gradient(red 0%, red 0% 1%, red 2%)) {
.noice {
	background: linear-gradient(currentColor 0 0) left var(--p, 50%) bottom 0 /
			var(--d, 10%) 3px no-repeat,
		linear-gradient(currentColor 0 0) right var(--p, 50%) bottom 0 /
			var(--d, 10%) 3px no-repeat;
  }
}

.noice:hover {
	--d: 50%;
	--p: 50.1%;
	transition: cubic-bezier(0, 500, 1, 500) 0.3s, background-size 0.3s 0.3s;
}

.absolute {
  position: absolute;
}

.relative {
  position: relative;
}

.-bottom-16 {
  bottom: -4rem;
}

.-left-1\\/3 {
  left: -33.333333%;
}

.left-2\\/4 {
  left: 50%;
}

.top-7 {
  top: 1.75rem;
}

.row-span-1 {
  grid-row: span 1 / span 1;
}

.row-span-2 {
  grid-row: span 2 / span 2;
}

.m-1 {
  margin: 0.25rem;
}

.m-4 {
  margin: 1rem;
}

.m-8 {
  margin: 2rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.ml-16 {
  margin-left: 4rem;
}

.mr-4 {
  margin-right: 1rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-20 {
  margin-top: 5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.flex {
  display: flex;
}

.grid {
  display: grid;
}

.h-10 {
  height: 2.5rem;
}

.h-5 {
  height: 1.25rem;
}

.h-6 {
  height: 1.5rem;
}

.min-h-10 {
  min-height: 2.5rem;
}

.min-h-14 {
  min-height: 3.5rem;
}

.min-h-\\[80vh\\] {
  min-height: 80vh;
}

.min-h-screen {
  min-height: 100vh;
}

.w-12 {
  width: 3rem;
}

.w-20 {
  width: 5rem;
}

.w-5 {
  width: 1.25rem;
}

.w-full {
  width: 100%;
}

.min-w-20 {
  min-width: 5rem;
}

.min-w-44 {
  min-width: 11rem;
}

.max-w-36 {
  max-width: 9rem;
}

.-translate-x-2\\/4 {
  --tw-translate-x: -50%;
  transform: translate(-50%, var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.translate-x-5 {
  --tw-translate-x: 1.25rem;
  transform: translate(1.25rem, var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.cursor-pointer {
  cursor: pointer;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.grid-rows-12 {
  grid-template-rows: repeat(12, minmax(0, 1fr));
}

.flex-col {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.justify-around {
  justify-content: space-around;
}

.self-start {
  align-self: flex-start;
}

.self-center {
  align-self: center;
}

.overflow-scroll {
  overflow: scroll;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgba(209, 213, 219, 1);
  background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
}

.bg-gray-700 {
  --tw-bg-opacity: 1;
  background-color: rgba(55, 65, 81, 1);
  background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
}

.bg-gray-800 {
  --tw-bg-opacity: 1;
  background-color: rgba(31, 41, 55, 1);
  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
}

.bg-slate-700 {
  --tw-bg-opacity: 1;
  background-color: rgba(51, 65, 85, 1);
  background-color: rgba(51, 65, 85, var(--tw-bg-opacity));
}

.p-1 {
  padding: 0.25rem;
}

.p-5 {
  padding: 1.25rem;
}

.text-center {
  text-align: center;
}

.indent-2 {
  text-indent: 0.5rem;
}

.font-josefin {
  font-family: Josefin Sans, sans-serif;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.text-black {
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, 1);
  color: rgba(0, 0, 0, var(--tw-text-opacity));
}

.text-gray-100 {
  --tw-text-opacity: 1;
  color: rgba(243, 244, 246, 1);
  color: rgba(243, 244, 246, var(--tw-text-opacity));
}

.text-white {
  --tw-text-opacity: 1;
  color: rgba(255, 255, 255, 1);
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}

.opacity-0 {
  opacity: 0;
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.duration-200 {
  transition-duration: 200ms;
}

.duration-500 {
  transition-duration: 500ms;
}

.ease-in-expo {
  transition-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
}

.hover\\:scale-105:hover {
  --tw-scale-x: 1.05;
  --tw-scale-y: 1.05;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(1.05) scaleY(1.05);
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\\:bg-slate-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgba(148, 163, 184, 1);
  background-color: rgba(148, 163, 184, var(--tw-bg-opacity));
}

.group:hover .group-hover\\:opacity-100 {
  opacity: 1;
}

.dark .dark\\:bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, 1);
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
}

.dark .dark\\:bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgba(209, 213, 219, 1);
  background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
}

.dark .dark\\:bg-gray-800 {
  --tw-bg-opacity: 1;
  background-color: rgba(31, 41, 55, 1);
  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
}

.dark .dark\\:bg-secondary {
  --tw-bg-opacity: 1;
  background-color: rgba(79, 79, 79, 1);
  background-color: rgba(79, 79, 79, var(--tw-bg-opacity));
}

.dark .dark\\:bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgba(241, 245, 249, 1);
  background-color: rgba(241, 245, 249, var(--tw-bg-opacity));
}

.dark .dark\\:text-black {
  --tw-text-opacity: 1;
  color: rgba(0, 0, 0, 1);
  color: rgba(0, 0, 0, var(--tw-text-opacity));
}

.dark .dark\\:text-gray-700 {
  --tw-text-opacity: 1;
  color: rgba(55, 65, 81, 1);
  color: rgba(55, 65, 81, var(--tw-text-opacity));
}

.dark .dark\\:text-primary {
  --tw-text-opacity: 1;
  color: rgba(235, 190, 125, 1);
  color: rgba(235, 190, 125, var(--tw-text-opacity));
}

@media (min-width: 768px) {

  .md\\:max-w-md {
    max-width: 28rem;
  }

  .md\\:flex-row {
    flex-direction: row;
  }
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@import 'tailwindcss/base';\n@import 'tailwindcss/components';\n\n.btn {\n\t@apply items-center bg-secondary border-0 py-1 px-3 focus:outline-none hover:bg-secondaryHover rounded-lg text-base mt-0;\n}\n.center {\n\t@apply absolute top-0 left-10;\n}\n.animate {\n\t@apply transition-all duration-200 ease-in-out;\n}\n\n.noice {\n\t@apply pb-2;\n\tbackground: linear-gradient(currentColor 0 0) left var(--p, 50%) bottom 0 /\n\t\t\tvar(--d, 10%) 3px no-repeat,\n\t\tlinear-gradient(currentColor 0 0) right var(--p, 50%) bottom 0 /\n\t\t\tvar(--d, 10%) 3px no-repeat;\n\ttransition: 0.3s, background-position 0.3s 0.3s;\n}\n\n.noice:hover {\n\t--d: 50%;\n\t--p: 50.1%;\n\ttransition: cubic-bezier(0, 500, 1, 500) 0.3s, background-size 0.3s 0.3s;\n}\n\n@import 'tailwindcss/utilities';\n\n@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:ital,wght@0,300;0,400;1,300;1,400&family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;1,6..12,300;1,6..12,400&display=swap');\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/imgs/logo.png":
/*!***************************!*\
  !*** ./src/imgs/logo.png ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "images/logo.png");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!../node_modules/postcss-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].use[1]!./node_modules/postcss-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _darkMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./darkMode */ "./src/darkMode.js");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./footer */ "./src/footer.js");
/* harmony import */ var _getData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getData */ "./src/getData.js");
/* harmony import */ var _inputSuggestions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputSuggestions */ "./src/inputSuggestions.js");
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main */ "./src/main.js");
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nav */ "./src/nav.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _utilis__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utilis */ "./src/utilis.js");
// **** Imports ****









// **** selecting the body so we can append elements ****

const parentElement = document.body;

// **** Add elements to page ****

const elements = [(0,_nav__WEBPACK_IMPORTED_MODULE_5__["default"])(), (0,_main__WEBPACK_IMPORTED_MODULE_4__["default"])(), (0,_footer__WEBPACK_IMPORTED_MODULE_1__["default"])()];
elements.forEach(element => {
  parentElement.appendChild(element);
});

// **** variables that need to be after appending the elements to the page ***

const location = (0,_utilis__WEBPACK_IMPORTED_MODULE_7__.getElement)('#location');

// **** Event listeners ****

let darkModeToggle = (0,_utilis__WEBPACK_IMPORTED_MODULE_7__.getElement)('#toggle');
darkModeToggle.addEventListener('click', _darkMode__WEBPACK_IMPORTED_MODULE_0__["default"]);
location.addEventListener('keydown', getLocation);
location.addEventListener('input', function () {
  (0,_inputSuggestions__WEBPACK_IMPORTED_MODULE_3__["default"])(this);
});

// **** Functions ****

function getLocation(e) {
  if (e.key === 'Enter') {
    (0,_getData__WEBPACK_IMPORTED_MODULE_2__["default"])(location.value);
    location.value = '';
  }
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map