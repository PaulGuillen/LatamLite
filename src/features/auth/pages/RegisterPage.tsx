import { useState } from "react";
import { AuthCard } from "../components/AuthCard";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Register:", email, password);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <AuthCard title="Registro">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 10 }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 10 }}
        />

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: 10,
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: 8
          }}
        >
          Crear cuenta
        </button>

        <p style={{ textAlign: "center", marginTop: 12 }}>
          ¿Ya tienes cuenta? <Link to="/">Iniciar sesión</Link>
        </p>
      </AuthCard>
    </div>
  );
};