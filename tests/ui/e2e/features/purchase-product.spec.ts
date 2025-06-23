import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { Homepage } from '../../pages/home.page';
import { ProductPage } from '../../pages/product.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { ConfirmationPage } from '../../pages/confirmation.page';
import dotenv from 'dotenv';
dotenv.config();

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
    expect(homePage.shopPageIsVisible(), { message: 'Shop page is not visible' }).toBeTruthy();
  });

  test.afterEach('Teardown - Log out', async () => {
    await confirmationPage.clickMenuButton();
    await confirmationPage.clickLogOutLink();

    expect(loginPage.usernameInputIsVisible(), { message: 'Username Input is not visible' }).toBeTruthy();
  });

  test('The user purchases a product from the website, completes the order and recieves a confirmation screen', async () => {
    await homePage.clickProductBackpack();
    expect(productPage.productDetailsIsVisible(), { message: 'Product details are not visible' }).toBeTruthy();

    await productPage.clickAddToCartButton();
    await productPage.clickNewItemAddedLink();

    expect(await checkoutPage.productNameIsVisible(), { message: 'The product name is not visible' }).toBeTruthy();
    await checkoutPage.clickCheckoutButton();
    await checkoutPage.fillFirstName();
    await checkoutPage.fillLastName();
    await checkoutPage.fillPostcodeInput();
    await checkoutPage.clickContinueButton();
    expect(await checkoutPage.paymentInformationIsVisible(), { message: 'The payment information is not visible' }).toBeTruthy();
    expect(await checkoutPage.shippingInformationIsVisible(), { message: 'The shipping information is not visible' }).toBeTruthy();
    await checkoutPage.clickSubmitOrderButton();

    expect(await confirmationPage.finishHeaderIsVisible(), { message: 'The finish header is not visible' }).toBeTruthy();
    expect(await confirmationPage.completeHeaderIsVisible(), { message: 'The complete header is not visible' }).toBeTruthy();
  });
});
