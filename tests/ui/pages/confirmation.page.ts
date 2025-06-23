import { type Locator, type Page, expect } from '@playwright/test';

export class ConfirmationPage {
  private readonly page: Page;
  private readonly finishHeader: Locator;
  private readonly completeHeader: Locator;
  private readonly menuButton: Locator;
  private readonly logOutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishHeader = page.getByText('Finish');
    this.completeHeader = page.getByText('THANK YOU FOR YOUR ORDER');
    this.menuButton = page.getByRole('button', { name: 'Open menu' });
    this.logOutLink = page.getByRole('link', { name: 'Logout' });
  }

  async clickMenuButton() {
    await this.menuButton.click();
  }

  async clickLogOutLink() {
    await this.logOutLink.click();
  }

  async finishHeaderIsVisible() {
    try {
      await expect(this.finishHeader).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  async completeHeaderIsVisible() {
    try {
      await expect(this.completeHeader).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }
}
