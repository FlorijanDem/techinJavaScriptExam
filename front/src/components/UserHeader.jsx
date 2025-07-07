import { NavLink } from "react-router";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

const UserHeader = () => {
  const { user } = useContext(UserContext);
  const [navOpen, setNavOpen] = useState(false);

  const toggleNavCollapse = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">
          Baeuty salon
        </h1>
        <img className="logo" src="/src/assets/salon.png" alt="Salon icon" />        <nav className={`${navOpen ? "visible p-4" : "invisible"}`}>
          <NavLink to="/" onClick={() => setNavOpen(false)}>
            Home
          </NavLink>
          {!user && (
            <NavLink to="/login" onClick={() => setNavOpen(false)}>
              Login
            </NavLink>
          )}
          {!user && (
            <NavLink to="/signup" onClick={() => setNavOpen(false)}>
              Signup
            </NavLink>
          )}
          {user && (
            <NavLink to="/logout" onClick={() => setNavOpen(false)}>
              Logout
            </NavLink>
          )}
          {user && (
            <NavLink to="/user/bookings" onClick={() => setNavOpen(false)}>
              My Bookings
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

export default UserHeader;
