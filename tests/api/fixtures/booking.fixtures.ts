import { test as base } from '@playwright/test';
import { BookingService } from '../services/booking.service';
import { Booking } from '../interfaces/booking.interface';
import * as utils from '../utils/api.utils';

type APIFixtures = {
  bookingSerivce: BookingService;
  createBooking: Booking;
  fullBooking: Booking;
};

export const test = base.extend<APIFixtures>({
  bookingSerivce: async ({ request }, use) => {
    const bookingService = new BookingService(request);
    await use(bookingService);
  },
  createBooking: async ({ bookingSerivce }, use) => {
    const newBookingData = await utils.newBooking();
    const newBookingResponse = await bookingSerivce.postRequestToBookingEndpoint(newBookingData);
    const newBookingBody = await newBookingResponse.json();

    await use(newBookingBody);
  },
  fullBooking: async ({ bookingSerivce, createBooking }, use) => {
    const newBooking = createBooking;
    const authToken = await utils.generateAuthToken(bookingSerivce.request);

    await use(newBooking);

    await bookingSerivce.deleteRequestToBookingByIdEndpoint(createBooking.bookingid!, authToken);
  },
});

export { expect } from '@playwright/test';
