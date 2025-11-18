import { updatePage } from "./weatherUI";

export function runSearch() {
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        updatePage();
    })
}