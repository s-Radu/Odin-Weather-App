async function callWeatherAPI(city) {
	// !Stop forgeting to use FETCH in order to fetch the data from the API!!!!!!!

	try {
		const response = await fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=025edeae7fbf45ad949194206241504&q=${city}&days=5&aqi=no&alerts=yes`,
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
	const { name: city, country } = data.location;
	const {
		temp_c: tempC,
		feelslike_c: feelsLike,
		humidity,
		uv,
		wind_dir,
		wind_kph,
		// Now, condition will hold the value of data.current.condition.text, so this way we are using nested destructuring and we avoind making another variable that will make the code even longer
		condition: { text: condition, icon },
	} = data.current;

	const {
		date: day1Date,
		astro: { sunrise: day1Sunrise, sunset: day1Sunset },
		day: {
			mintemp_c: day1MinTempC,
			maxtemp_c: day1MaxTempC,
			avghumidity: day1Humidity,
			uv: day1UV,
			avgvis_km: day1Visibility,
			daily_chance_of_rain: day1RainChances,
			condition: { text: day1Condition, icon: day1Icon },
		},
	} = data.forecast.forecastday[1];

	const {
		date: day2Date,
		astro: { sunrise: day2Sunrise, sunset: day2Sunset },
		day: {
			mintemp_c: day2MinTempC,
			maxtemp_c: day2MaxTempC,
			avghumidity: day2Humidity,
			uv: day2UV,
			avgvis_km: day2Visibility,
			daily_chance_of_rain: day2RainChances,
			condition: { text: day2Condition, icon: day2Icon },
		},
	} = data.forecast.forecastday[2];
	const {
		date: day3Date,
		astro: { sunrise: day3Sunrise, sunset: day3Sunset },
		day: {
			mintemp_c: day3MinTempC,
			maxtemp_c: day3MaxTempC,
			avghumidity: day3Humidity,
			uv: day3UV,
			avgvis_km: day3Visibility,
			daily_chance_of_rain: day3RainChances,
			condition: { text: day3Condition, icon: day3Icon },
		},
	} = data.forecast.forecastday[3];

	console.log(`
	${city},
	${country},
	Temp: ${tempC},
	Feels Like: ${feelsLike},
	Humidity: ${humidity}
	UV: ${uv}
	Wind Direction: ${wind_dir}
	Wind Speed: ${wind_kph}
	And it's currently: ${condition}
	${icon}
	`);

	console.log(`Forecast:
	${day1Date}
	Sunrise: ${day1Sunrise}
	Sunset: ${day1Sunset}
	Min Temp: ${day1MinTempC}
	Max Temp: ${day1MaxTempC}
	Condition: ${day1Condition}
	Average humidity: ${day1Humidity}%
	UV: ${day1UV}
	Rain chances are: ${day1RainChances}%
	Visibility: ${day1Visibility} km
	${day1Icon}
	`);

	console.log(`Forecast:
	${day2Date}
	Sunrise: ${day2Sunrise}
	Sunset: ${day2Sunset}
	Min Temp: ${day2MinTempC}
	Max Temp: ${day2MaxTempC}
	Condition: ${day2Condition}
	Average humidity: ${day2Humidity}%
	UV: ${day2UV}
	Rain chances are: ${day2RainChances}%
	Visibility: ${day2Visibility} km
	${day2Icon}
	`);

	console.log(`Forecast:
	${day3Date}
	Sunrise: ${day3Sunrise}
	Sunset: ${day3Sunset}
	Min Temp: ${day3MinTempC}
	Max Temp: ${day3MaxTempC}
	Condition: ${day3Condition}
	Average humidity: ${day3Humidity}%
	UV: ${day3UV}
	Rain chances are: ${day3RainChances}%
	Visibility: ${day3Visibility} km
	${day3Icon}
	`);
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
