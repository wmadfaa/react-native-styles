import { ViewStyle } from "react-native";

export interface Shadow {
  shadowColor: ViewStyle["shadowColor"];
  shadowOffset: ViewStyle["shadowOffset"];
  shadowOpacity: ViewStyle["shadowOpacity"];
  shadowRadius: ViewStyle["shadowRadius"];
  elevation: ViewStyle["elevation"];
}

export type Shadows = [
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow,
  Shadow
];

function interpolate(i: number, a: number, b: number, a2: number, b2: number) {
  return ((i - a) * (b2 - a2)) / (b - a) + a2;
}

function createShadow(
  depth: number,
  blur: number,
  color: Shadow["shadowColor"] = "#000000"
): Shadow {
  return {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: depth + 1 === 1 ? 1 : Math.floor((depth + 1) * 0.5)
    },
    shadowOpacity: interpolate(depth, 1, 24, 0.2, 0.6),
    shadowRadius: interpolate(blur, 1, 38, 1, 16),

    elevation: depth + 1
  };
}

const shadows: Shadows = [
  createShadow(0, 1),
  createShadow(1, 2),
  createShadow(2, 4),
  createShadow(3, 5),
  createShadow(4, 8),
  createShadow(5, 10),
  createShadow(6, 10),
  createShadow(7, 10),
  createShadow(8, 12),
  createShadow(9, 14),
  createShadow(10, 15),
  createShadow(11, 17),
  createShadow(12, 19),
  createShadow(13, 21),
  createShadow(14, 22),
  createShadow(15, 24),
  createShadow(16, 26),
  createShadow(17, 28),
  createShadow(18, 29),
  createShadow(19, 31),
  createShadow(20, 33),
  createShadow(21, 35),
  createShadow(22, 36),
  createShadow(23, 38)
];

export default shadows;
