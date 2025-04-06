import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postCodeInput: Locator;
  readonly continueButton: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly submitOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByRole('link', { name: 'Sauce Labs Backpack' });
    this.checkoutButton = page.getByRole('link', { name: 'CHECKOUT' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.paymentInfo = page.getByText('Payment Information');
    this.shippingInfo = page.getByText('Shipping Information');
    this.submitOrderButton = page.getByRole('link', { name: 'FINISH' });
  }
}
