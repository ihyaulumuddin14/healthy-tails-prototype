import { NextFunction, Request, Response } from "express";

import { BookingResponse, GetBookingsByDateQuery } from "../domain/dto/booking.dto.js";

import {
  cancelBookingByIdService,
  createBookingservice,
  getBookingByIdService,
  getBookingsByDateService,
  getMyBookingsService,
  updateBookingStatusService,
} from "../services/booking.service.js";

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newBooking: BookingResponse = await createBookingservice(req.user!.id, req.body);
    return res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    next(err);
  }
};

export const getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookings: BookingResponse[] = await getMyBookingsService(req.user!.id);
    return res.status(200).json({ message: "Bookings retrieved successfully", bookings });
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking: BookingResponse = await getBookingByIdService(req.params.id, req.user!.id);
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

export const getBookingsByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.query as unknown as GetBookingsByDateQuery;
    const bookings: BookingResponse[] = await getBookingsByDateService(date);

    return res.status(200).json({ message: "Bookings for the date retrieved successfully", bookings });
  } catch (err) {
    next(err);
  }
};

export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedBooking: BookingResponse = await updateBookingStatusService(req.params.id, req.body);
    return res.status(200).json({ message: "Booking status updated successfully", booking: updatedBooking });
  } catch (err) {
    next(err);
  }
};
