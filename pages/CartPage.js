class CartPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.locator(".shopping_cart_link").click();
  }

  async removeItem() {
    await this.page.getByRole("button", { name: "Remove" }).click();
  }

  validateRemoveItem() {
    return this.page.locator(".cart_item");
  }

  async checkoutButton() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }
}

module.exports = { CartPage };
