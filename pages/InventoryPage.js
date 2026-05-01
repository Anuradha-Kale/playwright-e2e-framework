const { name } = require("../playwright.config");

class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  async addTocart(prodcutName) {
    const iteam = this.page
      .locator(".inventory_item")
      .filter({ hasText: prodcutName });

    await iteam.getByRole("button", { name: "Add to cart" }).click();
  }

  async prodcutCount() {
    const count = await this.page.locator(".inventory_item").count();
    console.log("Product count:", count);
    return count;
  }

  cartBagde() {
    return this.page.locator(".shopping_cart_badge");
  }
}

module.exports = { InventoryPage };
