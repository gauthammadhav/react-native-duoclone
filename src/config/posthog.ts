import PostHog from "posthog-react-native";

const projectToken = process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.EXPO_PUBLIC_POSTHOG_HOST;

if (!projectToken || !host) {
  throw new Error(
    "Missing PostHog configuration. Set EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN and EXPO_PUBLIC_POSTHOG_HOST in .env."
  );
}

export const posthog = new PostHog(projectToken, {
  host,
  captureAppLifecycleEvents: true,
  flushAtAppHide: true,
  flushInterval: 3000, // flush every 3s instead of default 10-30s
});
