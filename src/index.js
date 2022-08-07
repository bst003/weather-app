import "./assets/scss/styles.scss";

import { pubsub } from "./modules/pubsub";
import { domFunctions } from "./modules/domStuff";
import { weatherFunctions } from "./modules/weather";

// console.log(pubsub);

weatherFunctions.getData("Hershey, PA, US");

// pubsub.publish("pageLoad");

console.log("hello wepback");

/*

Plan

1. Create simple form to gather location (have placeholder text for city name, state code.
    and country code).

2. Put the data from the form into a single object.

3. Use pubsub to publish that data to the weatherFunctions getData function.

4. Use a Promise.All to fetch the data in both an imperial and metric format.

5. Create a new object in getData to fomrat the location data with the location name,
    temp (in metric/imperial), and man/description

6. Push the new object to domStuff function (name tbd) to display info on page

7. Account for errors with an error message below the search form.

8. Create button to toggle between imperial and metric units.

9. Make it look pretty

*/
