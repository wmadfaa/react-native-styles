import { CommonColors, Color } from "../colors";
import { PartialExcept, RecursivePartial } from "../utils";
export declare type PaletteText = Record<
  "light" | "dark",
  {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  }
>;
export declare type PaletteDivider = string;
export interface PaletteAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  disabled: string;
  disabledBackground: string;
}
export interface Overlay {
  hover: string;
  focus: string;
  pressed: string;
}
export interface Surface {
  ui: string;
  card: string;
  dialogs: string;
  drawers: string;
  sheets: string;
  sideSheets: string;
  menu: string;
  snackbar: string;
}
export interface PaletteBackground {
  default: string;
  paper: string;
}
export declare type PaletteType = "light" | "dark";
export interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  palette?: Color;
  contrastText: string;
}
export declare type PaletteColorExceptMain = PartialExcept<
  PaletteColor,
  "main" | "palette"
>;
export interface Palette {
  common: CommonColors;
  type: PaletteType;
  contrastThreshold: number;
  tonalOffset: number;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  grey: Color;
  text: PaletteText;
  divider: PaletteDivider;
  action: PaletteAction;
  overlay: Overlay;
  surface: Surface;
  background: PaletteBackground;
  getContrastText: (background: string) => string;
  augmentColor: {
    <K extends keyof Partial<Color>, T extends Partial<Color>>(
      color: PaletteColorExceptMain | T
    ): PaletteColor;
    <K extends keyof Partial<Color>, T extends Partial<Color>>(
      color: T,
      mainShade?: K,
      lightShade?: keyof Color,
      darkShade?: keyof Color
    ): PaletteColor;
  };
}
declare type PaletteTypeObject = Pick<
  Palette,
  "action" | "background" | "overlay" | "surface" | "divider" | "text"
>;
export declare const light: PaletteTypeObject;
export declare const dark: PaletteTypeObject;
export declare type PaletteColorOptions =
  | PaletteColorExceptMain
  | Partial<Color>;
export interface PaletteOptions
  extends RecursivePartial<Omit<Palette, "primary" | "secondary" | "error">> {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
}
declare function createPalette(options: PaletteOptions): Palette;
export default createPalette;
