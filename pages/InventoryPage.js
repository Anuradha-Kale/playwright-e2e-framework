class InventoryPage {
  constructor(page) {
    this.page = page;
  }

  async addToCart(productName) {
    const item = this.page
      .locator(".inventory_item")
      .filter({ hasText: productName });

    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  async getProductCount() {
    return await this.page.locator(".inventory_item").count();
  }

  cartBadge() {
    return this.page.locator(".shopping_cart_badge");
  }
}

module.exports = { InventoryPage };
