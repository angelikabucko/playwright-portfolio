import { APIRequestContext, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export async function generateAuthToken(request: APIRequestContext) {
  let authToken: string;

  const respToken = await request.post('/auth', {
    data: {
      username: `${process.env.BOOKING_USERNAME!}`,
      password: `${process.env.BOOKING_PASSWORD!}`,
    },
  });
  const tokenBody = await respToken.json();
  return (authToken = tokenBody.token);
}

export async function newBooking() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int({ max: 10000 });
  const depositPaid = faker.datatype.boolean();
  const bookingDates = { checkin: '2024-12-30', checkout: '2025-01-31' };
  const additionalNeeds = faker.lorem.sentence();

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
