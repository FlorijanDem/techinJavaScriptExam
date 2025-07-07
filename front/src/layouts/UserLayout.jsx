import UserHeader from "../components/UserHeader.jsx";
import Main from "../components/Main";
import Footer from "../components/Footer";

export default function UserLayout({ children }) {
  return (
    <div className="app-container">
      <UserHeader />
      <Main />
      {children}
      <Footer />
    </div>
  );
}
