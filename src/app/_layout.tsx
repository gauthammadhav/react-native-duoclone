import "../../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { usePoppins } from "@/hooks/usePoppins";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";

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

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (!isLoaded || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "onboarding";

    if (isSignedIn) {
      if (inAuthGroup || inOnboarding) {
        router.replace("/");
      }
    } else {
      // If not signed in and trying to access a protected route (like home "/")
      // The home route doesn't have a segment, so segments[0] might be undefined
      if (!inAuthGroup && !inOnboarding) {
        router.replace("/onboarding");
      }
    }
  }, [isSignedIn, isLoaded, fontsLoaded, segments]);

  // Don't render anything until fonts and auth are ready
  if ((!fontsLoaded && !fontError) || !isLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
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
