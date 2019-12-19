import React from "react";
import themeManager from "./theme.manager";
declare const withTheme: <P extends object>(Component: React.ComponentType<P>) => React.FC<P & {
    theme: themeManager.Theme;
}>;
export default withTheme;
