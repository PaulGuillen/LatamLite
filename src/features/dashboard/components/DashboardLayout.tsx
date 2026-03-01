import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import "../styles/dashboard.css";

export const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};