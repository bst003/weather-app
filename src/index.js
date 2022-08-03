import "./assets/scss/styles.scss";

import { pubsub } from "./modules/pubsub";
import domFunctions from "./modules/domStuff";

// console.log(pubsub);

pubsub.publish("pageLoad");

console.log("hello wepback");
