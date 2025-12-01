export const baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
export const API_KEY = "96A6976GH6KMUCQN6Y7QF8YRH"; // API key
export let unitGroup = "us"; // Default unit group is US Imperial
export let iconSet = "icons2"; // Return icon set 2 names

export async function getLocation(locationTerm) {
    try {
        let response = await fetch(`${baseURL}${locationTerm}?unitGroup=${unitGroup}&iconSet=${iconSet}&key=${API_KEY}`);
        let locationData = await response.json();
        console.log(locationData);

        const location = locationData.address;
        const currentTemp = Math.round(locationData.currentConditions.temp);
        const conditions = locationData.currentConditions.conditions;
        const icon = locationData.currentConditions.icon;
        const dateTime = locationData.currentConditions.datetime;
        const sunrise = locationData.currentConditions.sunrise;
        const sunset = locationData.currentConditions.sunset;
        const hours = locationData.days[0].hours;
        const days = locationData.days;
        const uvIndex = locationData.currentConditions.uvindex;
        const windSpeed = locationData.currentConditions.windspeed;
        const feelsLike = Math.round(locationData.currentConditions.feelslike);
        const humidity = Math.round(locationData.currentConditions.humidity);

        return {
            location,
            currentTemp,
            conditions,
            icon,
            dateTime,
            sunrise,
            sunset,
            hours,
            days,
            uvIndex,
            windSpeed,
            feelsLike,
            humidity
        };
    } catch(err) {
        console.log(err);
    }
}