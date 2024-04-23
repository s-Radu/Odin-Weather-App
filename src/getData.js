import { createElement, getElement } from './utilis';
let main;

window.addEventListener('DOMContentLoaded', () => {
	main = getElement('#main');
});

async function callWeatherAPI(city) {
	// !Stop forgeting to use FETCH in order to fetch the data from the API!!!!!!!

	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=025edeae7fbf45ad949194206241504&q=${city}&days=5&aqi=no&alerts=yes`,
			{ mode: 'cors' },
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

function extractWeatherData(data) {
	main.innerHTML = '';

	const location = { city: data.location.name, country: data.location.country };
	const currentDay = {
		tempC: data.current.temp_c,
		feelsLikeC: data.current.feelslike_c,
		humidity: data.current.humidity,
		uv: data.current.uv,
		windDirection: data.current.wind_dir,
		windSpeed: data.current.wind_kph,
		condition: data.current.condition.text,
		icon: data.current.condition.icon,
	};

	const forecast = data.forecast.forecastday.map((day) => ({
		date: day.date,
		dayOfWeek: new Date(day.date).toLocaleDateString('en-US', {
			weekday: 'long',
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
		hourly: day.hour.map((hour) => ({
			time: hour.time,
			temp: hour.temp_c,
			rainChances: hour.chance_of_rain,
			icon: hour.condition.icon,
		})),
	}));

	displayData(location, currentDay, forecast);
}

export default async function processWeatherData(city) {
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
	const city = createElement({
		type: 'div',
		classes: 'flex flex-col items-center mt-4 row-span-1',
		content: `
		<h1 class="text-3xl">${location.city}</h1>
				<h3 class="mt-2 ml-16">${location.country}</h3>
				<img
					src="${currentDay.icon}"
					alt=""
					class="mr-4" />
		`,
	});

	const today = createElement({
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
		`,
	});

	const forecastDays = forecast.map((day) => {
		// Generate the HTML for the hourly forecast
		const hourlyHtml = day.hourly
			.map((hour) => {
				const timeOnly = hour.time.split(' ')[1];
				return `
			  <div class="flex flex-col items-center min-w-44">
				<h1 class="text-xl">${timeOnly}</h1>
				<img src="${hour.icon}" alt="" />
				<p class="m-1">Temp: ${hour.temp}°C</p>
				<p class="m-1">Chance of Rain: ${hour.rainChances}%</p>
			  </div>
			`;
			})
			.join('');

		// Create the element for the day's forecast
		return createElement({
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
</div>`,
		});
	});

	const elements = [city, today, ...forecastDays];

	elements.forEach((element) => {
		main.appendChild(element);
	});

	console.log(forecast);
}
