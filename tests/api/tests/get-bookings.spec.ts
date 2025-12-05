import { test, expect } from '../fixtures/booking.fixtures';

test.describe('Feature: Fetch list of bookings | Success responses', { tag: ['@fetch-bookings', '@success'] }, () => {
  test('Get list of bookings', async ({ bookingSerivce }) => {
    const getBookingsResponse = await bookingSerivce.getRequestToBookingEndpoint();
    expect(getBookingsResponse.status()).toBe(200);

    const getBookingsBody = await getBookingsResponse.json();
    expect(getBookingsBody.length).toBeGreaterThanOrEqual(0);
  });
});
