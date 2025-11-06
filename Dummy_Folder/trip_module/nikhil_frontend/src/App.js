
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import ContactPage from "./pages/ContactPage";
import FeedbackForm from "./pages/FeedbackForm";
import AdminDashboard from "./pages/AdminDashboard";
import UsersList from "./pages/UsersList";
import AdminTripsList from "./pages/AdminTripsList";
import FeedbackListAdmin from "./pages/FeedbackListAdmin";
import ContactsListAdmin from "./pages/ContactsListAdmin";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="container">
                <h2>Welcome to Travel Planner</h2>
              </div>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute roles={["user"]}>
                <FeedbackForm />
              </ProtectedRoute>
            }
          />

          {/* Admin area */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/trips"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminTripsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/feedback"
            element={
              <ProtectedRoute roles={["admin"]}>
                <FeedbackListAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contacts"
            element={
              <ProtectedRoute roles={["admin"]}>
                <ContactsListAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
