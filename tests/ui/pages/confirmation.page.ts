import { type Locator, type Page } from '@playwright/test';

export class ConfirmationPage {
  readonly finishHeader: Locator;
  readonly completeHeader: Locator;
  readonly menuButton: Locator;
  readonly logOutLink: Locator;

  constructor(readonly page: Page) {
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
}
