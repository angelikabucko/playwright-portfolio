import { UserInformation } from '../types/user.type';

export interface Booking {
  bookingid: number;
  booking: {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
      checkin: string;
      checkout: string;
    };
    additionalneeds: string;
  };
}
