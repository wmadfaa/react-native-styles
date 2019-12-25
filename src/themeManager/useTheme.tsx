import React from "react";
import { ThemeContext } from "./themeContext";
import { Theme } from "./createTheme";

const useTheme = () => React.useContext<Theme>(ThemeContext);

export default useTheme;
