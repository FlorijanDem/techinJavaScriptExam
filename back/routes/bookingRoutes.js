const bookingRouter = require("express").Router();
const { bookExcursion, getAllBookings, comfirmBooking, unbookExcursion, getMyBookings, deleteBooking, completeBooking, editBookingDate } = require("../controllers/bookingController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

bookingRouter.route("/:id/book").post(protect, bookExcursion);

// Get all bookings for admin
// This route is protected and only accessible by admin users
bookingRouter.route("/").get(protect, isAdmin, getAllBookings);

bookingRouter.route("/my").get(protect, getMyBookings);

bookingRouter.route("/:id/confirm").patch(protect, isAdmin, comfirmBooking);

bookingRouter.route("/:id/unbook").delete(protect, unbookExcursion);

bookingRouter.route("/:id").delete(protect, deleteBooking);

bookingRouter.route("/:id/complete").patch(protect, isAdmin, completeBooking);

bookingRouter.route("/edit/date/:id").patch(protect, editBookingDate)

module.exports = bookingRouter;
