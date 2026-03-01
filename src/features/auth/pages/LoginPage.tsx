import { AuthCard } from "../components/AuthCard";
import { ThemeToggle } from "../../../shared/components/ThemeToggle";
import "./LoginPage.css";
import { useState } from "react";
import { loginUser } from "../services/authService";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const cleanEmail = email.trim();

      console.log("EMAIL:", cleanEmail);
      console.log("PASSWORD:", password);

      await loginUser(cleanEmail, password);

      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error(error);
      alert(error.code);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="top-right">
        <ThemeToggle />
      </div>

      <div className="login-left">
        <div className="image-box" />

        <div className="left-text">
          <h1>Potencia tu flujo de trabajo.</h1>
          <p>
            La plataforma todo en uno para gestionar tus proyectos con
            eficiencia y elegancia.
          </p>
        </div>
      </div>

      <div className="login-right">
        <AuthCard title="Bienvenido de nuevo">
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary" onClick={handleLogin}>
            Iniciar sesión →
          </button>

          <div className="auth-footer">
            ¿No tienes una cuenta? <a href="/register">Registrarse</a>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};