import { getLocation } from "./api";
import { iconMap } from "./weatherIcons";

let weatherData;
let tempSymbol = "F";
const searchBar = document.getElementById("search-bar");

export async function updatePage() {
    const searchTerm = searchBar.value;

    weatherData = await getLocation(searchTerm); // Returns the promise from getLocation
    searchBar.value = ""; // Resets search field

    updateCurrentConditions();
    updateBackground();
    updateHourlyForecast();
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

function updateHourlyForecast() {
    let hourInfo = document.querySelectorAll(".hourly-info");

    let hourly = [6, 9, 12, 15, 18, 21].map(i => weatherData.hours[i]); // Maps out indexes from array of all hours

    hourly.forEach((hour, index) => {
        const info = hourInfo[index]; // Gets each individual div

        info.innerHTML = ""; // Clears info divs of content

        // Appends info divs with new weather info from API request
        const hourlyImage = document.createElement("img");
        hourlyImage.src = iconMap[hour.icon]; 
        hourlyImage.alt = "Hourly forecast image";
        hourlyImage.classList.add("hourly-image");
        info.appendChild(hourlyImage);

        const hourlyTemp = document.createElement("p");
        hourlyTemp.textContent = Math.round(hour.temp) + " °" + tempSymbol;
        info.appendChild(hourlyTemp);
    });
}