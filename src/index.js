import "./assets/scss/styles.scss";

import { pubsub } from "./modules/pubsub";
import { domFunctions } from "./modules/domStuff";
import { weatherFunctions } from "./modules/weather";

pubsub.publish("pageLoad");
