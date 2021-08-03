import * as helpers from '../../utilities/helper';
import pageObj from '../pageObjects/createNewLogin';
import data from '../testData/details';

const createNewLogin = {
    newLogin : () => {
        helpers.click(pageObj.login);
        helpers.click(pageObj.createNewAccount);
    },

    fillForm: () => {
        helpers.setValue(pageObj.firstName, data.firstName);
        helpers.setValue(pageObj.lastName, data.lastName);
        helpers.setValue(pageObj.postcode, data.postcode);
        helpers.setValue(pageObj.email, data.email);
        helpers.setValue(pageObj.password, data.password);
        helpers.setValue(pageObj.confirmPassword, data.confirmPassword);
        helpers.setValue(pageObj.month, data.month);
        helpers.setValue(pageObj.year, data.year);
        helpers.click(pageObj.join);
        
    },

    clickOnNoThanks: () =>{
        helpers.click(pageObj.table);
        helpers.click(pageObj.tableSortAndSearch);
    }
}

export default createNewLogin;