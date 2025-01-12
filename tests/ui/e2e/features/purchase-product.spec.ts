import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
dotenv.config();
import { LoginPage } from '../../pages/login.page';
import { Homepage } from '../../pages/home.page';
import { ProductPage } from '../../pages/product.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { ConfirmationPage } from '../../pages/confirmation.page';

let loginPage: LoginPage;
let homePage: Homepage;
let productPage: ProductPage;
let checkoutPage: CheckoutPage;
let confirmationPage: ConfirmationPage;

test.describe('Feature: Purchase a product from the shop', () => {
  test.beforeEach('Setup - Login', async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new Homepage(page);
    productPage = new ProductPage(page);
    checkoutPage = new CheckoutPage(page);
    confirmationPage = new ConfirmationPage(page);

    await loginPage.logIn(process.env.UI_STANDARD_USERNAME!, process.env.UI_STANDARD_PASSWORD!);
  });

  test.afterEach('Teardown - Log out', async () => {
    await confirmationPage.menuButton.click();
    await confirmationPage.logOutLink.click();

    await expect(loginPage.usernameInput).toBeVisible();
  });

  test('The user purchases a product from the website, completes the order and recieves a confirmation screen', async () => {
    await homePage.productBackpack.click();
    await expect(productPage.productDetails).toBeVisible();

    await productPage.addToCartButton.click();
    await productPage.newItemAdded.click();

    await expect(checkoutPage.productName).toBeVisible();
    await checkoutPage.checkoutButton.click();
    await checkoutPage.firstNameInput.fill(faker.person.firstName());
    await checkoutPage.lastNameInput.fill(faker.person.lastName());
    await checkoutPage.postCodeInput.fill(faker.location.zipCode());
    await checkoutPage.continueButton.click();
    await expect(checkoutPage.paymentInfo).toBeVisible();
    await expect(checkoutPage.shippingInfo).toBeVisible();
    await checkoutPage.submitOrderButton.click();

    await expect(confirmationPage.finishHeader).toBeVisible();
    await expect(confirmationPage.completeHeader).toBeVisible();
  });
});
