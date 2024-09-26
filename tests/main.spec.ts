// import {test as it} from '@playwright/test';

// it('uses the provided locale', async ({page}) => {
//   await page.goto('http://localhost:3000/')
// });

import { expect,test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
