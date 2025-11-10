export async function getLocation() { // Get London info
    try {
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=96A6976GH6KMUCQN6Y7QF8YRH`);
        let locationData = await response.json();
        console.log(locationData);
    } catch(err) {
        console.log(err);
    }
}