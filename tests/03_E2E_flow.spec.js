const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { InventoryPage } = require("../pages/InventoryPage");
const { CartPage } = require("../pages/CartPage");
const { CheckoutStepOne } = require("../pages/CheckoutStepOne");
const { CheckoutStepTwo } = require("../pages/CheckoutStepTwo");
const LoginData = require("../test-data/LoginData.json");
const YourDetails = require("../test-data/YourDetails.json");
const ProductData = require("../test-data/Products.json");
const PageCopy = require("../test-data/PageCopy.json");

test.describe("E2E journey", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");

    const data = LoginData[0];
    await loginPage.Login(data.username, data.password);

    await expect(page).toHaveURL(/inventory/);
  });

  test("should complete order successfully", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const count = await inventoryPage.getProductCount();
    await expect(count).toBe(ProductData.products.length);
    const productToOrder = ProductData.e2eOrderProduct;
    await inventoryPage.addToCart(productToOrder);
    await expect(inventoryPage.cartBadge()).toHaveText("1");

    const cartPage = new CartPage(page);
    await cartPage.open();
    await cartPage.clickCheckout();

    const checkoutStepOne = new CheckoutStepOne(page);
    await checkoutStepOne.yourInformation(
      YourDetails.firstname,
      YourDetails.lastname,
      YourDetails.postalcode,
    );
    await checkoutStepOne.continueButton();

    const checkoutStepTwo = new CheckoutStepTwo(page);
    await expect(
      checkoutStepTwo.productNameValidate(productToOrder),
    ).toBeVisible();
    await checkoutStepTwo.finishButton();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutStepTwo.orderConfirmation()).toHaveText(
      PageCopy.orderConfirmationHeading,
    );
  });
});
