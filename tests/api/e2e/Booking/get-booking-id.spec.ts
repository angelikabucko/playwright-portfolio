import { test, expect } from '@playwright/test';
import { BookingResponse } from './utils/interfaces';
import * as utils from './utils/api.utils';

let authToken: string;
let createBooking: BookingResponse;
let bookingId: number;

test.describe('Feature: Fetch a specific booking from a list of bookings', () => {
  test.beforeEach('Basic Auth', async ({ request }) => {
    authToken = await utils.generateAuthToken(request);
  });

  test.beforeEach('Setup - Create a booking', async ({ request }) => {
    createBooking = await utils.createBooking(request);
    bookingId = createBooking.bookingid;
  });

  test.afterEach('Teardown - Delete booking', async ({ request }) => {
    await utils.deleteBooking(request, bookingId, authToken);
  });
  test('Get a booking by id', async ({ request }) => {
    const getBookingByIdResp = await request.get(`/booking/${bookingId}`);
    expect(getBookingByIdResp.status()).toBe(200);

    const getBookingByIdBody = await getBookingByIdResp.json();
    expect(getBookingByIdBody).toHaveProperty('firstname', createBooking.booking.firstname);
    expect(getBookingByIdBody).toHaveProperty('lastname', createBooking.booking.lastname);
    expect(getBookingByIdBody).toHaveProperty('totalprice', createBooking.booking.totalprice);
    expect(getBookingByIdBody).toHaveProperty('depositpaid', createBooking.booking.depositpaid);
    expect(getBookingByIdBody).toHaveProperty('bookingdates', createBooking.booking.bookingdates);
    expect(getBookingByIdBody).toHaveProperty('additionalneeds', createBooking.booking.additionalneeds);
  });
});
