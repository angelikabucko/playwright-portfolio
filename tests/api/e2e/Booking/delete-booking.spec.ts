import { test, expect } from '@playwright/test';
import * as utils from './utils/api.utils';
import dotenv from 'dotenv';
dotenv.config();

let authToken: string;
let createBooking: any;
let bookingId: number;

test.describe('Feature: Delete booking', () => {
  test.beforeEach('Basic Auth', async ({ request }) => {
    authToken = await utils.generateAuthToken(request);
  });

  test.beforeEach('Setup - Create a booking', async ({ request }) => {
    createBooking = await utils.createBooking(request);
    bookingId = createBooking.bookingid;
  });

  test('Delete a booking', async ({ request }) => {
    const deleteBookingResp = await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
    });
    expect(deleteBookingResp.status()).toBe(201);
  });

  test('Attempt to delete a booking with invalid token', async ({ request }) => {
    const deleteBookingResp = await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=invalid`,
      },
    });
    expect(deleteBookingResp.status()).toBe(403);
  });
});
