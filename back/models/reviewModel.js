const { sql } = require('../dbConnection.js');

exports.createReview = async (review) => {
    const { userId, tourId, rating, comment } = review;

    const [newReview] = await sql`
    INSERT INTO reviews (user_id, tour_id, rating, comment)
    VALUES (${userId}, ${tourId}, ${rating}, ${comment})
    RETURNING id, user_id, tour_id, rating, comment
  `;

    return newReview;
};

exports.getAverageRating = async (tourId) => {
    const [result] = await sql`
    SELECT AVG(rating) AS average_rating
    FROM reviews
    WHERE tour_id = ${tourId}
  `;

    return result.average_rating || 0; // Return 0 if no reviews exist
};