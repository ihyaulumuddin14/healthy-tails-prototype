import { Router } from "express";

import {
  CreateBookingRequestSchmea,
  GetBookingsByDateQuerySchema,
  UpdateBookingStatusRequestSchema,
} from "../domain/dto/booking.dto.js";
import { IdParamSchema } from "../domain/dto/common.dto.js";

import { adminOnly } from "../middlewares/admin-only.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateParams, validateQuery, validateRequest } from "../middlewares/validate-request.js";

import {
  cancelBooking,
  createBooking,
  getBookingById,
  getBookingsByDate,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/booking.controller.js";

const router = Router();

router.post("/", authenticate, validateRequest(CreateBookingRequestSchmea), createBooking);
router.get("/my-bookings", authenticate, getMyBookings);
router.get("/:id", authenticate, validateParams(IdParamSchema), getBookingById);
router.patch("/:id/cancel", authenticate, validateParams(IdParamSchema), cancelBooking);
router.get("/", authenticate, adminOnly, validateQuery(GetBookingsByDateQuerySchema), getBookingsByDate);
router.patch(
  "/:id/status",
  authenticate,
  adminOnly,
  validateParams(IdParamSchema),
  validateRequest(UpdateBookingStatusRequestSchema),
  updateBookingStatus
);

export default router;
