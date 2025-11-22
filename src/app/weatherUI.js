import { getLocation } from "./api";
import { iconMap } from "./weatherIcons";

let weatherData;
const searchBar = document.getElementById("search-bar");

export async function updatePage() {
    const searchTerm = searchBar.value;

    weatherData = await getLocation(searchTerm); // Returns the promise from getLocation
    searchBar.value = ""; // Resets search field

    updateCurrentConditions();
    updateBackground();
}

function updateCurrentConditions() {
    const location = document.getElementById("location");
    const temperature = document.getElementById("temperature");
    const conditions = document.getElementById("conditions");
    const mainImg = document.getElementById("forecast-image-main");
    
    location.textContent = capitalizeLocation(weatherData.location);
    temperature.textContent = weatherData.currentTemp;
    conditions.textContent = weatherData.conditions;
    mainImg.src = iconMap[weatherData.icon];
}

function capitalizeLocation(string) {
    // Splits string by spaces, capitalizes first character, then slices rest of string back in
    return string.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function updateBackground() {
    let time = sliceTime(weatherData.dateTime);
    let sunrise = sliceTime(weatherData.sunrise);
    let sunset = sliceTime(weatherData.sunset);

    if (time < sunrise || time > sunset) {
        document.body.style.background = "linear-gradient(rgb(25, 39, 78), rgb(35, 25, 84) 95%)";
        console.log("It's night.");
    } else {
        document.body.style.background = "linear-gradient(rgb(38, 153, 241), rgb(195, 214, 226) 70%)";
        console.log("It's day.");
    }
}

function sliceTime(data) {
    return data.slice(0, 5).replace(":", "")
}