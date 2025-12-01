import { updatePage } from "./weatherUI";

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