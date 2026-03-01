import { logoutUser } from "../../auth/services/authService";
import { ThemeToggle } from "../../../shared/components/ThemeToggle";

export const Header = () => {
  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/";
  };

  return (
    <div className="header">
      <ThemeToggle />
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};