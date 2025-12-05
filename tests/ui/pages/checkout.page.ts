import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly productName: (productName: string) => Locator;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postcodeInput: Locator;
  readonly continueButton: Locator;
  readonly paymentInformation: Locator;
  readonly shippingInformation: Locator;
  readonly submitOrderButton: Locator;

  constructor(readonly page: Page) {
    this.page = page;
    this.productName = (productName: string) => page.getByRole('link', { name: `Sauce Labs ${productName}` });
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postcodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.paymentInformation = page.getByText('Payment Information');
    this.shippingInformation = page.getByText('Shipping Information');
    this.submitOrderButton = page.getByRole('button', { name: 'Finish' });
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
    await this.postcodeInput.fill(postCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickSubmitOrderButton() {
    await this.submitOrderButton.click();
  }

  async fillCheckoutForm(firstName: string, lastName: string, postCode: string) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostCode(postCode);
  }
}
