import { NavLink } from "react-router";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

const AdminHeader = () => {
  const { user } = useContext(UserContext);
  const [navOpen, setNavOpen] = useState(false);

  const toggleNavCollapse = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="header admin-header">
      <div className="header-content">
        <h1 className="title">
          Beauty salon
        </h1>
        <img className="logo" src="/src/assets/salon.png" alt="Salon icon" />        <nav className={`${navOpen ? "visible p-4" : "invisible"}`}>
          <NavLink to="/" onClick={() => setNavOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/admin/bookings" onClick={() => setNavOpen(false)}>
            Manage Bookings
          </NavLink>
          <NavLink to="/user/bookings" onClick={() => setNavOpen(false)}>
            My Bookings
          </NavLink>
          {user && (
            <NavLink to="/logout" onClick={() => setNavOpen(false)}>
              Logout
            </NavLink>
          )}
        </nav>
        <button onClick={toggleNavCollapse}>
          <hr />
          <hr />
          <hr />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
