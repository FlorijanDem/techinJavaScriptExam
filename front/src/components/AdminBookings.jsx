import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const AdminBookings = () => {
    console.log(API_URL)
  const { user } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/bookings`, {
          withCredentials: true,
        });
        console.log("Bookings response:", response);
        // If comfirmed is true, set status as confirmed
        setBookings(
          response.data.map((b) => {
            let status = "pending";
            if (b.status === "completed" || b.completed === true) {
              status = "completed";
            } else if (b.comfirmed === true || b.status === "confirmed") {
              status = "confirmed";
            }
            return { ...b, status };
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === "admin") fetchBookings();
  }, [user]);

  const handleConfirm = async (bookingId) => {
    try {
      await axios.patch(
        `${API_URL}/bookings/${bookingId}/confirm`,
        {},
        { withCredentials: true }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "confirmed" } : b
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      await axios.patch(
        `${API_URL}/bookings/${bookingId}/complete`,
        {},
        { withCredentials: true }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "completed" } : b
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!user || user.role !== "admin") return null;
  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">All Bookings</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Booking ID</th>
            <th className="border px-2 py-1">User ID</th>
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
              <td className="border px-2 py-1">{b.user_id}</td>
              <td className="border px-2 py-1">{b.excursion_id}</td>
              <td className="border px-2 py-1">{b.date}</td>
              <td className="border px-2 py-1">{b.status || "pending"}</td>
              <td className="border px-2 py-1">
                {b.status === "pending" && (
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleConfirm(b.id)}
                  >
                    Confirm
                  </button>
                )}
                {b.status === "confirmed" && (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => handleComplete(b.id)}
                  >
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
