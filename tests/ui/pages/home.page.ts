import { expect, type Locator, type Page } from '@playwright/test';

export class Homepage {
  readonly page: Page;
  readonly shopPage: Locator;
  readonly productBackpack: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shopPage = page.getByText('Products');
    this.productBackpack = page.getByRole('link', { name: 'Sauce Labs Backpack' });
  }
}
