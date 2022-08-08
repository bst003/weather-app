import { pubsub } from "./pubsub";

const domFunctions = (() => {
    // Private variables/functions
    const _results = document.querySelector("#results");

    const _clearContent = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
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

        const title = document.createElement("h3");
        title.innerText = `${data.name}, ${data.country}`;
        resultBox.appendChild(title);

        _results.appendChild(resultBox);
    };

    // Pubsubs
    pubsub.subscribe("pageLoad", addFormListeners);
    pubsub.subscribe("displayData", clearResults);
    pubsub.subscribe("displayData", displayWeatherResults);

    return {};
})();

export default { domFunctions };
