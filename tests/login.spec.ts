import { test, expect } from "@playwright/test";
import data from "./test-utils/user.data";


test("Should login the user", async ({ page }) => {
  await page.goto('/login');
  await expect(page.getByRole("heading", { name: "Login" })).toBeInViewport();
  await expect(page.getByRole('heading', { name: 'Bison.io' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Account' })).toBeVisible();
  await expect(page.locator('#root')).toContainText('Login');
  await expect(page.locator('div').filter({ hasText: /^EmailPasswordvisibilityLog in$/ })).toBeVisible();
  await page.getByPlaceholder("john.smith@gmail.com").click();
  await page.getByPlaceholder("john.smith@gmail.com").fill(data.email);
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill(data.password);
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.getByRole("button", { name: "Log in" })).toBeEnabled()
});
