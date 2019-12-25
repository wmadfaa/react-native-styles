type Transformer = (factor: number, spacingInput?: number) => number;

export interface Spacing {
  (): number;
  (value1: number): number;
  (value1: number, value2: number): string;
  (value1: number, value2: number, value3: number): string;
  (value1: number, value2: number, value3: number, value4: number): string;
}

export type SpacingOptions = number | Transformer;

function createSpacing(spacingInput: SpacingOptions = 8): Spacing {
  let transform: Transformer;
  if (spacingInput instanceof Function) transform = spacingInput;
  else transform = factor => factor * spacingInput;

  function spacing(): number;
  function spacing(factor1: number): number;
  function spacing(factor1: number, factor2: number): string;
  function spacing(factor1: number, factor2: number, factor3: number): string;
  function spacing(
    factor1: number,
    factor2: number,
    factor3: number,
    factor4: number
  ): string;
  function spacing(...args: number[]): number | string {
    if (!args.length) return transform(1);

    if (args.length === 1) return transform(args[0]);

    return (args.length > 4 ? args.slice(0, 4) : args).reduce((acc, factor) => {
      return `${acc ? `${acc} ` : ""}${transform(factor)}`;
    }, "");
  }

  return spacing;
}

export default createSpacing;
