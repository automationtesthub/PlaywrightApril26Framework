import { test, expect } from '@playwright/test';

test('Global synch', async ({ page }) => {

    test.setTimeout(120000); 
    test.slow();//90000
    let locator = page.locator('//text=Welcome, admin');
    await page.goto('http://localhost:100');
    await page.click('text=Login');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'admin');
    page.waitForTimeout(2000);
    await page.click('text=Submit');
    await expect(page.locator('text=Welcome, admin')).toBeVisible();   
    await expect(locator).toBeVisible({ timeout: 1000 });

    await expect(locator).toBeVisible();//hard assert
     });


test.only('Hard vs Soft Assert', async ({ page }) => {
  await page.goto('/');
  await page.locator("//input[@name='user_name']").fill("admin");
  await page.locator("//input[@name='user_password']").fill("admin");
  await page.locator("//input[@name='Login']").click();
  
  await expect.soft(page.locator("//a[text()='Logout123']")).toBeVisible();
  await expect.soft(page.locator("//a[text()='Home']").nth(0)).toBeVisible();
  await expect.soft(page.locator("//a[text()='Leads']").nth(0)).toBeVisible();

  
});