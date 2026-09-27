import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Overtime from "./pages/Overtime";
import Users from "./pages/Users";

import "./styles.css";

export default function App() {
  const token = useSelector((s) => s.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />

                  <Route
                    path="/attendance"
                    element={<Attendance />}
                  />

                  <Route
                    path="/overtime"
                    element={<Overtime />}
                  />

                  {/* Admin Only */}
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute roles={["admin"]}>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}