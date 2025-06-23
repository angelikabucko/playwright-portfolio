import { type Locator, type Page, expect } from '@playwright/test';

export class Homepage {
  private readonly page: Page;
  private readonly shopPage: Locator;
  private readonly productBackpack: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shopPage = page.getByText('Products');
    this.productBackpack = page.getByRole('link', { name: 'Sauce Labs Backpack' });
  }

  async shopPageIsVisible() {
    try {
      await expect(this.shopPage).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  async clickProductBackpack() {
    await this.productBackpack.click();
  }
}
