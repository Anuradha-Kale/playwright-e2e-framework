const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutStepOne } = require("../pages/CheckoutStepOne");
const { CheckoutStepTwo } = require("../pages/CheckoutStepTwo");
const LoginData = require("../test-data/LoginData.json");
const YourDetails = require("../test-data/YourDetails.json");

test.describe("E2E journey", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");

    const data = LoginData[0];
    await loginPage.Login(data.username, data.password);
  });

  test("Order Purchase", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.prodcutCount();
    await inventoryPage.addTocart("Sauce Labs Fleece Jacket");
    await expect(inventoryPage.cartBagde()).toBeVisible();

    const cartPage = new CartPage(page);
    await cartPage.open();
    await cartPage.checkoutButton();

    const checkoutStepOne = new CheckoutStepOne(page);
    await checkoutStepOne.yourInformation(
      YourDetails.firstname,
      YourDetails.lastname,
      YourDetails.postalcode,
    );
    await checkoutStepOne.continueButton();

    const checkoutStepTwo = new CheckoutStepTwo(page);
    await expect(checkoutStepTwo.productNameValidate()).toBeVisible();
    await checkoutStepTwo.finishButton();
    await expect(page).toHaveURL(/checkout-complete/);
    const successText = await checkoutStepTwo.orderConfirmation();
    const text = await successText.textContent();
    console.log("Order confirmation: ", text);
  });
});
