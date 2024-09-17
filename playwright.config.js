const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './__tests__/playwright/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'line',
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
      use: { ...devices['Desktop Firefox'] },
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
    command: 'webpack serve --config tools/webpack/config/build --port 8082 --hot --no-open',
    url: 'http://127.0.0.1:8082',
    reuseExistingServer: !process.env.CI,
  },
});


