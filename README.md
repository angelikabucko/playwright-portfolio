# playwright-portfolio

Portfolio of UI &amp; API Playwright tests using TypeScript

# Description

This project consists of both UI & API Playwright/TS tests that run on sites dedicated for practicing test automation skills.
For API: https://restful-booker.herokuapp.com/
For UI: https://www.saucedemo.com/v1/index.html

# To start with the project:

This project requires node.js installed.

1. Clone the repo
2. Run `npm install`
3. Run `npx playwright install --with-deps`
4. Run `npx playwright test`

Make sure to create a .env file that will include:

- BOOKING_USERNAME
- BOOKING_PASSWORD
- UI_STANDARD_USERNAME
- UI_STANDARD_PASSWORD

All details necessary to fill in those variables are available on the respective websites linked above.

You should be able to run all tests by typing `npx playwright test` in the terminal. You can run separate projects by specifing their name, e.g. `npx playwright test --project=chromium`

Feel free to drop me a message or email me at angelika.b.99@gmail.com if you have issues with running this repo.
