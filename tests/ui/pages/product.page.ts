import { type Locator, type Page, expect } from '@playwright/test';

export class ProductPage {
  readonly productDetails: Locator;
  readonly addToCartButton: Locator;
  readonly newItemAdded: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.productDetails = page.getByText('Sauce Labs Backpack');
    this.addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    this.newItemAdded = page.getByRole('link', { name: '1' });
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }

  async clickNewItemAdded() {
    await this.newItemAdded.click();
  }
}
