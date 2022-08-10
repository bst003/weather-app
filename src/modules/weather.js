import { pubsub } from "./pubsub";

// https://openweathermap.org/current

// https://api.openweathermap.org/data/2.5/weather?q=hershey,pa,us&units=metric&APPID=0d4e02963a957bd2504469564359c1de
// https://api.openweathermap.org/data/2.5/weather?q=hershey,pa,us&units=imperial&APPID=0d4e02963a957bd2504469564359c1de

const weatherFunctions = (() => {
    // Private variables/functions
    const _formatData = (metricData, imperialData) => {
        const formattedData = {
            name: metricData.name,
            country: metricData.sys.country,
            main: metricData.weather[0].main,
            description: metricData.weather[0].description,
            metricData: {
                temp: metricData.main.temp,
                tempMax: metricData.main.temp_max,
                tempMin: metricData.main.temp_min,
            },
            imperialData: {
                temp: imperialData.main.temp,
                tempMax: imperialData.main.temp_max,
                tempMin: imperialData.main.temp_min,
            },
        };

        return formattedData;
    };

    // Public variables/functions

    const getData = async (location) => {
        console.log(location);

        try {
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

            const formattedData = _formatData(
                weatherMetricData,
                weatherImperialData
            );

            pubsub.publish("displayData", formattedData);
        } catch (err) {
            console.log("this is an error");
            console.log(err);
            pubsub.publish("displayError");
        }
    };

    // Pubsubs
    pubsub.subscribe("submitForm", getData);

    return {
        getData,
    };
})();

export { weatherFunctions };
