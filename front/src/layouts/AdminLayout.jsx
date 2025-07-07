import AdminHeader from "../components/AdminHeader.jsx";
import Main from "../components/Main";
import Footer from "../components/Footer";

export default function AdminLayout({ children }) {
  return (
    <div className="app-container admin-layout">
      <AdminHeader />
      {/* <nav className="admin-nav">Admin Panel</nav> */}
      <Main />
      {children}
      <Footer />
    </div>
  );
}
