import ColorManipulator from "color";
import deepmerge from "deepmerge";
import {
  common,
  grey,
  ICommonColors,
  IColor,
  indigo,
  pink,
  red
} from "./colors";
import { PartialExcept, RecursivePartial } from "./utils";

export interface PaletteText {
  primary: string;
  secondary: string;
  disabled: string;
  hint: string;
  icon?: string;
}

export type PaletteDivider = string;

export interface PaletteAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  disabled: string;
  disabledBackground: string;
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
  contrastText: string;
}

export type PaletteColorExceptMain = PartialExcept<PaletteColor, "main">;

export interface Palette {
  common: ICommonColors;
  type: PaletteType;
  contrastThreshold: number;
  tonalOffset: number;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  grey: IColor;
  text: PaletteText;
  divider: PaletteDivider;
  action: PaletteAction;
  background: PaletteBackground;
  getContrastText: (background: string) => string;
  augmentColor: {
    <K extends keyof Partial<IColor>, T extends Partial<IColor>>(
      color: PaletteColorExceptMain | T
    ): PaletteColor;
    <K extends keyof Partial<IColor>, T extends Partial<IColor>>(
      color: T,
      mainShade?: K,
      lightShade?: keyof IColor,
      darkShade?: keyof IColor
    ): PaletteColor;
  };
}

type PaletteTypeObject = Pick<
  Palette,
  "action" | "background" | "divider" | "text"
>;

export const light: PaletteTypeObject = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.54)",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
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
    primary: common.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: grey[800],
    default: "#303030"
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

export type PaletteColorOptions = PaletteColorExceptMain | Partial<IColor>;

export interface PaletteOptions
  extends RecursivePartial<Omit<Palette, "primary" | "secondary" | "error">> {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
}

function getLightAndDark<T extends Partial<IColor>>(
  intent: PaletteColorExceptMain | T,
  main: string,
  shade: [keyof IColor, keyof IColor],
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
      dark: indigo[700]
    },
    secondary = {
      light: pink.A200,
      main: pink.A400,
      dark: pink.A700
    },
    error = {
      light: red[300],
      main: red[500],
      dark: red[700]
    },
    type = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2,
    ...other
  } = options;

  const getContrastText = (background: string): string => {
    const color = ColorManipulator;

    return color(background).contrast(color(dark.text.primary)) >=
      contrastThreshold
      ? dark.text.primary
      : light.text.primary;
  };

  function augmentColor<
    K extends keyof Partial<IColor>,
    T extends Partial<IColor>
  >(color: PaletteColorExceptMain | T): PaletteColor;
  function augmentColor<
    K extends keyof Partial<IColor>,
    T extends Partial<IColor>
  >(
    color: PaletteColorExceptMain | T,
    mainShade?: K,
    lightShade?: keyof IColor,
    darkShade?: keyof IColor
  ): PaletteColor;
  function augmentColor<
    K extends keyof Partial<IColor>,
    T extends Partial<IColor>
  >(
    color: PaletteColorExceptMain | T,
    mainShade?: K,
    lightShade?: keyof IColor,
    darkShade?: keyof IColor
  ): PaletteColor {
    const MainShade = mainShade || (500 as K);
    const LightShade = lightShade || 300;
    const DarkShade = darkShade || 700;

    const main = color.hasOwnProperty("main")
      ? (color as PaletteColorExceptMain).main
      : ((color as T)[MainShade] as string);

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
      contrastText
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
