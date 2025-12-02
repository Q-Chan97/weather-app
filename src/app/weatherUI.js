import { getLocation } from "./api";
import { iconMap } from "./weatherIcons";
import { parseISO, getDay } from "date-fns";
import { isMetric } from "./tempSwitch";
import { currentSearch } from "./eventListeners";

let weatherData;
const searchBar = document.getElementById("search-bar");

export async function updatePage() {
    const searchTerm = currentSearch; // updatePage now gets the term from the event listener, imported from eventListeners file

    weatherData = await getLocation(searchTerm); // Returns the promise from getLocation
    searchBar.value = ""; // Resets search field

    updateCurrentConditions();
    updateBackground();
    updateHourlyForecast();
    updateOutlookForecast();
    updateTodaysConditions();
}

function getTempSymbol() { // Global variables weren't being re-read on switch, this lets functions get symbol when needed
    return isMetric ? "C" : "F";
}

function getWindSymbol() {
    return isMetric ? "kph" : "mph";
}

function updateCurrentConditions() {
    const location = document.getElementById("location");
    const temperature = document.getElementById("temperature");
    const conditions = document.getElementById("conditions");
    const mainImg = document.getElementById("forecast-image-main");
    
    location.textContent = capitalizeLocation(weatherData.location);
    temperature.textContent = weatherData.currentTemp + " °" + getTempSymbol();
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
        hourlyImage.classList.add("small-image");
        info.appendChild(hourlyImage);

        const hourlyTemp = document.createElement("p");
        hourlyTemp.textContent = Math.round(hour.temp) + " °" + getTempSymbol();
        info.appendChild(hourlyTemp);
    });
}

function updateOutlookForecast() {
    const outlookContainers = document.querySelectorAll(".outlook-container");

    const days = weatherData.days.slice(0, 10); // Easier to read than map

    const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    days.forEach((day, index) => {
        const outlook = outlookContainers[index];
        outlook.innerHTML = "";

        // Map weekday name to indexes
        const dateObj = parseISO(day.datetime); // Parses date in local time zone, returns a Date
        const weekDayNumber = getDay(dateObj); // Gets day of week number from parsed local time zone Date
        let weekDayName;

        if (index === 0) {
            weekDayName = "Today";
        } else {
            weekDayName = dayMap[weekDayNumber];
        }

        // Append info
        const dateOfWeek = document.createElement("p");
        dateOfWeek.textContent = sliceDate(day.datetime);
        outlook.appendChild(dateOfWeek);

        const dayOfWeek = document.createElement("p");
        dayOfWeek.textContent = weekDayName;
        outlook.appendChild(dayOfWeek);

        const outlookImg = document.createElement("img");
        outlookImg.src = iconMap[day.icon];
        outlookImg.classList.add("small-image");
        outlook.appendChild(outlookImg);

        const outlookHigh = document.createElement("p");
        outlookHigh.textContent = Math.round(day.tempmax) + "°/" + Math.round(day.tempmin) + "°";
        outlook.appendChild(outlookHigh);
    });
}

function sliceDate(data) {
    return data.slice(5, 10).replace("-", "/");
}

function updateTodaysConditions() {
    const humidityData = weatherData.humidity;
    const uvIndexData = weatherData.uvIndex;
    const feelsLikeData = weatherData.feelsLike;
    const windSpeedData = weatherData.windSpeed;

    const humidityValueEl = document.querySelector("#humidity-info .info-bold-text"); // Finds correct p element inside id'd div
    humidityValueEl.textContent = humidityData + "%"; // Updates p element with API info

    const uvIndexValueEl = document.querySelector("#uv-index-info .info-bold-text");
    uvIndexValueEl.textContent = uvIndexData;

    const feelsLikeValueEl = document.querySelector("#feels-like-info .info-bold-text");
    feelsLikeValueEl.textContent = feelsLikeData + " °" +  getTempSymbol();

    const windSpeedValueEl = document.querySelector("#wind-speed-info .info-bold-text");
    windSpeedValueEl.textContent = windSpeedData + " " + getWindSymbol();
}