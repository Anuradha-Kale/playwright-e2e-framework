const { setWorldConstructor } = require("@cucumber/cucumber");

class SauceDemoWorld {}

setWorldConstructor(SauceDemoWorld);
