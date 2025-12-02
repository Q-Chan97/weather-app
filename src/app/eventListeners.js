import { updatePage } from "./weatherUI";
import { isMetric, changeMetric } from "./tempSwitch";

export let currentSearch = "Tokyo"; // Default search is Tokyo on page load

export function runSearch() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-bar");

    searchButton.addEventListener("click", () => {
        const searchTerm = document.getElementById("search-bar").value.trim();
        currentSearch = searchTerm;
        updatePage();
        console.log(currentSearch);
    })

    searchInput.addEventListener("keydown", (e) => { // Runs same search if Enter key is pressed instead
        if (e.key === "Enter") {
            const searchTerm = document.getElementById("search-bar").value.trim();
            currentSearch = searchTerm;
            updatePage();
            console.log("Search ran with Enter key.");
        }
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