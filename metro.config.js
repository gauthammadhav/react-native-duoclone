const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add 'mjs' to resolver for lucide-react-native
config.resolver.sourceExts.push('mjs');

module.exports = withNativewind(config, {
  // Inline variables break PlatformColor in CSS variables
  inlineVariables: false,
  // className support is handled manually via react-native-css wrappers
  globalClassNamePolyfill: false,
});
