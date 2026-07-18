/**
 * CSS-wrapped Animated components for NativeWind v5
 * Merge react-native-reanimated API with CSS className support.
 */

import * as TW from "./index";
import RNAnimated from "react-native-reanimated";

export const Animated = {
  ...RNAnimated,
  View: RNAnimated.createAnimatedComponent(TW.View),
};
