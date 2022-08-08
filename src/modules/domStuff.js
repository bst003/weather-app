import { pubsub } from "./pubsub";

console.log(pubsub);

const domFunctions = (() => {
    // Private variables/functions
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

    // Pubsubs
    pubsub.subscribe("pageLoad", addFormListeners);

    return {};
})();

export default { domFunctions };
