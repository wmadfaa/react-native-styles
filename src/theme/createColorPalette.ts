import ColorManipulator from "color";
import deepmerge from "deepmerge";
import {
  common,
  grey,
  CommonColors,
  Color,
  indigo,
  pink,
  red
} from "../colors";
import { PartialExcept, RecursivePartial } from "../utils";

export type PaletteText = Record<
  "light" | "dark",
  {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  }
>;

export type PaletteDivider = string;

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

export type PaletteType = "light" | "dark";

export interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  palette?: Color;
  contrastText: string;
}

export type PaletteColorExceptMain = PartialExcept<
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

type PaletteTypeObject = Pick<
  Palette,
  "action" | "background" | "overlay" | "surface" | "divider" | "text"
>;

export const light: PaletteTypeObject = {
  text: {
    dark: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    light: {
      primary: common.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)"
    }
  },
  divider: "rgba(0, 0, 0, 0.12)",
  overlay: {
    hover: "rgba(0, 0, 0, 0.08)",
    focus: "rgba(0, 0, 0, 0.12)",
    pressed: "rgba(0, 0, 0, 0.16)"
  },
  surface: {
    ui: common.white,
    card: grey[50],
    dialogs: common.white,
    drawers: common.white,
    sheets: grey[50],
    sideSheets: common.white,
    menu: grey[50],
    snackbar: grey[900]
  },
  background: {
    paper: common.white,
    default: grey[50]
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(0, 0, 0, 0.14)",
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)"
  }
};

export const dark: PaletteTypeObject = {
  text: {
    dark: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    light: {
      primary: common.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)"
    }
  },
  divider: "rgba(255, 255, 255, 0.12)",
  overlay: {
    hover: "rgba(255, 255, 255, 0.32)",
    focus: "rgba(255, 255, 255, 0.12)",
    pressed: "rgba(255, 255, 255, 0.8)"
  },
  surface: {
    ui: grey[800],
    card: grey.A400,
    dialogs: grey[800],
    drawers: grey[800],
    sheets: grey.A400,
    sideSheets: grey[800],
    menu: grey.A400,
    snackbar: grey[900]
  },
  background: {
    paper: grey[800],
    default: grey.A400
  },
  action: {
    active: common.white,
    hover: "rgba(255, 255, 255, 0.1)",
    hoverOpacity: 0.1,
    selected: "rgba(255, 255, 255, 0.2)",
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)"
  }
};

export type PaletteColorOptions = PaletteColorExceptMain | Partial<Color>;

export interface PaletteOptions
  extends RecursivePartial<Omit<Palette, "primary" | "secondary" | "error">> {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
}

function getLightAndDark<T extends Partial<Color>>(
  intent: PaletteColorExceptMain | T,
  main: string,
  shade: [keyof Color, keyof Color],
  tonalOffset: number
): T & { light: string; dark: string } {
  const lightColor = intent.hasOwnProperty("light")
    ? ((intent as PaletteColorExceptMain).light as string)
    : ((intent as T)[shade[0]] as string) ||
      ColorManipulator(main)
        .lighten(tonalOffset)
        .hex();

  const darkColor = intent.hasOwnProperty("dark")
    ? ((intent as PaletteColorExceptMain).dark as string)
    : ((intent as T)[shade[1]] as string) ||
      ColorManipulator(main)
        .darken(tonalOffset * 1.5)
        .hex();

  return {
    ...(intent as T & PaletteColorExceptMain),
    light: lightColor,
    dark: darkColor
  };
}

function createPalette(options: PaletteOptions): Palette {
  const {
    primary = {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
      palette: indigo
    },
    secondary = {
      light: pink.A200,
      main: pink.A400,
      dark: pink.A700,
      palette: pink
    },
    error = {
      light: red[300],
      main: red[500],
      dark: red[700],
      palette: red
    },
    type = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2,
    ...other
  } = options;

  const getContrastText = (background: string): string => {
    const color = ColorManipulator;

    return color(background).contrast(color(light.text.dark.primary)) >=
      contrastThreshold
      ? light.text.dark.primary
      : light.text.light.primary;
  };

  function augmentColor<
    K extends keyof Partial<Color>,
    T extends Partial<Color>
  >(color: PaletteColorExceptMain | T): PaletteColor;
  function augmentColor<
    K extends keyof Partial<Color>,
    T extends Partial<Color>
  >(
    color: PaletteColorExceptMain | T,
    mainShade?: K,
    lightShade?: keyof Color,
    darkShade?: keyof Color
  ): PaletteColor;
  function augmentColor<
    K extends keyof Partial<Color>,
    T extends Partial<Color>
  >(
    color: PaletteColorExceptMain | T,
    mainShade?: K,
    lightShade?: keyof Color,
    darkShade?: keyof Color
  ): PaletteColor {
    const MainShade = mainShade || (500 as K);
    const LightShade = lightShade || 300;
    const DarkShade = darkShade || 700;

    const main = color.hasOwnProperty("main")
      ? (color as PaletteColorExceptMain).main
      : ((color as T)[MainShade] as string);

    const palette = color.hasOwnProperty("palette")
      ? (color as PaletteColorExceptMain).palette
      : undefined;

    const { light: lightColor, dark: darkColor } = getLightAndDark(
      color,
      main,
      [LightShade, DarkShade],
      tonalOffset
    );

    const contrastText = color.hasOwnProperty("contrastText")
      ? ((color as PaletteColorExceptMain).contrastText as string)
      : getContrastText(main);

    return {
      main,
      light: lightColor,
      dark: darkColor,
      contrastText,
      palette
    };
  }

  const types = { dark, light };

  return deepmerge(
    {
      common,
      type,
      primary: augmentColor(primary),
      secondary: augmentColor(secondary, "A400", "A200", "A700"),
      error: augmentColor(error),
      grey,
      contrastThreshold,
      getContrastText,
      augmentColor,
      tonalOffset,
      ...types[type]
    },
    other
  );
}

export default createPalette;
