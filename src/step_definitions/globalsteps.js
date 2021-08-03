import {Given, When, Then} from "cucumber";
import * as helpers from "../../utilities/helper";
import config from "../../config/default.json";

Given("I open the url {string}", (url) => {
    let TestUrl = config.TestUrl
    console.log(TestUrl);
    helpers.launchURL(TestUrl);
    browser.pause(50000);
})