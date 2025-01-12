import { faker } from '@faker-js/faker';
import { APIRequestContext, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

let authToken: string;
let firstName: string;
let lastName: string;
let totalPrice: number;
let depositPaid: boolean;
let bookingDates: {
  checkin: string;
  checkout: string;
};
let additionalNeeds: string;

export async function generateAuthToken(request: APIRequestContext) {
  const respToken = await request.post('/auth', {
    data: {
      username: `${process.env.BOOKING_USERNAME}`,
      password: `${process.env.BOOKING_PASSWORD}`,
    },
  });
  const tokenBody = await respToken.json();
  return (authToken = tokenBody.token);
}

export async function newBooking() {
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  totalPrice = faker.number.int({ max: 10000 });
  depositPaid = faker.datatype.boolean();
  bookingDates = { checkin: '2024-12-30', checkout: '2025-01-31' };
  additionalNeeds = faker.lorem.sentence();

  const newBookingRequest = {
    firstname: firstName,
    lastname: lastName,
    totalprice: totalPrice,
    depositpaid: depositPaid,
    bookingdates: bookingDates,
    additionalneeds: additionalNeeds,
  };

  return newBookingRequest;
}

export async function createBooking(request: APIRequestContext) {
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

export async function deleteBooking(request: APIRequestContext, bookingId: number) {
  authToken = await generateAuthToken(request);
  const deleteBooking = await request.delete(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${authToken}`,
    },
  });
  expect(deleteBooking.status()).toBe(201);
}
