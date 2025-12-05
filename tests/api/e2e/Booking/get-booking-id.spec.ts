import { test, expect } from '../../fixtures/booking.fixtures';
import * as utils from '../../utils/api.utils';

let authToken: string;
let createBooking: BookingResponse;
let bookingId: number;

test.describe('Feature: Fetch a specific booking from a list of bookings | Success responses', { tag: ['@fetch-booking', '@success'] }, () => {
  test('Get a booking by id', async ({ fullBooking, bookingSerivce }) => {
    const bookingId: number = fullBooking.bookingid;

    const getBookingByIdResponse = await bookingSerivce.getRequestToBookingByIdEndpoint(bookingId!);
    expect(getBookingByIdResponse.status()).toBe(200);

    const getBookingByIdBody = await getBookingByIdResponse.json();
    console.log(getBookingByIdBody);
    expect(getBookingByIdBody).toHaveProperty('firstname', fullBooking.booking.firstname);
    expect(getBookingByIdBody).toHaveProperty('lastname', fullBooking.booking.lastname);
    expect(getBookingByIdBody).toHaveProperty('totalprice', fullBooking.booking.totalprice);
    expect(getBookingByIdBody).toHaveProperty('depositpaid', fullBooking.booking.depositpaid);
    expect(getBookingByIdBody).toHaveProperty('bookingdates', fullBooking.booking.bookingdates);
    expect(getBookingByIdBody).toHaveProperty('additionalneeds', fullBooking.booking.additionalneeds);
  });
});
