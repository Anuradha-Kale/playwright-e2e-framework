const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  Status,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { chromium } = require("playwright");

const PW = require("../playwright.config.js");
const BASE_URL = PW.use?.baseURL ?? "https://www.saucedemo.com";

const hookTimeoutMs = PW.timeout ?? 300_000;
setDefaultTimeout(hookTimeoutMs);

let browser;

BeforeAll(async function () {
  const headless = PW.use?.headless !== undefined ? PW.use.headless : true;
  browser = await chromium.launch({ headless });
});

AfterAll(async function () {
  await browser?.close();
});

Before(async function ({ pickle }) {
  const sep = "─".repeat(60);
  console.log(`\n${sep}\n▶ Running scenario: ${pickle.name}\n▶ File: ${pickle.uri}\n${sep}\n`);

  this.context = await browser.newContext({
    baseURL: BASE_URL,
    ignoreHTTPSErrors: PW.use?.ignoreHTTPSErrors,
    ...(PW.use?.contextOptions ?? {}),
  });
  this.page = await this.context.newPage();
  await this.page.goto("/", { timeout: hookTimeoutMs });
});

After(async function ({ result }) {
  const failed = result?.status === Status.FAILED;
  try {
    if (failed && this.page && PW.use?.screenshot) {
      const buf = await this.page.screenshot({ fullPage: true });
      if (this.attach && buf) await this.attach(buf, "image/png");
    }
  } catch {
    // ignore attachment errors
  } finally {
    await this.context?.close();
    this.context = undefined;
    this.page = undefined;
  }
});
