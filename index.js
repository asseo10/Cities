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

const markCityBox = (city, type) => {
    const box = document.getElementById(`city-${city.id}`);
    if (box) {
        box.classList.add(type);
        if (type !== "target") {
            box.textContent = `${city.name} ligger ${city.distanceToTarget} mil bort`;
        }
    }
};

const clearCityInfo = () => {
    closestSpan.textContent = "";
    furthestSpan.textContent = "";
    document.querySelectorAll(".cityBox").forEach(box => {
        box.className = "cityBox"; // Rensar alla klasser
        box.textContent = box.textContent.split(" ligger")[0]; // Återställ text
    });
};

const getCityByName = name =>
    cities.find(city => city.name.toLowerCase() === name.toLowerCase()) || null;

const getClosestOrFurthestCity = (targetCity, findClosest = true) => {
    let selectedCity = null;
    let distanceComparator = findClosest ? Infinity : -Infinity;

    distances.forEach(({ city1, city2, distance }) => {
        if (city1 === targetCity.id || city2 === targetCity.id) {
            const otherCityId = city1 === targetCity.id ? city2 : city1;
            if ((findClosest && distance < distanceComparator) ||
                (!findClosest && distance > distanceComparator)) {
                selectedCity = cities.find(city => city.id === otherCityId);
                selectedCity.distanceToTarget = distance;
                distanceComparator = distance;
            }
        }
    });

    return selectedCity;
};

const handleCityInput = cityName => {
    clearCityInfo();
    const targetCity = getCityByName(cityName);

    if (targetCity) {
        updateCityHeader(`${targetCity.name} (${targetCity.country})`);
        document.title = targetCity.name;
        markCityBox(targetCity, "target");

        const closestCity = getClosestOrFurthestCity(targetCity, true);
        const furthestCity = getClosestOrFurthestCity(targetCity, false);

        if (closestCity) {
            closestSpan.textContent = closestCity.name;
            markCityBox(closestCity, "closest");
        }

        if (furthestCity) {
            furthestSpan.textContent = furthestCity.name;
            markCityBox(furthestCity, "furthest");
        }

        // Visa rubriker för närmast/längst bort
        [closestSpan, furthestSpan].forEach(el => el.style.display = "inline");
    } else {
        updateCityHeader(cityName, true);
        document.title = "Not Found";
        document.querySelectorAll("h3").forEach(h3 => h3.remove()); // Ta bort alla <h3>
    }
};

const createDistanceMatrix = () => {
    const matrix = Array(cities.length).fill().map(() => Array(cities.length).fill("&nbsp;"));
    distances.forEach(({ city1, city2, distance }) => {
        const adjustedDistance = distance / 10;
        matrix[city1][city2] = adjustedDistance;
        matrix[city2][city1] = adjustedDistance;
    });
    return matrix;
};

const renderDistanceTable = () => {
    const distanceMatrix = createDistanceMatrix();

    // Skapa tabellrubrik
    tableContainer.innerHTML = `
        <div class="head_row">
            <div class="cell header_cell"></div>
            ${cities.map(({ name }, index) => `<div class="cell">${index}-${name}</div>`).join("")}
        </div>
    `;

    
};