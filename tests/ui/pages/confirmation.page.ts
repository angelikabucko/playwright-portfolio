import { type Locator, type Page } from '@playwright/test';

export class ConfirmationPage {
  readonly checkoutCompleted: Locator;
  readonly thankYouHeader: Locator;
  readonly menuButton: Locator;
  readonly logOutLink: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.checkoutCompleted = page.getByText('Checkout: Complete!')
    this.thankYouHeader = page.getByText('Thank you for your order!');
    this.menuButton = page.getByRole('button', { name: 'Open menu' });
    this.logOutLink = page.getByRole('link', { name: 'Logout' });
  }

  async clickMenuButton() {
    await this.menuButton.click();
  }

  async clickLogOutLink() {
    await this.logOutLink.click();
  }
}
