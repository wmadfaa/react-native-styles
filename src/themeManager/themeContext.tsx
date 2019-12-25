import React from "react";
import createTheme, { ThemeOptions, Theme } from "./createTheme";

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeOptions;
}

export const initialTheme = createTheme({});

export const ThemeContext = React.createContext<Theme>(initialTheme);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  const themeValue = theme ? createTheme(theme) : initialTheme;
  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
