import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  reporter: 'html',
  trace: 'on',
  use: {
    screenshot: 'on',
    baseURL: 'http://example.test',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
