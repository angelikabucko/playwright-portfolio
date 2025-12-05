import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly productName: Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postCodeInput: Locator;
  readonly continueButton: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly submitOrderButton: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.productName = page.getByRole('link', { name: 'Sauce Labs Backpack' });
    this.checkoutButton = page.getByRole('link', { name: 'CHECKOUT' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postcodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.paymentInformation = page.getByText('Payment Information');
    this.shippingInformation = page.getByText('Shipping Information');
    this.submitOrderButton = page.getByRole('link', { name: 'FINISH' });
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostCode(postCode: string) {
    await this.postCodeInput.fill(postCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickSubmitOrderButton() {
    await this.submitOrderButton.click();
  }
}
