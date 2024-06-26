import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly loginButton: Locator;
  readonly standardUserName: string;
  readonly validPassword: string;
  readonly lockedOutUserName: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextbox = page.locator('id=user-name' );
    this.passwordTextbox = page.locator('id=password');
    this.loginButton = page.locator('id=login-button')  
    this.standardUserName = 'standard_user';  
    this.validPassword = 'secret_sauce';
    this.lockedOutUserName = 'locked_out_user';
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
    await expect(this.page).toHaveTitle(/Swag Labs/);        
    await expect(this.usernameTextbox).toBeVisible();
    await expect(this.passwordTextbox).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.loginButton.click();
  }

  async verifyUserIsLoggedIn() {
    await expect(this.page.locator('.title')).toContainText('Products');  
    await expect(this.page.locator('id=react-burger-menu-btn')).toBeVisible();
    await expect(this.page.locator('.shopping_cart_link')).toBeVisible();
    await expect(this.page.locator('.inventory_list')).toBeVisible();    
  }

  async verifyLoginErrorMessage(errorMessage : string){
    const error_message = this.page.getByText(errorMessage);
    await expect(error_message).toBeVisible();    
  }
}