import deepmerge from "deepmerge";
import createPalette, { PaletteOptions, Palette } from "./styles.palette";
import createTypography, {
  TypographyOptions,
  Typography
} from "./styles.typography";
import createSpacing, { SpacingOptions, Spacing } from "./styles.spacing";
import shadowsStyles, { Shadows } from "./styles.shadows";
import shape, { ShapeOptions, Shape } from "./styles.shape";

namespace themeManager {
  export interface Options {
    palette?: PaletteOptions;
    typography?: TypographyOptions;
    spacing?: SpacingOptions;
    shadows?: Shadows;
    shape?: ShapeOptions;
  }
  export interface Theme {
    palette: Palette;
    typography: Typography;
    spacing: Spacing;
    shadows: Shadows;
    shape: Shape;
  }

  export function create(themeOptions: Options): Theme {
    const {
      palette: paletteInput = {},
      typography: typographyInput = {},
      spacing: spacingInput,
      shadows: shadowsInput,
      ...others
    } = themeOptions;
    const palette = createPalette(paletteInput);
    const typography = createTypography(typographyInput);
    const spacing = createSpacing(spacingInput);
    const shadows = shadowsInput || shadowsStyles;
    return deepmerge(
      { palette, typography, spacing, shadows, shape },
      { ...others }
    );
  }
}

export default themeManager;
