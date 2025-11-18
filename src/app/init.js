// Initialize js

import { getLocation } from "./api";
import { runSearch } from "./eventListeners";
import { updatePage } from "./weatherUI";

export function init() {
    getLocation();
    runSearch();
    updatePage();
}