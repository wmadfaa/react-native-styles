import { TextStyle } from "react-native";
export declare type ThemeStyle = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "s1" | "s2" | "p1" | "p2" | "c1" | "c2" | "label";
export interface TypographyStyle extends Partial<Omit<TextStyle, "fontSize">> {
    fontSize: number;
}
export interface Variants extends Record<ThemeStyle, TypographyStyle> {
}
export interface Typography extends Variants {
    rem: number;
}
export interface TypographyOptions extends Partial<Typography> {
    allVariants?: TextStyle;
}
declare const createTypography: (options: TypographyOptions) => Typography;
export default createTypography;
