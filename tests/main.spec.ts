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

test('signs in, loads the profile and signs out again', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Name').fill('ada');
  await page.getByLabel('Password').fill('secret123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Server Action 設定 cookie 後導向受保護頁面
  await expect(page).toHaveURL(/\/dashboard$/);

  // react-query 透過 Route Handler 取回 profile
  await expect(page.getByText('Signed in as ada')).toBeVisible();

  await page.getByRole('button', { name: 'Sign out' }).click();

  await expect(page).toHaveURL(/\/login$/);

  // 登出後受保護頁面應該再次擋下
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login$/);
});

test('rejects invalid credentials with a validation message', async ({
  page,
}) => {
  await page.goto('/login');

  await page.getByLabel('Name').fill('a-name-that-is-too-long');
  await page.getByLabel('Password').fill('123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('The name is too long')).toBeVisible();
  await expect(
    page.getByText('Password must be at least 6 characters')
  ).toBeVisible();
  await expect(page).toHaveURL(/\/login$/);
});

test('translates validation messages', async ({ page, context }) => {
  await context.addCookies([
    { name: 'x-locale', value: 'de', url: 'http://localhost:3000' },
  ]);

  await page.goto('/login');

  await page.getByLabel('Passwort').fill('123');
  await page.getByRole('button', { name: 'Anmelden' }).click();

  await expect(
    page.getByText('Das Passwort muss mindestens 6 Zeichen lang sein')
  ).toBeVisible();
});

test('rejects the profile endpoint without a token', async ({ request }) => {
  const res = await request.get('/api/profile');

  expect(res.status()).toBe(401);
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
