import "../styles/settingspage.css";

export const SettingsPage = () => {
  return (
    <div className="settings-wrapper">

      {/* HEADER */}
      <div className="settings-header">
        <h1>Configuración</h1>
        <button className="primary">💾 Guardar</button>
      </div>

      <div className="settings-grid">

        {/* IZQUIERDA */}
        <div className="left-column">

          {/* DATOS PUBLICOS */}
          <div className="card">
            <h3>DATOS PÚBLICOS</h3>

            <label>Nombre emprendimiento</label>
            <input defaultValue="Veceff.es" />

            <label>Whatsapp emprendimiento</label>
            <input defaultValue="+51 997041335" />
            <small>Solo números, debe empezar con 9.</small>
          </div>

          {/* SEGURIDAD */}
          <div className="card">
            <h3>🔒 SEGURIDAD</h3>

            <label>Nueva contraseña</label>

            <div className="password-row">
              <input type="password" placeholder="••••" />
              <button className="update-btn">Actualizar</button>
            </div>
          </div>

        </div>

        {/* DERECHA */}
        <div className="card big-card">
          <h3>LOGÍSTICA *</h3>

          <label>Métodos de envío/retiro *</label>

          <div className="checkbox-grid">
            <div className="check-item active">Shalom</div>
            <div className="check-item active">Olva Courier</div>
            <div className="check-item active">Marvisur</div>
            <div className="check-item">Dinsides</div>
            <div className="check-item active">Delivery</div>
            <div className="check-item">Retiro en tienda</div>
          </div>

          <label>Días de despacho *</label>

          <div className="days-row">
            <span className="day active">Lun</span>
            <span className="day active">Mar</span>
            <span className="day active">Mié</span>
            <span className="day active">Jue</span>
            <span className="day active">Vie</span>
            <span className="day">Sáb</span>
            <span className="day">Dom</span>
          </div>

          <div className="row-two">
            <div>
              <label>Hora corte *</label>
              <input defaultValue="06:00 p. m." />
            </div>

            <div>
              <label>Anticipación (días) *</label>
              <input defaultValue="0" />
            </div>
          </div>

          <small>
            * La "Anticipación" define cuántos días mínimos de margen necesitas
            para preparar el pedido antes del día de envío.
          </small>
        </div>

      </div>
    </div>
  );
};