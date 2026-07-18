import "../../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { usePoppins } from "@/hooks/usePoppins";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useUserStore } from "@/store/userStore";

// Keep the splash screen visible while fonts are loading
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

function InitialLayout() {
  const [fontsLoaded, fontError] = usePoppins();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  
  const hasHydrated = useUserStore((state) => state._hasHydrated);
  const selectedLanguage = useUserStore((state) => state.selectedLanguage);

  useEffect(() => {
    if ((fontsLoaded || fontError) && hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, hasHydrated]);

  useEffect(() => {
    if (!isLoaded || !fontsLoaded || !hasHydrated) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "onboarding";
    const inLanguageSelection = segments[0] === "language-selection";

    if (isSignedIn) {
      if (!selectedLanguage) {
        if (!inLanguageSelection) {
          router.replace("/language-selection");
        }
      } else {
        if (inAuthGroup || inOnboarding || inLanguageSelection) {
          router.replace("/");
        }
      }
    } else {
      if (!inAuthGroup && !inOnboarding) {
        router.replace("/onboarding");
      }
    }
  }, [isSignedIn, isLoaded, fontsLoaded, hasHydrated, segments, selectedLanguage]);

  // Don't render anything until fonts and auth are ready
  if ((!fontsLoaded && !fontError) || !isLoaded || !hasHydrated) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="language-selection" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
}
