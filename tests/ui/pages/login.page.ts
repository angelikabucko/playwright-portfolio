import { expect, type Locator, type Page } from '@playwright/test';
import { Homepage } from './home.page';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async logIn(username: string, password: string) {
    await this.page.goto('https://www.saucedemo.com/v1/index.html');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    const homepage = new Homepage(this.page);
    await expect(homepage.shopPage).toBeVisible();
  }
}
