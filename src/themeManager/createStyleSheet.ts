import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from "react-native";
import { Theme } from "./createTheme";

import useTheme from "./useTheme";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

type StylesObject<P, T> =
  | T
  | NamedStyles<T>
  | ((theme: Theme, props: P) => T | NamedStyles<T>);

const createStyleSheet = <
  P extends {},
  T extends NamedStyles<T> | NamedStyles<any>
>(
  styles: StylesObject<P, T>
) => {
  const get_Styles = (theme: Theme, props: P): T => {
    if (styles instanceof Function) {
      return StyleSheet.create<T>(styles(theme, props));
    }
    return StyleSheet.create<T>(styles);
  };

  const useStyles = (props: P): T => {
    const theme = useTheme();
    return get_Styles(theme, props);
  };

  return useStyles;
};

export default createStyleSheet;
