import { Router } from "express";

import { BookingIdParamSchema, CreateBookingRequestSchmea } from "../domain/dto/booking.dto.js";

import { authenticate } from "../middlewares/authenticate.js";
import { validateParams, validateRequest } from "../middlewares/validate-request.js";

import { cancelBooking, createBooking, getBookingById, getMyBookings } from "../controllers/booking.controller.js";

const router = Router();

router.post("/", authenticate, validateRequest(CreateBookingRequestSchmea), createBooking);
router.get("/my-bookings", authenticate, getMyBookings);
router.get("/:id", authenticate, validateParams(BookingIdParamSchema), getBookingById);
router.patch("/:id/cancel", authenticate, validateParams(BookingIdParamSchema), cancelBooking);

export default router;
