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
  const create_Styles = (theme: Theme, props: P): T => {
    if (styles instanceof Function) {
      return StyleSheet.create<T>(styles(theme, props));
    }
    return StyleSheet.create<T>(styles);
  };

  const create_overwriteStyles = (
    overWrite: ((theme: Theme, props: P) => Partial<T>) | Partial<T>,
    theme: Theme,
    props: P
  ): Partial<T> => {
    if (overWrite instanceof Function) {
      return StyleSheet.create<{}>(overWrite(theme, props));
    }
    return StyleSheet.create<{}>(overWrite);
  };

  const useStyles = (
    props: P,
    overWrite: ((theme: Theme, props: P) => Partial<T>) | Partial<T> = {}
  ): T => {
    const theme = useTheme();

    return deepmerge(
      create_Styles(theme, props),
      create_overwriteStyles(overWrite, theme, props)
    );
  };

  return useStyles;
};

export default createStyleSheet;
