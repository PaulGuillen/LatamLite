import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { RegisterPage } from "../../features/auth/pages/RegisterPage";
import { DashboardLayout } from "../../features/dashboard/components/DashboardLayout";
import { SettingsPage } from "../../features/dashboard/pages/SettingsPage";
import { ShipmentsPage } from "../../features/dashboard/pages/ShipmentsPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="settings" replace />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="shipments" element={<ShipmentsPage />} />
      </Route>
    </Routes>
  );
};