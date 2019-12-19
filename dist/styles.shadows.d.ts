import { ViewStyle } from "react-native";
export interface Shadow {
  shadowColor: ViewStyle["shadowColor"];
  shadowOffset: ViewStyle["shadowOffset"];
  shadowOpacity: ViewStyle["shadowOpacity"];
  shadowRadius: ViewStyle["shadowRadius"];
  elevation: ViewStyle["elevation"];
}
export declare type Shadows = [
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
declare const shadows: Shadows;
export default shadows;
