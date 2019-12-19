declare type Transformer = (factor: number, spacingInput?: number) => number;
export interface Spacing {
    (): number;
    (value1: number): number;
    (value1: number, value2: number): string;
    (value1: number, value2: number, value3: number): string;
    (value1: number, value2: number, value3: number, value4: number): string;
}
export declare type SpacingOptions = number | Transformer;
declare function createSpacing(spacingInput?: SpacingOptions): Spacing;
export default createSpacing;
