// Import all SVG images and make them usable with Visual Crossing's icon sets

import snow from "../assets/images/showers_snow.svg";
import snowShowersDay from "../assets/images/scattered_snow_showers_day.svg";
import snowShowersNight from "../assets/images/scattered_snow_showers_night.svg";
import thunderstorm from "../assets/images/isolated_thunderstorms.svg";
import thunderShowersDay from "../assets/images/isolated_scattered_thunderstorms_day.svg";
import thunderShowersNight from "../assets/images/isolated_scattered_thunderstorms_night.svg";
import showersDay from "../assets/images/scattered_showers_day.svg";
import showersNight from "../assets/images/scattered_showers_night.svg";
import fog from "../assets/images/haze_fog_dust_smoke.svg";
import wind from "../assets/images/windy.svg";
import cloudy from "../assets/images/cloudy.svg";
import clearDay from "../assets/images/clear_day.svg";
import clearNight from "../assets/images/clear_night.svg";
import partlyCloudyDay from "../assets/images/partly_cloudy_day.svg";
import partlyCloudyNight from "../assets/images/partly_cloudy_night.svg";
import rain from "../assets/images/showers_rain.svg";

export const iconMap = { // Maps svg icons to icon set names from Visual Crossing
    "snow": snow,
    "snow-showers-day": snowShowersDay,
    "snow-showers-night": snowShowersNight,
    "thunder-rain": thunderstorm,
    "thunder-showers-day": thunderShowersDay,
    "thunder-showers-night": thunderShowersNight,
    "rain": rain,
    "showers-day": showersDay,
    "showers-night": showersNight,
    "fog": fog,
    "wind": wind,
    "cloudy": cloudy,
    "partly-cloudy-day": partlyCloudyDay,
    "partly-cloudy-night": partlyCloudyNight,
    "clear-day": clearDay,
    "clear-night": clearNight
}