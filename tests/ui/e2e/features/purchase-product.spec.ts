import { test, expect } from '../../fixtures/fixtures';
import { ProductPage } from '../../pages/product.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { ConfirmationPage } from '../../pages/confirmation.page';
import { faker } from '@faker-js/faker';

const productName = 'Backpack';

test.describe('Feature: Purchase a product from the shop', () => {
  test('The user can successfully purchase a product from the website, complete the order and recieve a confirmation screen', async ({ homePage, page }) => {
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    //FIXME: Fix product selection
    await homePage.clickProductAddToCartButton(productName);
    await expect(productPage.productDetails).toBeVisible();

    await productPage.clickAddToCartButton();
    await productPage.clickNewItemAdded();

    await expect(checkoutPage.productName).toBeVisible();

    await checkoutPage.clickCheckoutButton();
    await checkoutPage.fillFirstName(faker.person.firstName());
    await checkoutPage.fillLastName(faker.person.lastName());
    await checkoutPage.fillPostCode(faker.location.zipCode());
    await checkoutPage.clickContinueButton();

    await expect(checkoutPage.paymentInfo).toBeVisible();
    await expect(checkoutPage.shippingInfo).toBeVisible();
    await checkoutPage.clickSubmitOrderButton();

    await expect(confirmationPage.finishHeader).toBeVisible();
    await expect(confirmationPage.completeHeader).toBeVisible();

    await confirmationPage.clickMenuButton();
    await confirmationPage.clickLogOutLink();
  });
});
