import { updatePage } from "./weatherUI";
import { isMetric, changeMetric } from "./tempSwitch";

export let currentSearch;

export function runSearch() {
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        const searchTerm = document.getElementById("search-bar").value.trim();
        currentSearch = searchTerm;
        updatePage();
        console.log(currentSearch);
    })
}

export function switchUnit() {
    const switchButton = document.getElementById("temp-switch-button");

    switchButton.addEventListener("click", () => {
        changeMetric(!isMetric);
        switchButton.textContent = isMetric ? "°C" : "°F";
        console.log(isMetric);
        updatePage();
    })
}