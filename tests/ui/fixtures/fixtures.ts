import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Homepage } from '../pages/home.page';
import { ConfirmationPage } from '../pages/confirmation.page';

type APIFixtures = {
  homePage: Homepage;
};

export const test = base.extend<APIFixtures>({
  homePage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const homePage = new Homepage(page);
    const confirmationPage = new ConfirmationPage(page);

    await loginPage.logIn(process.env.UI_STANDARD_USERNAME!, process.env.UI_STANDARD_PASSWORD!);

    await use(homePage);
  },
});

export { expect } from '@playwright/test';
