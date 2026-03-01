import { useEffect, useState } from "react";

export const useTheme = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  return { dark, setDark };
};