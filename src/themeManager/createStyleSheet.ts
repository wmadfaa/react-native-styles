import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from "react-native";
import { Theme } from "./createTheme";

import useTheme from "./useTheme";
import deepmerge from "deepmerge";

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
  const create_Styles = (
    stylesObject: StylesObject<P, T>,
    theme: Theme,
    props: P
  ): T => {
    if (stylesObject instanceof Function) {
      return StyleSheet.create<T>(stylesObject(theme, props));
    }
    return StyleSheet.create<T>(stylesObject);
  };

  const useStyles = (props: P, overWrite: StylesObject<P, T> = {} as T): T => {
    const theme = useTheme();
    return deepmerge(
      create_Styles(styles, theme, props),
      create_Styles(overWrite, theme, props)
    );
  };

  return useStyles;
};

export default createStyleSheet;
