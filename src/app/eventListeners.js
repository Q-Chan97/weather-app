import { searchLocation } from "./api";

export function runSearch() {
    const searchButton = document.getElementById("search-button");
    const searchBar = document.getElementById("search-bar");

    searchButton.addEventListener("click", () => {
        searchLocation(); 
        searchBar.value = ""; // Clear value in search bar
    })
}