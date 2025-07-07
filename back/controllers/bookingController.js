const { bookExcursion, getAllBookings, comfirmBooking, unbookExcursion, getBookingsByUserId, completeBooking, editBookingDate } = require("../models/bookingModel");
const AppError = require("../utils/appError");

exports.bookExcursion = async (req, res, next) => {
    console.log("Booking request received for excursion ID:", req.params.id);
    console.log("User ID from request:", req.user.id);
    console.log("Booking details:", req.body);
    try {
        const { date, quantity } = req.body;
        const booking = await bookExcursion(req.params.id, req.user.id, date, quantity);
        if (!booking) {
            throw new AppError("Booking failed", 500);
        }
        res.status(200).json({
            status: "success",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};

exports.getAllBookings = async (req, res, next) => {
    try {
        const bookings = await getAllBookings();
        if (!bookings) {
            throw new AppError("No bookings found", 404);
        }
        res.status(200).json({
            status: "success",
            data: bookings,
        });
    } catch (error) {
        next(error);
    }
};

exports.comfirmBooking = async (req, res, next) => {
    try {
        const bookingId = req.params.id;
        const booking = await comfirmBooking(bookingId);
        if (!booking) {
            throw new AppError("Booking confirmation failed", 500);
        }
        res.status(200).json({
            status: "success",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};

exports.unbookExcursion = async (req, res, next) => {
    try {
        const bookingId = req.params.id;
        const booking = await unbookExcursion(bookingId);
        if (!booking) {
            throw new AppError("Unbooking failed", 500);
        }
        res.status(200).json({
            status: "success",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};

exports.getMyBookings = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const bookings = await getBookingsByUserId(userId);
        if (!bookings) {
            throw new AppError("No bookings found for this user", 404);
        }
        res.status(200).json({
            status: "success",
            data: bookings,
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteBooking = async (req, res, next) => {
    try {
        const bookingId = req.params.id;
        const booking = await unbookExcursion(bookingId);
        if (!booking) {
            throw new AppError("Booking deletion failed", 500);
        }
        res.status(200).json({
            status: "success",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
}

exports.completeBooking = async (req, res, next) => {
    try {
        const bookingId = req.params.id;
        const booking = await completeBooking(bookingId);
        if (!booking) {
            throw new AppError("Booking completion failed", 500);
        }
        res.status(200).json({
            status: "success",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
}

exports.editBookingDate = async (req, res, next) => {
    try {
        const bookingId = req.params.id;
        const date = req.body.data.date;
        const booking = await editBookingDate(bookingId, date);

        res.status(200).json({
            status: "success",
            data: booking
        })
    } catch (error) {
        next (error);
    }
}