import { test, expect } from '../../fixtures/booking.fixtures';
import * as utils from '../../utils/api.utils';

test.describe('Feature: Delete booking | Success responses', { tag: ['@delete-booking', '@success'] }, () => {
  test('Delete a booking', async ({ createBooking, bookingSerivce }) => {
    const newBooking = createBooking;
    const bookingId: number = newBooking.bookingid;
    const authToken = await utils.generateAuthToken(bookingSerivce.request);

    const deleteBookingResponse = await bookingSerivce.deleteRequestToBookingByIdEndpoint(bookingId!, authToken);

    expect(deleteBookingResponse.status()).toBe(201);
  });
});

test.describe('Feature: Delete a booking | Failure responses', { tag: ['@delete-booking', '@failures'] }, () => {
  test('Delete a booking with invalid token | HTTP 403', async ({ createBooking, bookingSerivce }) => {
    const newBooking = createBooking;
    const bookingId: number = newBooking.bookingid;
    const deleteBookingResponse = await bookingSerivce.deleteRequestToBookingByIdEndpoint(bookingId!, `token-invalid`);
    expect(deleteBookingResponse.status()).toBe(403);
  });
});
