import React from "react";
import themeContext from "./theme.context";
import themeManager from "./theme.manager";

const Context = themeContext.context;

const withTheme = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & { theme: themeManager.Theme }> => props => {
  return (
    <Context.Consumer>
      {value => <Component {...props} theme={value} />}
    </Context.Consumer>
  );
};

export default withTheme;
