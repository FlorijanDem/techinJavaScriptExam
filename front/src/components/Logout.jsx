import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useErrorBoundary } from "react-error-boundary";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { showBoundary } = useErrorBoundary();

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      setUser(null);

      toast.success("Logout successful");
      navigate("/");
    } catch (err) {
      // const error = handleError(err);
      showBoundary(err);
    }
  };
  return (
    <div className="logout">
      <p>Are you sure, you want to logout?</p>
      <div className="logout-buttons">
        <button onClick={logout}>Yes</button>
        <button onClick={() => navigate("/")}>No</button>
      </div>
    </div>
  );
};

export default Logout;
