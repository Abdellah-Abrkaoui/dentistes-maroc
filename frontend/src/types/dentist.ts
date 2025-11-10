export interface Dentist {
  _id?: string;
  name: string;
  specialty: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  latitude: number;
  longitude: number;
  website?: string;
  googleMapsLink?: string;
  openingHours: string;
  photoUrl?: string;
}
