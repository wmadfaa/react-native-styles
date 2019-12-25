import React from "react";
import { ThemeOptions, Theme } from "./createTheme";
export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeOptions;
}
export declare const initialTheme: Theme;
export declare const ThemeContext: React.Context<Theme>;
declare const ThemeProvider: React.FC<ThemeProviderProps>;
export default ThemeProvider;
