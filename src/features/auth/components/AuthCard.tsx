import type { ReactNode } from "react";
import "./AuthCard.css";

interface AuthCardProps {
  title: string;
  children: ReactNode;
}

export const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <div className="auth-card">
      <h2>{title}</h2>
      {children}
    </div>
  );
};