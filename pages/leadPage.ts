import { Page } from '@playwright/test';

export class LeadPage {

 page: Page;

 constructor(page: Page) {
    this.page = page;   
  }

  loc_tb_lastname = "//input[@name='lastname']";
  loc_tb_company = "//input[@name='company']";
  loc_btn_save = "//input[@name='button']";
  loc_txt_lastname = "//td[text()='Last Name:']/following::td[1]";
  loc_txt_company = "//td[text()='Company:']/following::td[1]";
    
  
async  createlead(lastname: string, company: string): Promise<void>
  {    
    await this.setLastName(lastname);
    await this.setCompany(company);
    await this.clickSave();

  }  

async setLastName(lastname: string): Promise<void>
  {
    await this.page.fill(this.loc_tb_lastname, lastname);
  }

async setCompany(company: string): Promise<void>
  {
    await this.page.fill(this.loc_tb_company, company);
  }

async clickSave(): Promise<void>
  {
    await this.page.locator(this.loc_btn_save).first().click();
  }


async getLastName(): Promise<string|null>
  {
    return await this.page.textContent(this.loc_txt_lastname);
  }  

async getCompany(): Promise<string|null>
  {
    return await this.page.textContent(this.loc_txt_company);
  }  




    
}


