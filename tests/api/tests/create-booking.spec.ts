import { test, expect } from '../fixtures/booking.fixtures';
import * as utils from '../utils/api.utils';

let bookingId: number;

test.describe('Feature: Create a booking | Success responses', { tag: ['@create-booking', '@success'] }, () => {
  test.afterEach('Teardown - Delete booking', async ({ bookingSerivce }) => {
    await bookingSerivce.deleteRequestToBookingByIdEndpoint(bookingId!, await utils.generateAuthToken(bookingSerivce.request));
  });

  test('Create a basic booking', async ({ bookingSerivce }) => {
    const newBookingData = await utils.newBooking();

    const createNewBookingResponse = await bookingSerivce.postRequestToBookingEndpoint(newBookingData);
    expect(createNewBookingResponse.status()).toBe(200);

    const newBookingBody = await createNewBookingResponse.json();
    expect(newBookingBody).toHaveProperty('bookingid');
    bookingId = newBookingBody.bookingid;

    expect(newBookingBody).toHaveProperty('booking.firstname', newBookingData.firstname);
    expect(newBookingBody).toHaveProperty('booking.lastname', newBookingData.lastname);
    expect(newBookingBody).toHaveProperty('booking.totalprice', newBookingData.totalprice);
    expect(newBookingBody).toHaveProperty('booking.depositpaid', newBookingData.depositpaid);
    expect(newBookingBody).toHaveProperty('booking.bookingdates', newBookingData.bookingdates);
    expect(newBookingBody).toHaveProperty('booking.additionalneeds', newBookingData.additionalneeds);
  });
});

//TODO: Implement failure test cases
test.describe('Feature: Create a booking | Failure responses', { tag: ['@create-booking', '@failures'] }, () => {});
