import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { RegisterPage } from "../../features/auth/pages/RegisterPage";
import { DashboardLayout } from "../../features/dashboard/components/DashboardLayout";
import { SettingsPage } from "../../features/dashboard/pages/SettingsPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ShipmentPage } from "../../features/shipments/pages/ShipmentPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="settings" replace />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="shipments" element={<ShipmentPage />} />
      </Route>

      <Route
        path="/"
        element={
          localStorage.getItem("auth") === "true" ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage />
          )
        }
      />
    </Routes>
  );
};
