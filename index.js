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

const createCityBoxes = () => {
    citiesContainer.innerHTML = ""; 
    cities.forEach(({ id, name }) => {
        const cityBox = document.createElement("div");
        cityBox.classList.add("cityBox");
        cityBox.id = `city-${id}`;
        cityBox.textContent = name;
        citiesContainer.appendChild(cityBox);
    });
};