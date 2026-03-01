import { NavLink } from "react-router-dom";
import "../styles/sidebard.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div>
        {/* Header */}
        <div className="sidebar-top">
          <div className="logo-circle">📦</div>
          <div>
            <h2>Mi Panel</h2>
            <span>Emprendedor</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            ⚙️ Configurar
          </NavLink>

          <NavLink
            to="/dashboard/shipments"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            🚚 Envíos
          </NavLink>
        </nav>

        {/* Resumen Card */}
        <div className="summary-card">
          <span>RESUMEN DE ENVÍOS</span>
          <div className="summary-row">
            <p>SHALOM</p>
            <div className="badge">3</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="phone-box">📞 921965254</div>

        <button className="plan-btn">PLAN PRO (PRUEBA)</button>

        <button className="logout-btn">Cerrar Sesión</button>

        <small>POWERED BY LATAM5S</small>
      </div>
    </aside>
  );
};
