export const baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
export const API_KEY = "96A6976GH6KMUCQN6Y7QF8YRH"; // API key
let unitGroup = "us"; // Default unit group is US Imperial

export async function getLocation(locationTerm) { // Get Ueda info
    try {
        let response = await fetch(`${baseURL}Ueda?unitGroup=${unitGroup}&key=${API_KEY}`);
        let locationData = await response.json();
        console.log(locationData);
    } catch(err) {
        console.log(err);
    }
}