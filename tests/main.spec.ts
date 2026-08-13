import { expect, test } from '@playwright/test';

test('shows the login form on the home page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});

test.describe('without a token every other route is blocked', () => {
  for (const path of ['/dashboard', '/about', '/demo', '/slide']) {
    test(`redirects ${path} to the login page`, async ({ page }) => {
      await page.goto(path);

      await expect(page).toHaveURL(/\/$/);
      await expect(
        page.getByRole('heading', { name: 'Sign in' }),
      ).toBeVisible();
    });
  }
});

test('signs in, loads the profile and signs out again', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('Name').fill('ada');
  await page.getByLabel('Password').fill('secret123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Server Action 設定 cookie 後導向 dashboard
  await expect(page).toHaveURL(/\/dashboard$/);

  // react-query 透過 Route Handler 取回 profile
  await expect(page.getByText('Signed in as ada')).toBeVisible();

  // 登入後其他頁面就進得去了
  await page.goto('/demo');
  await expect(page).toHaveURL(/\/demo$/);

  await page.getByRole('button', { name: 'Sign out' }).click();

  await expect(page).toHaveURL(/\/$/);

  // 登出後又被擋下
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/$/);
});

test('sends an already signed-in visitor away from the login page', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByLabel('Name').fill('ada');
  await page.getByLabel('Password').fill('secret123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto('/');

  await expect(page).toHaveURL(/\/dashboard$/);
});

test('rejects invalid credentials with a validation message', async ({
  page,
}) => {
  await page.goto('/');

  await page.getByLabel('Name').fill('a-name-that-is-too-long');
  await page.getByLabel('Password').fill('123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('The name is too long')).toBeVisible();
  await expect(
    page.getByText('Password must be at least 6 characters'),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
});

test('translates validation messages', async ({ page, context }) => {
  await context.addCookies([
    { name: 'x-locale', value: 'de', url: 'http://localhost:3000' },
  ]);

  await page.goto('/');

  await page.getByLabel('Passwort').fill('123');
  await page.getByRole('button', { name: 'Anmelden' }).click();

  await expect(
    page.getByText('Das Passwort muss mindestens 6 Zeichen lang sein'),
  ).toBeVisible();
});

test('rejects the profile endpoint without a token', async ({ request }) => {
  const res = await request.get('/api/profile');

  expect(res.status()).toBe(401);
});

test('falls back to the default locale for an unknown cookie value', async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: 'x-locale', value: 'not-a-locale', url: 'http://localhost:3000' },
  ]);

  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});
