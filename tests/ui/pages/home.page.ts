import { type Locator, type Page } from '@playwright/test';

export class Homepage {
  readonly shopPage: Locator;
  readonly productAddToCartButton: (productName: string) => Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.shopPage = page.getByText('Products');
    this.productAddToCartButton = (productName: string) => page.getByRole('link', { name: `Sauce Labs ${productName}` }).first();
  }

  async clickProductAddToCartButton(productName: string) {
    await this.productAddToCartButton(productName).click();
  }
}
