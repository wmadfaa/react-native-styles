import React from "react";
import themeManager from "./theme.manager";
declare namespace themeContext {
    interface providerProps {
        children: React.ReactNode;
        theme?: themeManager.Options;
    }
    const initialTheme: themeManager.Theme;
    const context: React.Context<themeManager.Theme>;
    const provider: React.FC<providerProps>;
}
export default themeContext;
