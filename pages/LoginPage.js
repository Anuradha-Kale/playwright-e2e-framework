class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("#user-name");
    this.passWord = page.locator("#password");
    this.error = page.locator(".error-message-container.error");
    this.loginButton = page.locator("#login-button");
    this.ddashboardMessage = page.locator(".app_logo");
  }

  async Login(userName, passWord) {
    await this.userName.fill(userName);
    await this.passWord.fill(passWord);
    await this.loginButton.click();
  }

  errorMessage() {
    return this.error;
  }

  dashBoardValidation() {
    return this.ddashboardMessage;
  }
}

module.exports = { LoginPage };
