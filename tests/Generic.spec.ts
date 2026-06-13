import { test, expect } from '@playwright/test';

test('window handle operation', async ({ page }) => {
  
  await page.goto('/');
  await page.locator("//input[@name='user_name']").fill("admin");
  await page.locator("//input[@name='user_password']").fill("admin");
  await page.locator("//input[@name='Login']").click();
  await page.waitForTimeout(3000);
  await page.locator("//a[text()='New Account']").click()

  // Option 1: Handle popup window triggered by click
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator("//input[@name='btn1']").click()
  ]);
  await newPage.waitForLoadState();
  console.log('New page title:', await newPage.title());
  await newPage.locator("//a[text()='vtiger']").click();
  await page.waitForTimeout(2000);
  await page.locator("//input[@name='accountname']").fill("Apple"); 
  
  await page.locator("//a[text()='New Account']").click()

});


test('Mouse Operations', async ({ page }) => {
  
  await page.goto('/');
  await page.locator("//input[@name='user_name']").fill("admin");
  await page.locator("//input[@name='user_password']").fill("admin");
  await page.locator("//input[@name='Login']").click();
  await page.waitForTimeout(3000);
  await page.locator("a#showSubMenu").hover();
  await page.waitForTimeout(5000);
  await page.locator("//a[text()='New Vendor']").click();
  await page.waitForTimeout(5000);
  await page.locator("//a[text()='My Account']").click();
  await page.waitForTimeout(2000);
  await page.locator("//input[@name='Customise']").click();
  await page.dragAndDrop('#cl2', '#cl6');
  await page.waitForTimeout(6000);
  let x = await page.locator("#cl6").textContent();
    console.log(x);


 // await page.waitForTimeout(2000);
  //await page.locator("//th[text()='Vendor Information:']").isVisible();

  
  await page.close();
});

test('Handle Alert operation', async ({ page }) => {
  
  await page.goto('/');
  await page.locator("//input[@name='user_name']").fill("admin");
  await page.locator("//input[@name='user_password']").fill("admin");
  await page.locator("//input[@name='Login']").click();
  await page.waitForTimeout(3000);
  
  await page.locator("//a[text()='New Lead']").click();
  await page.waitForTimeout(5000);

   page.once('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
    console.log("Alert accepted");
  });
  await page.locator("//input[@name='button']").nth(0).click();
  await page.waitForTimeout(3000);

   

  await page.locator("//input[@name='lastname']").fill("Smith");
   await page.waitForTimeout(3000);
    page.once('dialog', async dialog => {
    console.log(dialog.message());
    let text = dialog.message();
    expect(text).toBe("Company cannot be empty");
    await dialog.accept();
  });

  await page.locator("//input[@name='button']").nth(0).click();
 
  await page.locator("//input[@name='company']").fill("Apple");
  
  
  await page.locator("//input[@name='button']").nth(0).click();


  await page.locator("//a[text()='Leads']").click();
  await page.waitForTimeout(3000);

     page.once('dialog', async dialog => {
    console.log(dialog.message());
    let text = dialog.message();
    //expect(text).toBe("Are you sure?");
    await dialog.dismiss();
    
  });   
  await page.locator("//a[text()='del']").nth(10).click();
  await page.waitForTimeout(3000);
  
     page.once('dialog', async dialog => {
    console.log(dialog.message());
    let text = dialog.message();
    expect(text).toBe("Are you sure?");
    await dialog.accept();
    
  });
  await page.locator("//a[text()='del']").nth(10).click();
  await page.waitForTimeout(3000);
  await page.close();
});



test('WIndow and Tabs handling', async ({ page }) => {
  
  await page.goto('/');
  await page.locator("//input[@name='user_name']").fill("admin");
  await page.locator("//input[@name='user_password']").fill("admin");
  await page.locator("//input[@name='Login']").click();
  await page.waitForTimeout(3000);
  
  await page.locator("//a[text()='New Account']").click();
  await page.waitForTimeout(3000);

  
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator("//input[@name='btn1']").click(),
  ]);
  await newPage.waitForLoadState();
 // console.log('New page title:', await newPage.title());
 await newPage.locator("//input[@name='name']").fill("vtiger");
 await newPage.locator("//input[@name='button']").click(); 
  await newPage.locator("//a[text()='vtiger']").click();
  //await newPage.close();


  await page.waitForTimeout(2000);
  await page.locator("//input[@name='accountname']").fill("Apple");
  await page.locator("//a[text()='Logout']").click();

   const [tab2] = await Promise.all([page.waitForEvent('popup'),
    page.locator("//a[text()='vtiger Customer Portal']").click(),
  ]);

  

  await tab2.locator("//span[contains(text(),'Login')]").click();
  await tab2.waitForTimeout(2000);
  await tab2.locator("//input[@name='username']").fill("admin");
  await tab2.waitForTimeout(2000);

  await page.bringToFront();
  await page.locator("//input[@name='user_password']").fill("admin");
  await tab2.waitForTimeout(2000);
  await tab2.bringToFront();
  await tab2.locator("//input[@name='password']").fill("admin");
  await tab2.waitForTimeout(2000);
  await tab2.close();

  await page.locator("//input[@name='Login']").click();
});


test('file upload', async ({ page }) => {
  
  await page.goto('/');
  await page.locator("//input[@name='user_name']").fill("admin");
  await page.locator("//input[@name='user_password']").fill("admin");
  await page.locator("//input[@name='Login']").click();
  await page.waitForTimeout(3000);
  
  await page.locator("//a[text()='New Product']").click();
  await page.waitForTimeout(3000);

  //await page.locator("//input[@type='file']").fill("C:/Users/RAJESH/OneDrive/Desktop/test.html");
  //await page.locator("//input[@type='file']").setInputFiles("C:/Users/RAJESH/OneDrive/Desktop/test.html");

 //using browser button to upload file

 const fileChooserPromise = page.waitForEvent('filechooser');

 await page.locator("//input[@type='file']").click();

const fileChooser = await fileChooserPromise;
await fileChooser.setFiles("C:/Users/RAJESH/OneDrive/Desktop/test.html");
 
 });


 test('webtable', async ({ page }) => {
  
  await page.goto('/');
  await page.locator("//input[@name='user_name']").fill("admin");
  await page.locator("//input[@name='user_password']").fill("admin");
  await page.locator("//input[@name='Login']").click();
  await page.waitForTimeout(3000);
  
  await page.locator("(//a[text()='Leads'])[1]").click();
  await page.waitForTimeout(3000);


  for (let row = 5; row < 25; row++) {
  const xpath = `//table[@class='FormBorder']/tbody/tr[${row}]/td[4]`;

  const text = await page.locator(xpath).textContent();
  if(text?.trim() === "test10") {
    console.log(`Found test10 in row ${row}`);
    await page.locator("//input[@name='selected_id']").nth(row-5).click();
    break;
  }

  
 // console.log(`Row ${row}: ${text?.trim()}`);
}



 });

