import { logoutUser } from "../../auth/services/authService";
import { ThemeToggle } from "../../../shared/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

export const Header = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div className="header">
      <ThemeToggle />
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};