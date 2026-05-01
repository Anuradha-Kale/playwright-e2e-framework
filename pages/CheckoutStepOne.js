class CheckoutStepOne {
  constructor(page) {
    this.page = page;
  }

  async yourInformation(firstName, lastName, postalCode) {
    await this.page.locator("#first-name").fill(firstName);
    await this.page.locator("#last-name").fill(lastName);
    await this.page.locator("#postal-code").fill(postalCode);
  }

  async continueButton() {
    await this.page.locator("#continue").click();
  }
}
module.exports = { CheckoutStepOne };
