import {Given, When, Then} from "cucumber";
import createNewLogin from '../pages/createNewLogin'

When('I click on the login link and create a new account', () =>{
    createNewLogin.newLogin();
});

Then ('I have to fill the form', () =>{
    createNewLogin.fillForm();
})

Then ('I clicked on the popup', () =>{
    createNewLogin.clickOnNoThanks();
})

