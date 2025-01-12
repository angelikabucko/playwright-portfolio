import { test, expect } from '@playwright/test';

test.describe('Feature: Fetch list of bookings', () => {
  test('Get list of bookings', async ({ request }) => {
    const getBookingsResp = await request.get('/booking');
    expect(getBookingsResp.status()).toBe(200);

    const getBookingsBody = await getBookingsResp.json();
    expect(getBookingsBody.length).toBeGreaterThanOrEqual(0);
  });
});
