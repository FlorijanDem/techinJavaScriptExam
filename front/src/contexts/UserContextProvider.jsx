import axios from "axios";
import { useEffect, useState } from "react";
// import { useErrorBoundary } from "react-error-boundary";
import UserContext from "./UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });

        setUser(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {loading && <h1>Loading...</h1>}
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
