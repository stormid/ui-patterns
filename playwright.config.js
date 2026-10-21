const fs = require('fs');
const os = require('os');
const path = require('path');
const { defineConfig, devices } = require('@playwright/test');

// macOS 27 TCC-protects ~/Library/Application Support/Firefox, which Playwright's bundled Firefox also
// resolves as its app-data dir, so on any Mac where real Firefox has ever run, every launch fails
// (microsoft/playwright#42768). CFFIXED_USER_HOME points CoreFoundation's home at a folder of our own
// instead. It must already exist, as CoreFoundation silently ignores a CFFIXED_USER_HOME that doesn't.
// `env` replaces the browser's environment rather than merging into it, hence the spread.
// Matches stormid/components tools/playwright/config.base.js.
const firefoxLaunchOptions = () => {
  if (process.platform !== 'darwin') return {};
  const home = path.join(os.tmpdir(), 'playwright-firefox-home');
  fs.mkdirSync(home, { recursive: true });
  return { env: { ...process.env, CFFIXED_USER_HOME: home } };
};

module.exports = defineConfig({
  testDir: './__tests__/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'line',
  use: {
    baseURL: 'http://127.0.0.1:8082',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      grep: /@desktop|@all|@reduced/,
    },
  
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], launchOptions: firefoxLaunchOptions() },
      grep: /@desktop|@all/,
    },
  
    {
      name: 'webkit',
      userAgent: 'Safari',
      use: { ...devices['Desktop Safari'] },
      grep: /@desktop|@all/,
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      grep: /@mobile|@all/,
    },
    {
      name: 'Mobile Safari',
      userAgent: 'Safari',
      use: { ...devices['iPhone 13'] },
      grep: /@mobile|@all/,
    },
  ],
  webServer: {
    command: 'rspack serve --config tools/rspack/config/dev/index.js --port 8082 --no-open',
    url: 'http://127.0.0.1:8082',
    reuseExistingServer: !process.env.CI,
  },
});


