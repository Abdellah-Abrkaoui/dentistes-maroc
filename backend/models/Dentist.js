import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DentistSchema = new Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewsCount: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    website: { type: String, required: true },
    googleMapsLink: { type: String, required: true },
    openingHours: { type: String, required: true },
    photoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Dentist", DentistSchema);
