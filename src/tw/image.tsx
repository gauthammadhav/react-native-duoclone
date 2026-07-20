/**
 * CSS-wrapped Image component for NativeWind v5
 * Uses expo-image under the hood for better performance.
 */

import { useCssElement } from "react-native-css";
import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { Image as RNImage } from "expo-image";

const AnimatedExpoImage = Animated.createAnimatedComponent(RNImage);

function CSSImage(props: React.ComponentProps<typeof AnimatedExpoImage>) {
  // @ts-expect-error: Remap objectFit CSS property → contentFit expo-image prop
  const { objectFit, objectPosition, ...style } =
    StyleSheet.flatten(props.style) || {};

  return (
    <AnimatedExpoImage
      contentFit={objectFit}
      contentPosition={objectPosition}
      {...props}
      source={
        typeof props.source === "string" ? { uri: props.source } : props.source
      }
      // @ts-expect-error: Style is remapped above
      style={style}
    />
  );
}

export type ImageProps = React.ComponentProps<typeof CSSImage> & {
  className?: string;
};

export const Image = (props: ImageProps) => {
  // @ts-ignore: Type instantiation is excessively deep
  return useCssElement(CSSImage, props, { className: "style" });
};

Image.displayName = "CSS(Image)";
