const path = require("path");
const PageCopy = require(path.join(__dirname, "../test-data/PageCopy.json"));

class CheckoutStepTwo {
  constructor(page) {
    this.page = page;
  }

  productNameValidate(productName) {
    return this.page.getByText(productName);
  }

  async finishButton() {
    await this.page.getByRole("button", { name: "Finish" }).click();
  }

  orderConfirmation() {
    return this.page.getByRole("heading", {
      name: PageCopy.orderConfirmationHeading,
    });
  }
}
module.exports = { CheckoutStepTwo };
