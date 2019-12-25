import { PaletteOptions, Palette } from "../theme/createColorPalette";
import { TypographyOptions, Typography } from "../theme/createTypography";
import { SpacingOptions, Spacing } from "../theme/createSpacing";
import { createShadowArgs, Shadows } from "../theme/shadows";
export interface ThemeOptions {
  palette?: PaletteOptions;
  typography?: TypographyOptions;
  spacing?: SpacingOptions;
  shadows?: {
    [key: string]: createShadowArgs;
  };
}
export interface Theme {
  palette: Palette;
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
}
declare const createTheme: (options: ThemeOptions) => Theme;
export default createTheme;
