import { test, expect } from '../fixtures/fixtures';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ConfirmationPage } from '../pages/confirmation.page';
import { faker } from '@faker-js/faker';

const productName = 'Backpack';

test.describe('Feature: Purchase a product from the shop', () => {
  test('The user can successfully purchase a product from the website, complete the order and recieve a confirmation screen', async ({ homePage, page }) => {
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    await homePage.clickProductAddToCartButton(productName);
    await expect(productPage.productDetails).toBeVisible();

    await productPage.clickAddToCartButton();
    await productPage.clickNewItemAdded();

    await expect(checkoutPage.productName(productName)).toBeVisible();

    await checkoutPage.clickCheckoutButton();

    await checkoutPage.fillCheckoutForm(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode())
    
    await checkoutPage.clickContinueButton();

    await expect(checkoutPage.paymentInformation).toBeVisible();
    await expect(checkoutPage.shippingInformation).toBeVisible();
    await checkoutPage.clickSubmitOrderButton();

    await expect(confirmationPage.checkoutCompleted).toBeVisible();
    await expect(confirmationPage.thankYouHeader).toBeVisible();

    await confirmationPage.clickMenuButton();
    await confirmationPage.clickLogOutLink();
  });
});
