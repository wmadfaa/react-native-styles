import React from "react";
import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from "react-native";
import themeManager from "./theme.manager";
import useTheme from "./useTheme";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type StylesObject<P, T> =
  | T
  | NamedStyles<T>
  | ((theme: themeManager.Theme, props: P) => T | NamedStyles<T>);

const createStyleSheet = <
  P extends {},
  T extends NamedStyles<T> | NamedStyles<any>
>(
  styles: StylesObject<P, T>
) => {
  const get_Styles = (theme: themeManager.Theme, props: P) => {
    if (styles instanceof Function) {
      return StyleSheet.create<T>(styles(theme, props));
    }
    return StyleSheet.create<T>(styles);
  };

  const useStyles = (props: P) => {
    const theme = useTheme();
    return get_Styles(theme, props);
  };

  const withStyles = (styles_props: P) => <CP extends object>(
    Component: React.ComponentType<CP>
  ): React.FC<CP & { styles: T }> => props => {
    const theme = useTheme();
    return <Component {...props} styles={get_Styles(theme, styles_props)} />;
  };

  return { useStyles, withStyles };
};

export default createStyleSheet;
