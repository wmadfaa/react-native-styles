import React from "react";
import { ViewStyle, TextStyle, ImageStyle } from "react-native";
import themeManager from "./theme.manager";
declare type NamedStyles<T> = {
    [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
declare type StylesObject<P, T> = T | NamedStyles<T> | ((theme: themeManager.Theme, props: P) => T | NamedStyles<T>);
declare const createStyleSheet: <P extends {}, T extends NamedStyles<T> | NamedStyles<any>>(styles: StylesObject<P, T>) => {
    useStyles: (props: P) => T;
    withStyles: (styles_props: P) => <CP extends object>(Component: React.ComponentType<CP>) => React.FC<CP & {
        styles: T;
    }>;
};
export default createStyleSheet;
