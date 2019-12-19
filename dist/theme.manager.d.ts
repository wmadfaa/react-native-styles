import { PaletteOptions, Palette } from "./styles.palette";
import { TypographyOptions, Typography } from "./styles.typography";
import { SpacingOptions, Spacing } from "./styles.spacing";
import { Shadows } from "./styles.shadows";
import { ShapeOptions, Shape } from "./styles.shape";
declare namespace themeManager {
    interface Options {
        palette?: PaletteOptions;
        typography?: TypographyOptions;
        spacing?: SpacingOptions;
        shadows?: Shadows;
        shape?: ShapeOptions;
    }
    interface Theme {
        palette: Palette;
        typography: Typography;
        spacing: Spacing;
        shadows: Shadows;
        shape: Shape;
    }
    function create(themeOptions: Options): Theme;
}
export default themeManager;
