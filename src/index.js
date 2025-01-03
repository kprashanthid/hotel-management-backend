import express from "express";
import cors from "cors";
import { Booking } from "./models/Booking.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
  })
);
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    const bookedTimes = bookings.map((booking) => booking.time);
    const availableTimes = [
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ];
    const availableSlots = availableTimes.filter(
      (time) => !bookedTimes.includes(time)
    );
    res.json({ bookings, availableSlots });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.post("/api/bookings", async (req, res) => {
  const { _id, action, ...bookingData } = req.body;

  try {
    if (action === "delete" && _id) {
      await Booking.findByIdAndDelete(_id);
      return res.status(200).send("Booking Deleted");
    }

    const newBooking = new Booking(bookingData);
    await newBooking.save();
    res.status(201).send("Booking Created");
  } catch (error) {
    console.error("Error while processing booking:", error);
    res.status(500).json({ error: "Failed to process booking" });
  }
});

app.listen(PORT, () => {
  console.log("Server connected to", PORT);
  connectDB();
});
