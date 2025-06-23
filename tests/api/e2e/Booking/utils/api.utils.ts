import { faker } from '@faker-js/faker';
import { APIRequestContext, expect } from '@playwright/test';
import { User } from './user.type';
import { BookingResponse } from './interfaces';
import dotenv from 'dotenv';
dotenv.config();

export async function generateAuthToken(request: APIRequestContext) {
  const respToken = await request.post('/auth', {
    data: {
      username: `${process.env.BOOKING_USERNAME}`,
      password: `${process.env.BOOKING_PASSWORD}`,
    },
  });
  const tokenBody = await respToken.json();
  const authToken: string = tokenBody.token;
  return authToken;
}

export async function newBooking() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int({ max: 10000 });
  const depositPaid = faker.datatype.boolean();
  const bookingDates = { checkin: '2024-12-30', checkout: '2025-01-31' };
  const additionalNeeds = faker.lorem.sentence();

  const newBookingRequest: User = {
    firstname: firstName,
    lastname: lastName,
    totalprice: totalPrice,
    depositpaid: depositPaid,
    bookingdates: bookingDates,
    additionalneeds: additionalNeeds,
  };

  return newBookingRequest;
}

export async function createBooking(request: APIRequestContext): Promise<BookingResponse> {
  const createNewBooking = await newBooking();

  const createNewBookingResp = await request.post('/booking', {
    data: createNewBooking,
  });
  expect(createNewBookingResp.status()).toBe(200);

  const createNewBookingBody = await createNewBookingResp.json();

  return createNewBookingBody;
}

export async function validateResponse(request: APIRequestContext, bookingId: number) {
  const getBookingByIdResp = await request.get(`/booking/${bookingId}`);
  expect(getBookingByIdResp.status()).toBe(200);

  const getBookingByIdBody = getBookingByIdResp.json();

  return getBookingByIdBody;
}

export async function deleteBooking(request: APIRequestContext, bookingId: number, authToken: string) {
  const deleteBooking = await request.delete(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${authToken}`,
    },
  });
  expect(deleteBooking.status()).toBe(201);
}
