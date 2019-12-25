import { TextStyle } from "react-native";
import deepmerge from "deepmerge";

export type ThemeStyle =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "s1"
  | "s2"
  | "p1"
  | "p2"
  | "c1"
  | "c2"
  | "label";

export interface TypographyStyle extends Partial<Omit<TextStyle, "fontSize">> {
  fontSize: number;
}

export interface Variants extends Record<ThemeStyle, TypographyStyle> {}

export interface Typography extends Variants {
  rem: number;
}

export interface TypographyOptions extends Partial<Typography> {
  allVariants?: TextStyle;
}

const createTypography = (options: TypographyOptions): Typography => {
  const { rem = 14, allVariants = {} } = options;

  const buildVariant = (
    size: number,
    lineHeight: number,
    fontWeight: TextStyle["fontWeight"],
    fontStyle: TextStyle["fontStyle"],
    casing?: TextStyle["textTransform"],
    fontFamily?: TextStyle["fontFamily"]
  ): TypographyStyle => {
    return {
      fontFamily,
      fontStyle,
      fontWeight,
      fontSize: rem * size,
      lineHeight: lineHeight * rem,
      textTransform: casing,
      ...allVariants
    };
  };

  const variants: Variants = {
    h1: buildVariant(2.5714, 3.4285, "bold", "normal"),
    h2: buildVariant(2.2857, 2.8571, "bold", "normal"),
    h3: buildVariant(2.1428, 2.8571, "bold", "normal"),
    h4: buildVariant(1.8571, 2.2857, "bold", "normal"),
    h5: buildVariant(1.5714, 2.2857, "bold", "normal"),
    h6: buildVariant(1.2857, 1.7142, "bold", "normal"),
    s1: buildVariant(1.0714, 1.7142, "600", "normal"),
    s2: buildVariant(0.9285, 1.7142, "600", "normal"),
    p1: buildVariant(1.0714, 1.4285, "normal", "normal"),
    p2: buildVariant(0.9285, 1.2857, "normal", "normal"),
    c1: buildVariant(0.8571, 1.1428, "normal", "normal"),
    c2: buildVariant(0.8571, 1.1428, "600", "normal"),
    label: buildVariant(0.8571, 1.1428, "bold", "normal", "uppercase")
  };

  return deepmerge({ rem }, variants);
};

export default createTypography;
