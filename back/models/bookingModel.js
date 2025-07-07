const { sql } = require("../dbConnection.js");

exports.bookExcursion = async (excursionId, userId, date, quantity) => {
  excursionId = excursionId ?? 1;
  userId = userId ?? 1;
  date = date ?? '1970-01-01';
  quantity = quantity ?? 1;

  const booking = await sql.begin(async () => {
    const [excursion] = await sql`
      SELECT * FROM excursions WHERE id = ${excursionId}
    `;
    if (!excursion) return null;

    // const [dateRow] = await sql`
    //   SELECT dates.id FROM dates
    //   JOIN excursions_dates ON dates.id = excursions_dates.date_id
    //   WHERE excursions_dates.excursion_id = ${excursionId} AND dates.date = ${date}
    // `;
    // if (!dateRow) return null;

    const totalPrice = Number(quantity) * Number(excursion.price);

    const [booking] = await sql`
      INSERT INTO bookings (excursion_id, user_id, date, quantity, total_price)
      VALUES (${excursionId}, ${userId}, ${date}, ${quantity}, ${totalPrice})
      RETURNING *
    `;
    return booking;
  });
  return booking;
};

exports.getAllBookings = async (userId) => {
  const bookings = await sql`
    SELECT *
    FROM bookings
  `;
  return bookings;
};

exports.getBookingsByUserId = async (userId) => {
  const bookings = await sql`
    SELECT *
    FROM bookings
    WHERE user_id = ${userId}
  `;
  return bookings;
};

exports.comfirmBooking = async (bookingId) => {
  const [booking] = await sql`
    UPDATE bookings
    SET comfirmed = TRUE
    WHERE id = ${bookingId}
    RETURNING *
  `;
  return booking;
};

exports.unbookExcursion = async (bookingId) => {
  const [booking] = await sql`
    DELETE FROM bookings
    WHERE id = ${bookingId}
    RETURNING *
  `;
  return booking;
};

exports.deleteBooking = async (bookingId) => {
  const [booking] = await sql`
    DELETE FROM bookings
    WHERE id = ${bookingId}
    RETURNING *
  `;
  return booking;
};
exports.completeBooking = async (bookingId) => {
  const [booking] = await sql`
    UPDATE bookings
    SET completed = TRUE
    WHERE id = ${bookingId}
    RETURNING *
  `;
  return booking;
};
exports.editBookingDate = async (bookingId, date) => {
  const [booking] = await sql`
    UPDATE bookings
    SET date=${date}
    WHERE id =${bookingId}
    RETURNING *
  `;
  return booking;
}