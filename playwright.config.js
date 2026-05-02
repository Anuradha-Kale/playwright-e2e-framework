// @ts-check
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 300 * 1000,
  expect: {
    timeout: 100 * 1000,
  },
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "on-failure" }],
    ["list"],
  ],

  use: {
    baseURL: "https://www.saucedemo.com",
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    // Jab tak login state save karke auth.json na banao, ye line mat rakho:
    // storageState: './auth.json',
    contextOptions: {
      serviceWorkers: "block",
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
