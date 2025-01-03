import { Router } from "express";
import { getBookings, addBookings } from "../controllers/manage.controller.js";

const router = Router();

router.get("/bookings", getBookings);
router.post("/addBookings", addBookings);

export default router;
