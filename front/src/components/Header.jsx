// import axios from "axios";
import { NavLink } from "react-router";
import { useContext, useState } from "react";
// import { useErrorBoundary } from "react-error-boundary";
import UserContext from "../contexts/UserContext";
// import toast from "react-hot-toast";
// import handleError from "../utils/handleError";

// const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const { user } = useContext(UserContext);
  const [navOpen, setNavOpen] = useState(false);
  // const { showBoundary } = useErrorBoundary();
  // const navigate = useNavigate();

  const toggleNavCollapse = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">
          Beauty salon
        </h1>
        <img className="logo" src="/src/assets/salon.png" alt="Salon icon" />
        <nav className={`${navOpen ? "visible p-4" : "invisible"}`}>
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

export default Header;
