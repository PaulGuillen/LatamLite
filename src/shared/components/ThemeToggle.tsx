import { useTheme } from "../hooks/useThemes";


export const ThemeToggle = () => {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "none",
        cursor: "pointer"
      }}
    >
      {dark ? "☀ Modo Día" : "🌙 Modo Noche"}
    </button>
  );
};