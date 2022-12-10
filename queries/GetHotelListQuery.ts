import {Currency} from '../components/HotelCard';

export type HotelDetails = {
  id: number;
  name: string;
  location: HotelLocation;
  stars: number;
  checkIn: CheckIn;
  checkOut: CheckOut;
  contact: Contact;
  gallery: string[];
  userRating: number;
  price: number;
  currency: Currency;
};

type HotelLocation = {
  address: string;
  city: string;
  latitude: number;
  longitude: number;
};

type CheckIn = {
  from: string;
  to: string;
};

type CheckOut = {
  from: string;
  to: string;
};

type Contact = {
  phoneNumber: string;
  email: string;
};
