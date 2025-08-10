import { NextFunction, Request, Response } from "express";

import {
  cancelBookingByIdService,
  createBookingservice,
  getBookingByIdService,
  getMyBookingsService,
} from "../services/booking.service.js";

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBooking = await createBookingservice(req.user!.id, req.body);
    return res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    next(err);
  }
};

export const getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings = await getMyBookingsService(req.user!.id);
    return res.status(200).json({ message: "Bookings retrieved successfully", bookings });
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await getBookingByIdService(req.params.id, req.user!.id);
    return res.status(200).json({ message: "Booking retrieved successfully", booking });
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cancelBookingByIdService(req.params.id, req.user!.id);
    return res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (err) {
    next(err);
  }
};
