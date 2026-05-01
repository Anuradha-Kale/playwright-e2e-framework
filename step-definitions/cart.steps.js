const { When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");

When(
  'I add product {string} to the cart from inventory',
  async function (productName) {
    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.addTocart(productName);
  },
);

When("I open the cart", async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.open();
});

When("I remove the cart item", async function () {
  const cartPage = new CartPage(this.page);
  await cartPage.removeItem();
});

Then("the cart should be empty", async function () {
  const cartPage = new CartPage(this.page);
  const rows = cartPage.validateRemoveItem();
  await expect(rows).toHaveCount(0);
});
