class CheckoutStepTwo {
  constructor(page) {
    this.page = page;
  }

  productNameValidate() {
    return this.page.getByText("Sauce Labs Fleece Jacket");
  }

  async finishButton() {
    await this.page.getByRole("button", { name: "Finish" }).click();
  }

  orderConfirmation() {
    return this.page.getByRole("heading", {
      name: "Thank you for your order!",
    });
  }
}
module.exports = { CheckoutStepTwo };
