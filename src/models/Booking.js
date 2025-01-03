import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: String,
  contact: String,
  date: Date,
  time: String,
  guests: Number,
});
export const Booking = mongoose.model("Booking", BookingSchema);
