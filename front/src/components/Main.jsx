import { Route, Routes } from "react-router";
import UserForm from "./UserForm";
import Logout from "./Logout";
import Home from "./Home";
import AdminBookings from "./AdminBookings";
import UserBookings from "./UserBookings";

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserForm action="login" />} />
        <Route path="/signup" element={<UserForm action="signup" />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/user/bookings" element={<UserBookings />} />
      </Routes>
    </main>
  );
};

export default Main;
