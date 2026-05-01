const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutStepOne } = require("../pages/CheckoutStepOne");
const { CheckoutStepTwo } = require("../pages/CheckoutStepTwo");
const YourDetails = require("../test-data/YourDetails.json");

When("I count inventory items", async function () {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.prodcutCount();
});

Then("the cart badge should be visible", async function () {
  const inventoryPage = new InventoryPage(this.page);
  await expect(inventoryPage.cartBagde()).toBeVisible();
});

When("I start checkout from the cart page", async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.checkoutButton();
});

When(
  "I fill checkout step one information from stored customer details",
  async function () {
    const checkoutStepOne = new CheckoutStepOne(this.page);
    await checkoutStepOne.yourInformation(
      YourDetails.firstname,
      YourDetails.lastname,
      YourDetails.postalcode,
    );
  },
);

When("I submit checkout step one continue", async function () {
  const checkoutStepOne = new CheckoutStepOne(this.page);
  await checkoutStepOne.continueButton();
});

Then(
  'checkout step two should show product {string}',
  async function (productName) {
    const checkoutStepTwo = new CheckoutStepTwo(this.page);
    await expect(checkoutStepTwo.productNameValidate()).toBeVisible();
    await expect(
      checkoutStepTwo.productNameValidate(),
    ).toContainText(productName);
  },
);

When("I complete the order on checkout step two", async function () {
  const checkoutStepTwo = new CheckoutStepTwo(this.page);
  await checkoutStepTwo.finishButton();
});

Then("URL should contain {string}", async function (fragment) {
  await expect(this.page).toHaveURL(new RegExp(fragment));
});

Then("order confirmation heading should contain {string}", async function (text) {
  const checkoutStepTwo = new CheckoutStepTwo(this.page);
  await expect(checkoutStepTwo.orderConfirmation()).toContainText(text);
});
