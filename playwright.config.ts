import type { PlaywrightTestConfig } from "@playwright/test";

import path from "node:path";

import { devices } from "@playwright/test";

const TWENTY_SECONDS = 20000;

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: "on-first-retry",
    baseURL: "http://localhost:3000",
    actionTimeout: TWENTY_SECONDS,
    navigationTimeout: TWENTY_SECONDS,
  },
  timeout: TWENTY_SECONDS,
  expect: {
    timeout: TWENTY_SECONDS,
  },
  testDir: path.join(process.cwd(), "e2e"),
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "yarn start",
    port: 3000,
    reuseExistingServer: true,
  },
  outputDir: "test-results/",
};

export default config;
