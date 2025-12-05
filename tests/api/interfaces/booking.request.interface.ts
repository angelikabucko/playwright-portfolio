import { UserInformation } from '../types/user.type';

export interface BookingRequest extends UserInformation {
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}
