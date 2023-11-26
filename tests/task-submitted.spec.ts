import { test, expect } from "@playwright/test";
import data from "./test-utils/user.data"

test("Should show test submitted", async ({ page }) => {
  await page.goto(data.questionUrl);
  await expect(page.getByText('battery_horiz_000')).toBeVisible();
  await page.goto('/task?ttkn=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYwOTVhYzUzODQxMmVlYjI4ODIyNmIiLCJpc0FyY2hpdmVkIjpmYWxzZSwiaXNTdWJtaXR0ZWQiOmZhbHNlLCJpYXQiOjE3MDA4Mjg1ODh9.kAYJ21BjlsFY62ZSOAwXc6XWR7PXF7sovzdd20j2wZI');
  await expect(page.getByText('This task have been submitted!')).toBeVisible();
 
});
