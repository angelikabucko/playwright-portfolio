import { test, expect } from '../fixtures/booking.fixtures';
import * as utils from '../utils/api.utils';

test.describe('Feature: Update booking | Success responses', { tag: ['@update-booking', '@success'] }, () => {
  test('Complete update to the booking', async ({ fullBooking, bookingSerivce }) => {
    const updatedBookingData = await utils.newBooking();
    const bookingId: number = fullBooking.bookingid;
    const authToken = await utils.generateAuthToken(bookingSerivce.request);

    const updateFullBookingResponse = await bookingSerivce.putRequestToBookingByIdEndpoint(bookingId, updatedBookingData, authToken);
    expect(updateFullBookingResponse.status()).toBe(200);

    const validateNewBooking = await bookingSerivce.getRequestToBookingByIdEndpoint(bookingId);
    const validateNewBookingBody = await validateNewBooking.json();

    expect(validateNewBookingBody).toHaveProperty('firstname', updatedBookingData.firstname);
    expect(validateNewBookingBody).toHaveProperty('lastname', updatedBookingData.lastname);
    expect(validateNewBookingBody).toHaveProperty('totalprice', updatedBookingData.totalprice);
    expect(validateNewBookingBody).toHaveProperty('depositpaid', updatedBookingData.depositpaid);
    expect(validateNewBookingBody).toHaveProperty('bookingdates', updatedBookingData.bookingdates);
    expect(validateNewBookingBody).toHaveProperty('additionalneeds', updatedBookingData.additionalneeds);
  });

  test(`Partial update to the booking - change client's first name`, async ({ fullBooking, bookingSerivce }) => {
    const updatedBookingData = await utils.newBooking();
    const bookingId: number = fullBooking.bookingid;
    const authToken = await utils.generateAuthToken(bookingSerivce.request);

    const updateBookingFirstNameResponse = await bookingSerivce.patchRequestToBookingByIdEndpoint(bookingId, { firstname: updatedBookingData.firstname }, authToken);
    expect(updateBookingFirstNameResponse.status()).toBe(200);

    const validateNewBooking = await bookingSerivce.getRequestToBookingByIdEndpoint(bookingId);
    const validateNewBookingBody = await validateNewBooking.json();

    expect(validateNewBookingBody).toHaveProperty('firstname', updatedBookingData.firstname);
    expect(validateNewBookingBody).toHaveProperty('lastname', fullBooking.booking.lastname);
  });

  test('Attempt to update a booking with invalid token', async ({ fullBooking, bookingSerivce }) => {
    const bookingId: number = fullBooking.bookingid;
    const updateInvalidTokenResponse = await bookingSerivce.patchRequestToBookingByIdEndpoint(bookingId, { firstname: 'InvalidToken' }, `token-invalid`);
    expect(updateInvalidTokenResponse.status()).toBe(403);
  });
});
