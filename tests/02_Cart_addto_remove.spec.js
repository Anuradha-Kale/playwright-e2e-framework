const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const LoginData = require("../test-data/LoginData.json");
const ProductData = require("../test-data/Products.json");

test.describe("cart Validations", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test("Add & remove item", async ({ page }) => {
    const data = LoginData[0];
    await loginPage.Login(data.username, data.password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart(ProductData.cartFlowProduct);

    const cartPage = new CartPage(page);
    await cartPage.open();
    await cartPage.removeItem();
    const cartRow = cartPage.validateRemoveItem();
    await expect(cartRow).toHaveCount(0);
  });
});
