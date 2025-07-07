import { useContext, useEffect, useState } from "react";
import ExcursionCard from "./ExcursionCard";
import axios from "axios";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const ExcursionList = () => {
  const [excursions, setExcursions] = useState([]);
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    photo_url: "",
    duration: 1,
    price: 0,
    category_id: 1,
    dates: [new Date().toISOString().split("T")[0]],
  });
  const [editModal, setEditModal] = useState({ open: false, excursion: null });
  const [bookModal, setBookModal] = useState({ open: false, excursion: null });
  const [bookingForm, setBookingForm] = useState({ date: '', time: '', quantity: 1 });

  const [category, setCategory] = useState(false);
  const [allCategories, setAllCategories] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${API_URL}/excursions/categories`, {
          withCredentials: true,
        })
        console.log(response);
        setAllCategories(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (category === false) {

      const fetchData = async () => {
        try {
          const { data: response } = await axios.get(`${API_URL}/excursions`, {
            withCredentials: true,
          });

          console.log(response);

          setExcursions(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    } else {

      const fetchData = async () => {
        try {
          const { data: response } = await axios.get(`${API_URL}/filterByCategory/${category}`, {
            withCredentials: true,
          });

          console.log(response);

          setExcursions(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }

  }, []);

  const handleAddExcursion = async (excursionData) => {
    try {
      const { data: response } = await axios.post(
        `${API_URL}/excursions`,
        excursionData,
        { withCredentials: true }
      );
      setExcursions((prev) => [...prev, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteExcursion = async (id) => {
    try {
      await axios.delete(`${API_URL}/excursions/${id}`, { withCredentials: true });
      setExcursions((prev) => prev.filter((exc) => exc.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditExcursion = async (id, updatedData) => {
    try {
      const { data: response } = await axios.patch(
        `${API_URL}/excursions/${id}`,
        updatedData,
        { withCredentials: true }
      );
      setExcursions((prev) =>
        prev.map((exc) => (exc.id === id ? response.data : exc))
      );
      setEditModal({ open: false, excursion: null });
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (excursion) => {
    setEditModal({ open: true, excursion });
  };

  const openBookModal = (excursion) => {
    setBookModal({ open: true, excursion });
    setBookingForm({ date: excursion.dates?.[0] || '', time: '', quantity: 1 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setForm((prev) => ({ ...prev, dates: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddExcursion(form);
    setShowModal(false);
    setForm({
      title: "",
      photo_url: "",
      duration: 1,
      price: 0,
      category_id: 1,
      dates: [new Date().toISOString().split("T")[0]],
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditModal((prev) => ({
      ...prev,
      excursion: { ...prev.excursion, [name]: value },
    }));
  };

  const handleEditDateChange = (e) => {
    setEditModal((prev) => ({
      ...prev,
      excursion: { ...prev.excursion, dates: [e.target.value] },
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleEditExcursion(editModal.excursion.id, editModal.excursion);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.date || !bookingForm.quantity) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post(
        `${API_URL}/bookings/${bookModal.excursion.id}/book`,
        bookingForm,
        { withCredentials: true }
      );
      alert("Procedure booked successfully!");
      setBookModal({ open: false, excursion: null });
    } catch (error) {
      console.log(error);
      alert("Failed to book excursion.");
    }
  };

  return (
    <div>
      {user?.role === "admin" && (
        <>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          >
            Add Procedure
          </button>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-96 z-60 relative"
              >
                <h2 className="text-xl mb-4">Add Procedure</h2>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="block w-full mb-2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="photo_url"
                  value={form.photo_url}
                  onChange={handleChange}
                  placeholder="Photo URL"
                  className="block w-full mb-2 p-2 border rounded"
                />
                {/* <input
                  type="number"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="Duration (hours)"
                  className="block w-full mb-2 p-2 border rounded"
                  min="1"
                  required
                /> */}
                {/* <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="block w-full mb-2 p-2 border rounded"
                  min="0"
                  required
                /> */}
                <input
                  type="number"
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  placeholder="Category ID"
                  className="block w-full mb-2 p-2 border rounded"
                  min="1"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={form.dates[0]}
                  onChange={handleDateChange}
                  className="block w-full mb-4 p-2 border rounded"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
      {excursions.map((excursion) => (
        <div key={excursion.id} className="relative">
          <ExcursionCard excursion={excursion} />
          <div className="absolute top-2 right-2 flex gap-2">
            {user?.role === "admin" && (
              <>
                <button
                  onClick={() => handleDeleteExcursion(excursion.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => openEditModal(excursion)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </>
            )}
            {user && (
              <button
                onClick={() => openBookModal(excursion)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Book
              </button>
            )}
          </div>
        </div>
      ))}
      {editModal.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow-md w-96 z-60 relative"
          >
            <h2 className="text-xl mb-4">Edit Procedure</h2>
            <input
              type="text"
              name="title"
              value={editModal.excursion.title}
              onChange={handleEditChange}
              placeholder="Title"
              className="block w-full mb-2 p-2 border rounded"
              required
            />
            <input
              type="text"
              name="photo_url"
              value={editModal.excursion.photo_url}
              onChange={handleEditChange}
              placeholder="Photo URL"
              className="block w-full mb-2 p-2 border rounded"
            />
            {/* <input
              type="number"
              name="duration"
              value={editModal.excursion.duration}
              onChange={handleEditChange}
              placeholder="Duration (hours)"
              className="block w-full mb-2 p-2 border rounded"
              min="1"
              required
            /> */}
            {/* <input
              type="number"
              name="price"
              value={editModal.excursion.price}
              onChange={handleEditChange}
              placeholder="Price"
              className="block w-full mb-2 p-2 border rounded"
              min="0"
              required
            /> */}
            <input
              type="number"
              name="category_id"
              value={editModal.excursion.category_id}
              onChange={handleEditChange}
              placeholder="Category ID"
              className="block w-full mb-2 p-2 border rounded"
              min="1"
              required
            />
            <input
              type="date"
              name="date"
              value={editModal.excursion.dates?.[0] || ""}
              onChange={handleEditDateChange}
              className="block w-full mb-4 p-2 border rounded"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditModal({ open: false, excursion: null })}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      {bookModal.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <form
            onSubmit={handleBookSubmit}
            className="bg-white p-6 rounded shadow-md w-96 z-60 relative"
          >
            <h2 className="text-xl mb-4">Book Procedure</h2>
            <label className="block mb-2">Time</label>
            <input
              type="datetime-local"
              name="date"
              value={bookingForm.date}
              onChange={handleBookingChange}
              className="block w-full mb-2 p-2 border rounded"
              required
            />
            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={bookingForm.quantity}
              onChange={handleBookingChange}
              min="1"
              className="block w-full mb-4 p-2 border rounded"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setBookModal({ open: false, excursion: null })}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Book
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExcursionList;
