import { APIRequestContext, APIResponse } from '@playwright/test';
import { BookingRequest } from '../interfaces/booking.request.interface';

export class BookingService {
  private readonly bookingEndpoint = '/booking';
  private readonly bookingByIdEndpoint = (id: number) => `/booking/${id}`;

  constructor(readonly request: APIRequestContext) {
    this.request = request;
  }

  async postRequestToBookingEndpoint(newBookingData: BookingRequest): Promise<APIResponse> {
    return this.request.post(this.bookingEndpoint, {
      data: newBookingData,
    });
  }

  async putRequestToBookingByIdEndpoint(bookingId: number, updatedBookingData: BookingRequest, authToken: string): Promise<APIResponse> {
    return this.request.put(this.bookingByIdEndpoint(bookingId), {
      headers: {
        Cookie: `token=${authToken}`,
      },
      data: updatedBookingData,
    });
  }

  async patchRequestToBookingByIdEndpoint(bookingId: number, updatedBookingData: Partial<BookingRequest>, authToken: string): Promise<APIResponse> {
    return this.request.patch(this.bookingByIdEndpoint(bookingId), {
      headers: {
        Cookie: `token=${authToken}`,
      },
      data: updatedBookingData,
    });
  }

  async getRequestToBookingByIdEndpoint(bookingId: number): Promise<APIResponse> {
    return this.request.get(this.bookingByIdEndpoint(bookingId));
  }

  async getRequestToBookingEndpoint(): Promise<APIResponse> {
    return this.request.get(this.bookingEndpoint);
  }

  async deleteRequestToBookingByIdEndpoint(bookingId: number, authToken: string): Promise<APIResponse> {
    return this.request.delete(this.bookingByIdEndpoint(bookingId), {
      headers: {
        Cookie: `token=${authToken}`,
      },
    });
  }
}
