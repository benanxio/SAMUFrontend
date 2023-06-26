import { createContext, useEffect, useState } from "react";
import { themeOptions } from "./data-themes";

interface Indetifier {
  key?: string;
  isOpen?: boolean;
}

export const UIContext = createContext({} as any);
const UIProvider = ({ children }: any) => {
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0].value);
  function changeTheme(newTheme: any) {
    const linkElement = document.getElementById("theme-link");
    const themeCssPath = `http://localhost:3000/primereact/resources/themes/${newTheme}/theme.css`;

    if (linkElement) {
      linkElement.setAttribute("href", themeCssPath);
    } else {
      const newLinkElement = document.createElement("link");
      newLinkElement.setAttribute("rel", "stylesheet");
      newLinkElement.setAttribute("href", themeCssPath);
      newLinkElement.setAttribute("id", "theme-link");
      document.head.appendChild(newLinkElement);
     
    }
    if (newTheme.includes("light")) {
      const root = window.document.documentElement;
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      const root = window.document.documentElement;
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }
  useEffect(() => {
    changeTheme(selectedTheme); // Cambia al tema seleccionado cuando el componente se monta
  }, [selectedTheme]);

  const handleThemeChange = (e: any) => {
    const newTheme = e.value;
    setSelectedTheme(newTheme);
  };

  const [visibleWithoutModal, setVisibleWithoutModal] = useState<Indetifier>({
    key: "",
  });

  const values = {
    setVisibleWithoutModal,
    visibleWithoutModal,
    handleThemeChange,
    setSelectedTheme,
    selectedTheme,
    themeOptions,
    changeTheme,
  };
  return <UIContext.Provider value={values}>{children}</UIContext.Provider>;
};

export default UIProvider;
