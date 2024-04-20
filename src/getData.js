async function getWeatherData() {
	// !Stop forgeting to use FETCH in order to fetch the data from the API!!!!!!!

	const response = await fetch(
		`http://api.weatherapi.com/v1/forecast.json?key=025edeae7fbf45ad949194206241504&q=timisoara&days=4&aqi=no&alerts=yes`,
		{ mode: 'cors' },
	);
	const data = await response.json();
	return data;
}

function extractData(data) {
	const { name: city, country } = data.location;
	const {
		temp_c: tempC,
		feelslike_c: feelsLike,
		humidity,
		uv,
		wind_dir,
		wind_kph,
		// Now, condition will hold the value of data.current.condition.text, so this way we are using nested destructuring and we avoind making another variable that will make the code even longer
		condition: { text: condition },
	} = data.current;
	const {
		date: day1Date,
		astro: { day1Sunrise, day1Sunset },
		day: {
			mintemp_c: day1MinTempC,
			maxtemp_c: day1MaxTempC,
			condition: { text: day1Condition },
		},
	} = data.forecast.forecastday[1];

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
	`);
	console.log(`Forecast:
	${day1Date}
	Sunrise: ${day1Sunrise}
	Sunset: ${day1Sunset}
	Min Temp: ${day1MinTempC}
	Max Temp: ${day1MaxTempC}
	Condition: ${day1Condition}
	`);
	console.log(`Forecast:
	${day2Date}
	`);
	console.log(`Forecast:
	${day3Date}
	`);
}

export default async function showWeatherData() {
	try {
		const data = await getWeatherData();
		// The below console logs the data in a json format that's pretty easy to read, but at the moment, I need it in an array so I can choose what I want
		// console.log(JSON.stringify(data, null, 2));
		console.log(data);
		extractData(data);
	} catch (err) {
		throw new Error(err);
	}
}
