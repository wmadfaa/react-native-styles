import deepmerge from "deepmerge";
import createPalette, {
  PaletteOptions,
  Palette
} from "../theme/createColorPalette";
import createTypography, {
  TypographyOptions,
  Typography
} from "../theme/createTypography";
import createSpacing, { SpacingOptions, Spacing } from "../theme/createSpacing";
import defaultShadows, { createShadowArgs, Shadows } from "../theme/shadows";
import { createShadow } from "../theme/shadows";

export interface ThemeOptions {
  palette?: PaletteOptions;
  typography?: TypographyOptions;
  spacing?: SpacingOptions;
  shadows?: { [key: string]: createShadowArgs };
}
export interface Theme {
  palette: Palette;
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
}

const createTheme = (options: ThemeOptions): Theme => {
  const {
    palette: paletteInput = {},
    typography: typographyInput = {},
    spacing: spacingInput,
    shadows: shadowsInput = {},
    ...others
  } = options;
  const palette = createPalette(paletteInput);
  const typography = createTypography(typographyInput);
  const spacing = createSpacing(spacingInput);

  const shadows = Object.keys(shadowsInput).reduce((acc, shadowKey) => {
    const { depth, blur, color } = shadowsInput[shadowKey];
    return { ...acc, [shadowKey]: createShadow(depth, blur, color) };
  }, defaultShadows);

  return deepmerge({ palette, typography, spacing, shadows }, others);
};

export default createTheme;
