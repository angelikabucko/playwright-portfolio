import { type Locator, type Page, expect } from '@playwright/test';

export class ProductPage {
  private readonly page: Page;
  private readonly productDetails: Locator;
  private readonly addToCartButton: Locator;
  private readonly newItemAdded: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDetails = page.getByText('Sauce Labs Backpack');
    this.addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    this.newItemAdded = page.getByRole('link', { name: '1' });
  }

  async productDetailsIsVisible() {
    try {
      await expect(this.productDetails).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }

  async clickNewItemAddedLink() {
    await this.newItemAdded.click();
  }
}
