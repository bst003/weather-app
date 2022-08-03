import { pubsub } from "./pubsub";

console.log(pubsub);

const domFunctions = (() => {
    const addTextToPage = () => {
        console.log("is this showing");

        const test = document.querySelector("#test");

        test.innerText = "This is a test";
    };

    pubsub.subscribe("pageLoad", addTextToPage);

    return {};
})();

export default { domFunctions };
