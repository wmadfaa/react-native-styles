import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import { Theme } from "./createTheme";
declare type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
declare type StylesObject<P, T> =
  | T
  | NamedStyles<T>
  | ((theme: Theme, props: P) => T | NamedStyles<T>);
declare const createStyleSheet: <
  P extends {},
  T extends NamedStyles<T> | NamedStyles<any>
>(
  styles: StylesObject<P, T>
) => (props: P, overWrite?: StylesObject<P, T>) => T;
export default createStyleSheet;
