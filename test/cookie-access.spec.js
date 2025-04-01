import { test, expect } from '@playwright/test';

const testFixtures = [
  {
    name: 'subdomain',
    iframeHostname: 'sub.example.test',
  },
  {
    name: 'same-domain',
    iframeHostname: 'example.test',
  },
];

for (const fixture of testFixtures) {
  test(`Cookie set on parent domain should be accessible in ${fixture.name} iframe`, async ({ page }) => {
    // Navigate to parent page with iframe hostname
    await page.goto(`/?iframeHostname=${encodeURIComponent(fixture.iframeHostname)}`);

    // Verify cookie is set on parent page
    const parentCookie = await page.evaluate(() => document.cookie);
    expect(parentCookie, `Cookie should be present on parent page (${fixture.name} scenario)`).toContain('testCookie');

    // Wait for iframe to load
    const frame = page.frameLocator('iframe').first();

    // Verify cookie is present in HTTP requests from iframe
    const apiResponse = await frame.locator('body').evaluate(async () => {
      const response = await fetch('/api/check-cookie');
      return response.json();
    });
    expect(apiResponse.cookiePresent, `Cookie should be present in HTTP requests from iframe (${fixture.name} scenario)`).toBe(true);

    // Verify cookie is accessible via document.cookie in iframe
    const iframeCookie = await frame.locator('body').evaluate(() => document.cookie);
    expect(iframeCookie, `Cookie should be accessible via document.cookie in iframe (${fixture.name} scenario)`).toContain('testCookie');
  });
}
