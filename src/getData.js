async function getWeatherData() {
	// !Stop forgeting to use FETCH in order to fetch the data from the API!!!!!!!

	const response = await fetch(
		`http://api.weatherapi.com/v1/forecast.json?key=025edeae7fbf45ad949194206241504&q=timisoara&days=5&aqi=no&alerts=yes`,
		{ mode: 'cors' },
	);
	const data = await response.json();
	return data;
}

export default async function showWeatherData() {
	try {
		const data = await getWeatherData();
		// The below console logs the data in a json format that's pretty easy to read, but at the moment, I need it in an array so I can choose what I want
		// console.log(JSON.stringify(data, null, 2));
		console.log(data);
	} catch (err) {
		throw new Error(err);
	}
}
