import React from "react";
import themeManager from "./theme.manager";

namespace themeContext {
  export interface providerProps {
    children: React.ReactNode;
    theme?: themeManager.Options;
  }

  export const initialTheme = themeManager.create({});

  export const context = React.createContext<themeManager.Theme>(initialTheme);

  export const provider: React.FC<providerProps> = ({ children, theme }) => {
    const themeValue = theme
      ? themeManager.create(theme)
      : themeManager.create({});
    return <context.Provider value={themeValue}>{children}</context.Provider>;
  };
}

export default themeContext;
