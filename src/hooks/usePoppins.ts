/**
 * useFonts — loads all Poppins font variants defined in the Lingua design system.
 *
 * Usage (in root layout):
 *   const [fontsLoaded] = usePoppins();
 *   if (!fontsLoaded) return null;
 */

import { useFonts } from "expo-font";

export function usePoppins() {
  return useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
  });
}
