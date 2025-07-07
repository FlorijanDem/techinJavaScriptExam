import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { Rating } from 'react-simple-star-rating'

const API_URL = import.meta.env.VITE_API_URL;

const UserBookings = () => {
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [rating, setRating] = useState(0)

  // Catch Rating value
  const handleRating = async (rate) => {
    setRating(rate)
    try {
      const {data: response} = await axios.post(`${API_URL}/reviews/`, {
        withCredentials: true,
        data: {
          
        }
      })
    } catch (error) {
      setError("Failed to write rating")
    }

    // other logic
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)


  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: response } = await axios.get(`${API_URL}/bookings/my`, {
          withCredentials: true,
        });
        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch your bookings");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`${API_URL}/bookings/${bookingId}`, {
        withCredentials: true,
      });
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      setError("Failed to delete booking");
    }
  };

  const handleEditDate = async (bookingId, event) => {
    // const event = new Date("05 October 2022 14:48 UTC");
    // moveDateTo = event.toString();
    try {
      await axios.patch(`${API_URL}/bookings/edit/date/${bookingId}`, {
        withCredentials: true,
        data: {
          date: event
        }
      });
    } catch (err) {
      setError("Failed to edit date")
    }
  }
  if (!user) return null;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">My Bookings</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && bookings.length === 0 && <p>No bookings found.</p>}
      {!loading && bookings.length > 0 && (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Booking ID</th>
              <th className="border px-2 py-1">Excursion ID</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td className="border px-2 py-1">{b.id}</td>
                <td className="border px-2 py-1">{b.excursion_id}</td>
                <td className="border px-2 py-1">{b.date}</td>
                <td className="border px-2 py-1">{b.comfirmed ? "comfirmed" : undefined}{b.comfirmed && b.completed ? " and " : undefined}{b.completed ? "completed" : undefined}</td>
                <td className="border px-2 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => setNewDate(true)}
                  >
                    Edit date
                  </button>
                  {newDate && (
                    <form onSubmit={handleEditDate(b.id, event)}>
                      <input type="date" name="date" value={event} required />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </td>
                <td className="border px-2 py-1">
                  <Rating
                    onClick={handleRating}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onPointerMove={onPointerMove}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserBookings;
