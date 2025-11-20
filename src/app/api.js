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

        return {
            location,
            currentTemp,
            conditions,
            icon,
        };
    } catch(err) {
        console.log(err);
    }
}