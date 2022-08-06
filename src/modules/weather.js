import { pubsub } from "./pubsub";

console.log(pubsub);

// https://openweathermap.org/current

// https://api.openweathermap.org/data/2.5/weather?q=hershey,pa,us&units=metric&APPID=0d4e02963a957bd2504469564359c1de
// https://api.openweathermap.org/data/2.5/weather?q=hershey,pa,us&units=imperial&APPID=0d4e02963a957bd2504469564359c1de

const weatherFunctions = (() => {
    const getData = async (location) => {
        console.log(location);

        const response = await Promise.all([
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=0d4e02963a957bd2504469564359c1de`,
                { mode: "cors" }
            ),
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&APPID=0d4e02963a957bd2504469564359c1de`,
                { mode: "cors" }
            ),
        ]);

        const weatherMetricData = await response[0].json();
        const weatherImperialData = await response[1].json();

        console.log(weatherMetricData);
        console.log(weatherImperialData);
    };

    return {
        getData,
    };
})();

export { weatherFunctions };
