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
    em: number,
    lineHeight: number,
    casing?: TextStyle["textTransform"]
  ): TypographyStyle => {
    const fontSize = rem * em;
    console.log(lineHeight);
    return {
      fontSize,
      // lineHeight: 1, // lineHeight * fontSize,
      textTransform: casing,
      ...allVariants
    };
  };

  const variants: Variants = {
    h1: buildVariant(2.5714, 1.27),
    h2: buildVariant(2.2857, 0.8),
    h3: buildVariant(2.1428, 0.75),
    h4: buildVariant(1.8571, 0.8125),
    h5: buildVariant(1.5714, 0.6875),
    h6: buildVariant(1.2857, 0.75),
    s1: buildVariant(1.0714, 0.625),
    s2: buildVariant(0.9285, 0.5416),
    p1: buildVariant(1.0714, 0.75),
    p2: buildVariant(0.9285, 0.7222),
    c1: buildVariant(0.8571, 0.75),
    c2: buildVariant(0.8571, 0.75),
    label: buildVariant(0.8571, 0.75, "uppercase")
  };

  return deepmerge({ rem }, variants);
};

export default createTypography;
