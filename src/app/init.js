// Initialize js

import { getLocation } from "./api";
import { runSearch } from "./eventListeners";

export function init() {
    getLocation();
    runSearch();
}