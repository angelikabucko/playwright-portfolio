import { type Locator, type Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CheckoutPage {
  private readonly page: Page;
  private readonly productName: Locator;
  private readonly checkoutButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postcodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly paymentInformation: Locator;
  private readonly shippingInformation: Locator;
  private readonly submitOrderButton: Locator;

  constructor(page: Page) {
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

  async fillFirstName() {
    await this.firstNameInput.fill(faker.person.firstName());
  }

  async fillLastName() {
    await this.lastNameInput.fill(faker.person.lastName());
  }

  async fillPostcodeInput() {
    await this.postcodeInput.fill(faker.location.zipCode());
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickSubmitOrderButton() {
    await this.submitOrderButton.click();
  }

  async productNameIsVisible() {
    try {
      await expect(this.productName).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  async paymentInformationIsVisible() {
    try {
      await expect(this.paymentInformation).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }

  async shippingInformationIsVisible() {
    try {
      await expect(this.shippingInformation).toBeVisible();
      return true;
    } catch {
      return false;
    }
  }
}
