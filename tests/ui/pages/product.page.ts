import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productDetails: Locator;
  readonly addToCartButton: Locator;
  readonly newItemAdded: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productDetails = page.getByText('Sauce Labs Backpack');
    this.addToCartButton = page.getByRole('button', { name: 'ADD TO CART' });
    this.newItemAdded = page.getByRole('link', { name: '1' });
  }
}
