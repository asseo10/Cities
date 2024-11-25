const citiesContainer = document.getElementById("cities");
const targetCityHeader = document.getElementById("target-city-header");
const closestSpan = document.getElementById("closest");
const furthestSpan = document.getElementById("furthest");
const tableContainer = document.getElementById("table");

const updateCityHeader = (cityName, error = false) => {
    targetCityHeader.textContent = error
        ? `${cityName} finns inte i databasen`
        : cityName;
};