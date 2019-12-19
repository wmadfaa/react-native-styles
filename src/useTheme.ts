import React from "react";
import themeContext from "./theme.context";
import themeManager from "./theme.manager";

const useTheme = () =>
  React.useContext<themeManager.Theme>(themeContext.context);

export default useTheme;
