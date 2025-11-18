import { getLocation } from "./api";

let weatherData;
const searchBar = document.getElementById("search-bar");

export async function updatePage() {
    const searchTerm = searchBar.value;

    weatherData = await getLocation(searchTerm); // Returns the promise from getLocation
    searchBar.value = ""; // Resets search field

    updateCurrentConditions();
}

function updateCurrentConditions() {
    console.log(`Should be the second ${weatherData}`);
}