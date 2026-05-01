const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const LoginData = require("../test-data/LoginData.json");
const { LoginPage } = require("../pages/LoginPage");

function datasetIndex(rowNumber) {
  const index = Number(rowNumber) - 1;
  if (Number.isNaN(index) || index < 0 || index >= LoginData.length) {
    throw new Error(`LoginData row ${rowNumber} is out of range (1-${LoginData.length}).`);
  }
  return index;
}

Given("I am on the login page", async function () {
  await expect(this.page.locator("#user-name")).toBeVisible();
});

When(
  'I enter username {string} and password {string}',
  async function (username, password) {
    const loginPage = new LoginPage(this.page);
    await loginPage.userName.fill(username);
    await loginPage.passWord.fill(password);
  },
);

When("I submit the login form", async function () {
  const loginPage = new LoginPage(this.page);
  await loginPage.loginButton.click();
});

When("I login with credentials from LoginData row {int}", async function (row) {
  const data = LoginData[datasetIndex(row)];
  const loginPage = new LoginPage(this.page);
  await loginPage.Login(data.username, data.password);
});

Given("I am authenticated with LoginData row {int}", async function (row) {
  const data = LoginData[datasetIndex(row)];
  const loginPage = new LoginPage(this.page);
  await loginPage.Login(data.username, data.password);
});

Then("I should see login error containing {string}", async function (partial) {
  const loginPage = new LoginPage(this.page);
  await expect(loginPage.errorMessage()).toContainText(partial);
});

Then("I should see the inventory header {string}", async function (heading) {
  const loginPage = new LoginPage(this.page);
  await expect(loginPage.dashBoardValidation()).toContainText(heading);
});
