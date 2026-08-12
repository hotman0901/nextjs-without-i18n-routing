import { expect, test } from '@playwright/test';

test('renders the home page with the default locale', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
});

test('redirects to login when visiting a protected page without a token', async ({
  page,
}) => {
  await page.goto('/dashboard');

  await expect(page).toHaveURL(/\/login$/);
});

test('allows a protected page through when a token is present', async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: 'tokenJWT', value: 'fake-token', url: 'http://localhost:3000' },
  ]);

  await page.goto('/dashboard');

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('switches the locale through the header', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'de', exact: true }).click();

  await expect(page.getByRole('heading', { name: 'Start' })).toBeVisible();
});

test('falls back to the default locale for an unknown cookie value', async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: 'x-locale', value: 'not-a-locale', url: 'http://localhost:3000' },
  ]);

  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
});
