import path from "path";
import { devices, PlaywrightTestConfig } from "@playwright/test";
const config: PlaywrightTestConfig = {
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
  use: {
    headless: !!process.env.CI,
    ignoreHTTPSErrors: true,
    baseURL: "http://localhost:3000",
    locale: "nl-NL",
    video: "retain-on-failure",
    actionTimeout: 40 * 1000,
    navigationTimeout: 40 * 1000,
  },
  timeout: 120 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  testDir: path.join(__dirname, "e2e"),
  outputDir: "test-results/",
  webServer: {
    command: "yarn start",
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
};
export default config;
