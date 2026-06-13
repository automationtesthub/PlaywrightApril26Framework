import { test, expect } from '@playwright/test';
//import { getTestData } from '../utilities/jsonReader';
//import { getCSVTestData } from '../utilities/csvReader';
import { loadExcel, getExcelDataByTC } from '../utilities/excelReader';


import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { LeadPage } from '../pages/leadPage';


let loginpage: LoginPage;
let homepage: HomePage;
let leadpage: LeadPage;

test.beforeAll(async () => {
  loadExcel('testdata/data.xlsx', 'data');
});

test('verify_Title_TC01', async ({ page }) => {
  //const data = await getCSVTestData('testdata/data.csv', 'verify_Title_TC01');
  //const data = await getExcelDataByTC('verify_Title_TC01');
  const data = await getExcelDataByTC("verify_Title_TC01");
  await page.goto('/');
  await expect(page).toHaveTitle(data.title);
  await page.close();
});

test('verify_logo_TC02', async ({ page }) => {
  await page.goto('/');
  loginpage = new LoginPage(page);
  let isLogoDisplayed = await loginpage.isLogoDisplayed();
  await expect(isLogoDisplayed).toBe(true);
  await page.close();
});

test('verify_invalid_login_TC03', async ({ page }) => {
  //const data = getTestData('verify_invalid_login_TC03');
  //  const data = await getCSVTestData('testdata/data.csv', 'verify_invalid_login_TC03');
   const data = await getExcelDataByTC("verify_invalid_login_TC03");
  await page.goto('/');
  loginpage = new LoginPage(page);
  await loginpage.login(data.username, data.password);
  const isErrorMsgDisplayed = await loginpage.isErrorMsgDisplayed();
  await expect(isErrorMsgDisplayed).toBe(true);
  await page.close();
});

test('verify_valid_login_TC04', async ({ page }) => {
  //const data = getTestData('verify_valid_login_TC04');
  //const data = await getCSVTestData('testdata/data.csv', 'verify_valid_login_TC04');
  const data = await getExcelDataByTC("verify_valid_login_TC04");
  await page.goto('/');
  loginpage = new LoginPage(page);
  await loginpage.login(data.username, data.password);
  await page.waitForTimeout(3000);
  homepage = new HomePage(page);
  homepage.clickLogout();
  await page.waitForTimeout(3000);
   const isLogoDisplayed = await loginpage.isLogoDisplayed();
  await expect(isLogoDisplayed).toBe(true);
  await page.close();
});


test('verify_create_lead_with_mandatory_fields_TC05', async ({ page }) => {
  //const data = getTestData('verify_create_lead_with_mandatory_fields_TC05');
  //const data = await getCSVTestData('testdata/data.csv', 'verify_create_lead_with_mandatory_fields_TC05');
  const data = await getExcelDataByTC("verify_create_lead_with_mandatory_fields_TC05");
  await page.goto('/');
  loginpage = new LoginPage(page);
  await loginpage.login(data.username, data.password);
  await page.waitForTimeout(3000);
  homepage = new HomePage(page);
  homepage.clickNewLead();
  await page.waitForTimeout(3000);
  leadpage = new LeadPage(page);
  await leadpage.createlead(data.lastname, data.company);
  await page.waitForTimeout(3000);
    const lastname = await leadpage.getLastName();
    await expect(lastname).toBe(data.lastname);
    const company = await leadpage.getCompany();
    await expect(company).toBe(data.company);
    await page.waitForTimeout(2000);
  homepage.clickLogout();   
  await page.waitForTimeout(3000);
  await page.close();
});
