/* eslint-disable no-shadow */
import assert from 'assert';

export const checkIfElementExists = (element, timeout = 6000) => {
  try {
    $(element).waitForExist({timeout});
    $(element).waitForDisplayed({timeout});
  } catch (error) {
    throw new Error(`Element with selector ${element} doesn't present on the page`).stack;
  }
};

export const launchURL = (url) => {
  browser.url(url);
};

export const findElements = element => $$(element);

export const clear = (element) => {
  browser.execute((s) => {
    document.querySelector(s).value = '';
  }, element);
};

export const getElementByText = text => findElements(`//*[contains(text(), '${text}')]`);
/**
 *
 * @param {string} xpath  //<elementName>[@<attributeName>="<attributeKey>"]
 * @param {string} text
 *
 * //tr[@id="id"]
 */
export const getElementInsideXpathByText = (xpath, text) => findElements(`${xpath}//*[contains(text(), '${text}')]`);

export const click = (element) => {
  checkIfElementExists(element);
  if (typeof element === 'object') {
    element.click();
  } else {
    getElement(element).click();
  }
};

export const getText = (element) => {
  checkIfElementExists(element);
  const text = getElement(element).getText();
  return text;
};

export const doubleClick = (element) => {
  checkIfElementExists(element);
  $(element).doubleClick();
};

export const scrollToElement = (element) => {
  $(element).scrollIntoView();
};

export const closeAllButFirstTab = () => {
  const windowHandles = browser.windowHandles().value;
  windowHandles.forEach((handle, index) => {
    if (index > 0) {
      browser.switchTab(handle).close();
    }
  });
};

export const closeLastOpenedWindow = () => {
  const lastWindowHandle = browser.getWindowHandles().value.slice(-1)[0];
  browser.window(lastWindowHandle);
  browser.close();
};

export const deleteCookie = (name) => {
  browser.deleteCookie(name);
};

export const dragAndDrop = (source, destination) => {
  browser.dragAndDrop(source, destination);
};

export const focusLastOpenedWindow = () => {
  const lastWindowHandle = browser.windowHandles().value.slice(-1)[0];
  browser.window(lastWindowHandle);
};

export const acceptAlert = () => {
  browser.acceptAlert();
};

export const moveToElement = (element, x = undefined, y = undefined) => {
  browser.moveToObject(element, x, y);
};

export const pause = (ms) => {
  const wait = parseInt(ms, 10);
  browser.pause(wait);
};

export const pressButton = (key) => {
  browser.keys(key);
};

export const screenResize = (screenWidth, screenHeight) => {
  browser.windowHandleSize({
    width: parseInt(screenWidth, 10),
    height: parseInt(screenHeight, 10),
  });
};

export const scroll = (element) => {
  browser.scroll(element);
};

export const setCookies = (name, value) => {
  browser.setCookies({
    name,
    value,
  });
};

export const selectByIndex = (element, index) => {
  checkIfElementExists(element);

  const optionIndex = parseInt(index, 10);
  $(element).selectByIndex(optionIndex);
};

export const selectByAttribute = (element, attribute, value) => {
  checkIfElementExists(element);
  $(element).selectByAttribute(attribute, value);
};

export const getValue = (element) => {
  checkIfElementExists(element);
  const value = $(element).getValue(element);
  return value;
};

export const selectByVisibleText = (element, text) => {
  checkIfElementExists(element);
  $(element).selectByVisibleText(text);
};

export const addValue = (element, value) => {
  checkIfElementExists(element);
  //browser.addValue(element, value);
  $element.addValue(value);
};

export const setValue = (element, value) => {
  checkIfElementExists(element);
  if (browser.capabilities.platformName === 'mac os x') {
    $(element).clearValue();
  }
  clear(element);
  $(element).setValue(value);
  // $(element).clearValue(); - does not work on windows
};

export const setPromptText = (text) => {
  try {
    browser.alertText(text);
  } catch (e) {
    assert(e, 'A prompt was not open');
  }
};

/**
 * @function assertTextEqual
 * Accepts the webelement and an expected value as String
 * Get the text from webelement and validates it against the expected
 * @param {WebElement} element
 * @param {String} expectedText
 */
export const assertTextEqual = (element, expectedText) => {
  if (element && Array.isArray(element)) {
    const actualText = element[0].getText();
    assert.equal(actualText, expectedText, new Error(`Expected: ${expectedText} and actual: ${actualText}`).stack);
  } else {
    const actualText = getText(element);
    assert.equal(actualText, expectedText, new Error(`Expected: ${expectedText} and actual: ${actualText}`).stack);
  }
};

export const assertTextValue = (element, expectedText) => {
    const actualText = $(element).getValue();
    assert.equal(actualText, expectedText, new Error(`Expected: ${expectedText} and actual: ${actualText}`).stack);
};

/**
 * @function validateSelectorOptionValues
 * Takes the parent element and expected list of option
 * Iterate through all the options in the parent element
 * And validates it against the expected values array
 * @param {WebElement} parentElement
 * @param {Array} expectedValuesArr
 */
export const validateSelectorOptionsValues = (parentElement, expectedValuesArr) => {
  const elements = findElements(parentElement);
  elements.forEach((e, i) => {
    assert.equal(e.getText(), expectedValuesArr[i], new Error(`Assertion Error, Expected: ${expectedValuesArr[i]} Actual: ${e.getText()}`).stack);
  });
};

export const checkIfElementIsNotDisplayed = (element) => {
  assert($(element).isDisplayed() === false, new Error(`Element ${element} was displayed, when it was NOT expected`).stack);
};

export const getAttributeValue = (element, attributeName) => {
  checkIfElementExists(element);
  return $(element).getAttribute(attributeName);
};

export const validateAttributeValue = (element, attributeName, ExpectedAttributeValue) => {
  const actualAttributeValue = getAttributeValue(element, attributeName);
  assert.equal(
    ExpectedAttributeValue,
    actualAttributeValue,
    new Error(`Assertion Failed. Expected: ${ExpectedAttributeValue} Actual: ${actualAttributeValue}`).stack,
  );
};

export const validatePageRoute = (element, route) => {
  checkIfElementExists(element);
  const currentUrl = browser.getUrl();
  const mainUrl = currentUrl.split('journey/')[0];
  const expected = `${mainUrl}${route}`;
  const actual = $(element).getAttribute('href');
  assert.equal(expected, actual, new Error(`Assertion Failed. Expected: ${expected} Actual: ${actual}`).stack);
};

export const validateHrefAttribute = (element, expected) => {
  checkIfElementExists(element);
  const actual = getAttributeValue(element, 'href');
  assert.equal(expected, actual, new Error(`Assertion Failed. Expected href: ${expected} Actual href: ${actual}`).stack);
};

export const setSummaryMap = (key, label, value) => {
  summaryConfigMap.set(key, { label, value });
};

export const getSummaryMap = key => summaryConfigMap.get(key);

export const validateSummaryComponent = (element, summaryArray) => {
  checkIfElementExists(element);
  const activeSummary = summaryArray.map(d => getSummaryMap(d)).filter(dd => dd);
  activeSummary.forEach((comp, i) => {
    assertTextEqual(`${element} > span:nth-of-type(${i + 1})`, comp.label);
    assertTextEqual(`${element} > p:nth-of-type(${i + 1})`, comp.value);
  });
};

export const getElement = (selector, timeout = 12000) => {
  try {
    const elem = $(selector)
    elem.waitForExist({timeout});
    return elem;
    } catch (error) {
    throw new Error(`Element with selector ${selector} is not appearing after ${timeout} milliseconds`).stack;
  }
};

export const waitForExist = (selector, timeout = 6000) => {
  try {
    $(selector).waitForExist(timeout, true);
  } catch (error) {
    throw new Error(`Element with selector ${selector} is not appearing after ${timeout} milliseconds`).stack;
  }
};

export const validateEqual = (expected, actual) => {
  assert.equal(expected, actual, new Error(`Assertion Failed. Expected: ${expected} Actual: ${actual}`).stack);
};
export const validateMatch = (actual, expected) => {
  assert.equal(new RegExp(expected).test(actual), true, new Error(`Assertion Failed. Regex Expected: ${expected} Actual: ${actual}`).stack);
};

export const validateDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return today = mm + "/" + dd + "/" + yyyy;
};

export const getDay = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  return dd
};

export const getMonth = () => {
  let today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  return mm;
};

export const getCurrentMonth = () => {
  let today = new Date();
  const mm = today.getMonth()+1; //January is 0!
  return mm;
};
export const getYear = () => {
  let today = new Date();
  const yyyy = today.getFullYear();
  return yyyy;
};

export const verifyYearOptions = (element) => {
  const elements= findElements(element).map(option => option.getText());
  var year= getYear();
  for(var i = 1 ; i < elements.length;i++){
    assert.equal(elements[i],year);
    year--;
  }
};

export const validateOptionsValues = (parentElement, expectedValuesArr) => {
  const elements = findElements(parentElement).map(option => option.getText());
  for(var i = 1 ; i < elements.lencgth;i++) {
     assert.equal(elements[i], expectedValuesArr[i-1], new Error(`Assertion Error, Expected: ${expectedValuesArr[i-1]} Actual: ${elements[i]}`).stack);
  }
};

export const validateValues = (actualElementsArr, expectedValuesArr) => {
  for(let i = 0 ; i < actualElementsArr.length;i++) {
     assert.equal(actualElementsArr[i], expectedValuesArr[i], new Error(`Assertion Error, Expected: ${expectedValuesArr[i]} Actual: ${actualElementsArr[i]}`).stack);
  }
};

export const validateNumOfElements = (actualElements, expectedNumOfElements) => {
  const elements = findElements(actualElements).map(option => option.length);
  assert.equal((elements.length)-1, expectedNumOfElements, new Error(`Assertion Error, Expected: ${expectedNumOfElements} Actual: ${elements.length}`).stack);
};

export const switchToFrame = (value)=> {
  browser.switchToFrame(value);
};

 