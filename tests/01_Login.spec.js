const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const LoginData = require("../test-data/LoginData.json");
const PageCopy = require("../test-data/PageCopy.json");

test.describe("Login Tests", () => {
  let loginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test("TC_01 - Invalid Login", async ({ page }) => {
    const data = LoginData[1];
    await loginPage.Login(data.username, data.password);

    await expect(loginPage.errorMessage()).toContainText(
      PageCopy.invalidLoginErrorFull,
    );
  });

  test("TC_02 - Success Login", async ({ page }) => {
    const data = LoginData[0];
    await loginPage.Login(data.username, data.password);

    await expect(loginPage.dashBoardValidation()).toContainText(
      PageCopy.inventoryAppLogoText,
    );
  });
});
