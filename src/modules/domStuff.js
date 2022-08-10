import { pubsub } from "./pubsub";

const domFunctions = (() => {
    // Private variables/functions
    const _results = document.querySelector("#results");

    const _clearContent = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    };

    const _addAttributesLoop = (element, object, dataPrefix) => {
        let prefix = "";
        if (dataPrefix) {
            prefix += `${dataPrefix}-`;
        }

        Object.entries(object).forEach(([key, value]) => {
            element.setAttribute(`data-${prefix}${key}`, value);
        });
    };

    const _toggleUnits = (e) => {
        console.log(e);

        const button = e.target;

        const resultBox = e.target.parentElement;
        const currentUnit = resultBox.getAttribute("data-current-unit");

        button.innerText = `Show ${currentUnit}`;

        const standardTemp = resultBox.querySelector(".temp-contain p");
        const maxTemp = resultBox.querySelector(".max span");
        const minTemp = resultBox.querySelector(".min span");

        if (currentUnit === "imperial") {
            resultBox.setAttribute("data-current-unit", "metric");

            standardTemp.innerText = resultBox.getAttribute("data-met-temp");
            maxTemp.innerText = resultBox.getAttribute("data-met-tempmax");
            minTemp.innerText = resultBox.getAttribute("data-met-tempmin");
        }

        if (currentUnit === "metric") {
            resultBox.setAttribute("data-current-unit", "imperial");

            standardTemp.innerText = resultBox.getAttribute("data-imp-temp");
            maxTemp.innerText = resultBox.getAttribute("data-imp-tempmax");
            minTemp.innerText = resultBox.getAttribute("data-imp-tempmin");
        }

        console.log(resultBox);
    };

    const _processWeatherForm = (e) => {
        e.preventDefault();

        const location = document.querySelector("#location").value;

        console.log("form submitted");

        pubsub.publish("submitForm", location);
    };

    // Public variables/functions
    const addFormListeners = () => {
        const form = document.querySelector("form");

        form.addEventListener("submit", _processWeatherForm);
    };

    const clearResults = () => {
        _clearContent(_results);
    };

    const displayWeatherResults = (data) => {
        console.log(data);

        const resultBox = document.createElement("div");
        resultBox.classList.add("result-box");
        resultBox.setAttribute("data-current-unit", "imperial");
        _addAttributesLoop(resultBox, data.metricData, "met");
        _addAttributesLoop(resultBox, data.imperialData, "imp");

        const title = document.createElement("h3");
        title.innerText = `${data.name}, ${data.country}`;
        resultBox.appendChild(title);

        const description = document.createElement("p");
        description.classList.add("desc");
        description.innerText = `${data.main}, ${data.description}`;
        resultBox.appendChild(description);

        const weatherData = document.createElement("div");
        weatherData.classList.add("data");

        const tempContain = document.createElement("div");
        tempContain.classList.add("temp-contain");

        const tempContainInfo = document.createElement("p");
        tempContainInfo.innerText = `${data.imperialData.temp}`;
        tempContain.appendChild(tempContainInfo);

        const minMax = document.createElement("div");
        minMax.classList.add("min-max");

        const max = document.createElement("p");
        max.classList.add("max");
        max.innerText = "max: ";

        const maxSpan = document.createElement("span");
        maxSpan.innerText = `${data.imperialData.tempMax}`;
        max.appendChild(maxSpan);

        const min = document.createElement("p");
        min.classList.add("min");
        min.innerText = "min: ";

        const minSpan = document.createElement("span");
        minSpan.innerText = `${data.imperialData.tempMin}`;
        min.appendChild(minSpan);

        minMax.appendChild(max);
        minMax.appendChild(min);

        weatherData.appendChild(tempContain);
        weatherData.appendChild(minMax);

        resultBox.appendChild(weatherData);

        const toggleButton = document.createElement("button");
        toggleButton.classList.add("toggle");
        toggleButton.innerText = "Show metric";
        toggleButton.addEventListener("click", _toggleUnits);

        resultBox.appendChild(toggleButton);

        _results.appendChild(resultBox);
    };

    // Pubsubs
    pubsub.subscribe("pageLoad", addFormListeners);
    pubsub.subscribe("displayData", clearResults);
    pubsub.subscribe("displayData", displayWeatherResults);

    return {};
})();

export default { domFunctions };
