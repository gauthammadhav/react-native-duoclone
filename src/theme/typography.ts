/**
 * Lingua Design System — Typography Tokens
 * Source: 01-design-system.png
 *
 * Font Family: Poppins
 *
 * Scale:
 *   H1         32px  Bold       lineHeight 1.2  → Page / Screen Title
 *   H2         24px  SemiBold   lineHeight 1.3  → Section Title
 *   H3         20px  SemiBold   lineHeight 1.3  → Card / Module Title
 *   H4         16px  Medium     lineHeight 1.4  → Subheading
 *   Body Large 16px  Regular    lineHeight 1.6  → Important content
 *   Body Med   14px  Regular    lineHeight 1.6  → Body text
 *   Body Small 13px  Regular    lineHeight 1.6  → Supporting text
 *   Caption    11px  Regular    lineHeight 1.4  → Labels, meta text
 */

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 13,
  caption: 11,
} as const;

export const lineHeight = {
  h1: 1.2,
  h2: 1.3,
  h3: 1.3,
  h4: 1.4,
  bodyLarge: 1.6,
  bodyMedium: 1.6,
  bodySmall: 1.6,
  caption: 1.4,
} as const;

/** Pre-composed text style objects for use with StyleSheet */
export const textStyles = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.h1,
    lineHeight: fontSize.h1 * lineHeight.h1,
  },
  h2: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.h2,
    lineHeight: fontSize.h2 * lineHeight.h2,
  },
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.h3,
    lineHeight: fontSize.h3 * lineHeight.h3,
  },
  h4: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.h4,
    lineHeight: fontSize.h4 * lineHeight.h4,
  },
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodyLarge,
    lineHeight: fontSize.bodyLarge * lineHeight.bodyLarge,
  },
  bodyMedium: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodyMedium,
    lineHeight: fontSize.bodyMedium * lineHeight.bodyMedium,
  },
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodySmall,
    lineHeight: fontSize.bodySmall * lineHeight.bodySmall,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.caption,
    lineHeight: fontSize.caption * lineHeight.caption,
  },
} as const;
