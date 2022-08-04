import { pubsub } from "./pubsub";

console.log(pubsub);

// https://openweathermap.org/current

// https://api.openweathermap.org/data/2.5/weather?q=hershey,pa,us&units=metric&APPID=0d4e02963a957bd2504469564359c1de
// https://api.openweathermap.org/data/2.5/weather?q=hershey,pa,us&units=imperial&APPID=0d4e02963a957bd2504469564359c1de

const weatherFunctions = (() => {
    const getData = (location) => {
        console.log(location);
    };

    return {
        getData,
    };
})();

export { weatherFunctions };
