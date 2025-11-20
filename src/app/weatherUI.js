import { getLocation } from "./api";
import { iconMap } from "./weatherIcons";

let weatherData;
const searchBar = document.getElementById("search-bar");

export async function updatePage() {
    const searchTerm = searchBar.value;

    weatherData = await getLocation(searchTerm); // Returns the promise from getLocation
    searchBar.value = ""; // Resets search field

    updateCurrentConditions();
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
    console.log(weatherData.icon);
}

function capitalizeLocation(string) {
    // Splits string by spaces, capitalizes first character, then slices rest of string back in
    return string.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}