import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useContext } from "react";
import ErrorFallback from "./components/ErrorFallback";
import UserContextProvider from "./contexts/UserContextProvider.jsx";
import UserContext from "./contexts/UserContext.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserForm from "./components/UserForm.jsx";

function AppContent() {
  const { user } = useContext(UserContext) || {};
  const role = user?.role;
  console.log("User role:", user);
  const Layout = role === "admin" ? AdminLayout : UserLayout;
  if (user !== null) {
    return (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Layout>
          {/* Main, Header, Footer are handled in layouts */}
        </Layout>
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<h1>Loading...</h1>}>
        <UserForm action="login" />
      </Suspense>
    )
  }
}

function App() {
  return (
    <>
      <Toaster />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <UserContextProvider>
          <AppContent />
        </UserContextProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
