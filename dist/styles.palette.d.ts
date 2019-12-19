import { ICommonColors, IColor } from "./colors";
import { PartialExcept, RecursivePartial } from "./utils";
export interface PaletteText {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
    icon?: string;
}
export declare type PaletteDivider = string;
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
export declare type PaletteType = "light" | "dark";
export interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
}
export declare type PaletteColorExceptMain = PartialExcept<PaletteColor, "main">;
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
        <K extends keyof Partial<IColor>, T extends Partial<IColor>>(color: PaletteColorExceptMain | T): PaletteColor;
        <K extends keyof Partial<IColor>, T extends Partial<IColor>>(color: T, mainShade?: K, lightShade?: keyof IColor, darkShade?: keyof IColor): PaletteColor;
    };
}
declare type PaletteTypeObject = Pick<Palette, "action" | "background" | "divider" | "text">;
export declare const light: PaletteTypeObject;
export declare const dark: PaletteTypeObject;
export declare type PaletteColorOptions = PaletteColorExceptMain | Partial<IColor>;
export interface PaletteOptions extends RecursivePartial<Omit<Palette, "primary" | "secondary" | "error">> {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    error?: PaletteColorOptions;
}
declare function createPalette(options: PaletteOptions): Palette;
export default createPalette;
