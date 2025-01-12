import { test, expect } from '@playwright/test';
import * as utils from './utils/api.utils';

let bookingId: number;

test.describe('Feature: Create a booking', () => {
  test.afterEach('Teardown - Delete booking', async ({ request }) => {
    await utils.deleteBooking(request, bookingId);
  });

  test('Create a basic booking', async ({ request }) => {
    const createNewBooking = await utils.newBooking();

    const createNewBookingResp = await request.post('/booking', {
      data: createNewBooking,
    });
    expect(createNewBookingResp.status()).toBe(200);

    const createNewBookingBody = await createNewBookingResp.json();
    expect(createNewBookingBody).toHaveProperty('bookingid');
    bookingId = createNewBookingBody.bookingid;

    const validateNewBooking = await utils.validateResponse(request, bookingId);
    expect(validateNewBooking).toHaveProperty('firstname', createNewBooking.firstname);
    expect(validateNewBooking).toHaveProperty('lastname', createNewBooking.lastname);
    expect(validateNewBooking).toHaveProperty('totalprice', createNewBooking.totalprice);
    expect(validateNewBooking).toHaveProperty('depositpaid', createNewBooking.depositpaid);
    expect(validateNewBooking).toHaveProperty('bookingdates', createNewBooking.bookingdates);
    expect(validateNewBooking).toHaveProperty('additionalneeds', createNewBooking.additionalneeds);
  });
});
