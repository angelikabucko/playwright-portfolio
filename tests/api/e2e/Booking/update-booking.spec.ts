import { test, expect } from '@playwright/test';
import * as utils from './utils/api.utils';
import dotenv from 'dotenv';
dotenv.config();

let authToken: string;
let createBooking: any;
let bookingId: number;

test.describe('Feature: Update booking', () => {
  test.beforeEach('Basic Auth', async ({ request }) => {
    authToken = await utils.generateAuthToken(request);
  });

  test.beforeEach('Setup - Create a booking before updating', async ({ request }) => {
    createBooking = await utils.createBooking(request);
    bookingId = createBooking.bookingid;
  });

  test.afterEach('Teardown - Delete booking', async ({ request }) => {
    await utils.deleteBooking(request, bookingId);
  });

  test('Complete update to the booking', async ({ request }) => {
    const updateBooking = await utils.newBooking();
    const updateFullBookingResp = await request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
      data: updateBooking,
    });
    expect(updateFullBookingResp.status()).toBe(200);

    const validateNewBooking = await utils.validateResponse(request, bookingId);
    expect(validateNewBooking).toHaveProperty('firstname', updateBooking.firstname);
    expect(validateNewBooking).toHaveProperty('lastname', updateBooking.lastname);
    expect(validateNewBooking).toHaveProperty('totalprice', updateBooking.totalprice);
    expect(validateNewBooking).toHaveProperty('depositpaid', updateBooking.depositpaid);
    expect(validateNewBooking).toHaveProperty('bookingdates', updateBooking.bookingdates);
    expect(validateNewBooking).toHaveProperty('additionalneeds', updateBooking.additionalneeds);
  });

  test(`Partial update to the booking - change client's first name`, async ({ request }) => {
    const updateBooking = await utils.newBooking();

    const updatePartBookingResp = await request.patch(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
      data: {
        firstname: updateBooking.firstname,
      },
    });
    expect(updatePartBookingResp.status()).toBe(200);

    const validateNewBooking = await utils.validateResponse(request, bookingId);
    expect(validateNewBooking).toHaveProperty('firstname', updateBooking.firstname);
    expect(validateNewBooking).toHaveProperty('lastname', createBooking.booking.lastname);
  });

  test('Attempt to update a booking with invalid token', async ({ request }) => {
    const updatePartBookingResp = await request.patch(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=invalid`,
      },
    });
    expect(updatePartBookingResp.status()).toBe(403);
  });
});
