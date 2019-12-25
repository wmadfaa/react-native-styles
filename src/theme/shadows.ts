import { ViewStyle } from "react-native";

export interface Shadow {
  shadowColor: ViewStyle["shadowColor"];
  shadowOffset: ViewStyle["shadowOffset"];
  shadowOpacity: ViewStyle["shadowOpacity"];
  shadowRadius: ViewStyle["shadowRadius"];
  elevation: ViewStyle["elevation"];
}

export interface Shadows {
  dp0: Shadow;
  dp1: Shadow;
  dp2: Shadow;
  dp3: Shadow;
  dp4: Shadow;
  dp5: Shadow;
  dp6: Shadow;
  dp7: Shadow;
  dp8: Shadow;
  dp9: Shadow;
  dp10: Shadow;
  dp11: Shadow;
  dp12: Shadow;
  dp13: Shadow;
  dp14: Shadow;
  dp15: Shadow;
  dp16: Shadow;
  dp17: Shadow;
  dp18: Shadow;
  dp19: Shadow;
  dp20: Shadow;
  dp21: Shadow;
  dp22: Shadow;
  dp23: Shadow;
  dp24: Shadow;
}

function interpolate(i: number, a: number, b: number, a2: number, b2: number) {
  return ((i - a) * (b2 - a2)) / (b - a) + a2;
}

export interface createShadowArgs {
  depth: number;
  blur: number;
  color: Shadow["shadowColor"];
}

export function createShadow(
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

const shadows: Shadows = {
  dp0: createShadow(0, 0),
  dp1: createShadow(0, 1),
  dp2: createShadow(1, 2),
  dp3: createShadow(2, 4),
  dp4: createShadow(3, 5),
  dp5: createShadow(4, 8),
  dp6: createShadow(5, 10),
  dp7: createShadow(6, 10),
  dp8: createShadow(7, 10),
  dp9: createShadow(8, 12),
  dp10: createShadow(9, 14),
  dp11: createShadow(10, 15),
  dp12: createShadow(11, 17),
  dp13: createShadow(12, 19),
  dp14: createShadow(13, 21),
  dp15: createShadow(14, 22),
  dp16: createShadow(15, 24),
  dp17: createShadow(16, 26),
  dp18: createShadow(17, 28),
  dp19: createShadow(18, 29),
  dp20: createShadow(19, 31),
  dp21: createShadow(20, 33),
  dp22: createShadow(21, 35),
  dp23: createShadow(22, 36),
  dp24: createShadow(23, 38)
};

export default shadows;
