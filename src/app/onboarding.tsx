import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, useWindowDimensions } from "react-native";
import { View, Text, Pressable } from "@/tw";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Measure the exact available height for the mascot section
  const [mascotAreaHeight, setMascotAreaHeight] = useState(0);

  // Mascot fills larger percentage of the available height and width
  const mascotSize =
    mascotAreaHeight > 0
      ? Math.min(width * 0.85, mascotAreaHeight * 0.95)
      : 260;

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Logo ─────────────────────────────────────────────── */}
      <View className="flex-row items-center justify-center gap-3 mt-6">
        <Image
          source={images.mascotLogo}
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text className="text-h1 font-bold text-fg">Voca</Text>
      </View>

      {/* ── Headline ─────────────────────────────────────────── */}
      <View className="px-6 mt-8">
        <Text className="text-display font-bold text-fg leading-tight">
          Your AI language{" "}
        </Text>
        <Text className="text-display font-bold leading-tight">
          <Text className="text-display font-bold text-primary">teacher</Text>
          <Text className="text-display font-bold text-fg">.</Text>
        </Text>
        <Text className="text-body-lg text-muted mt-4 leading-relaxed">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>
      </View>

      {/* ── Mascot section ───────────────────────────────────── */}
      {/*
        flex-1 fills all remaining space between headline and button.
        onLayout gives us the exact pixel height so the inner wrapper
        can stretch to fill it precisely — no dead space.
      */}
      <View
        style={styles.mascotSection}
        onLayout={(e) => setMascotAreaHeight(e.nativeEvent.layout.height)}
      >
        {mascotAreaHeight > 0 && (
          <View style={[styles.mascotWrapper, { width, height: mascotAreaHeight }]}>
            {/* Hello! — left, upper third */}
            <View style={[styles.bubble, styles.bubbleLeft]}>
              <Text className="text-body-md font-semibold text-fg">Hello!</Text>
            </View>

            {/* ¡Hola! — right, top */}
            <View style={[styles.bubble, styles.bubbleRight]}>
              <Text className="text-body-md font-semibold text-primary">¡Hola!</Text>
            </View>

            {/* Mascot — centered */}
            <Image
              source={images.mascotWelcome}
              style={{ width: mascotSize, height: mascotSize }}
              resizeMode="contain"
            />

            {/* 你好! — right, lower third */}
            <View style={[styles.bubble, styles.bubbleBottomRight]}>
              <Text className="text-body-md font-semibold text-error">你好!</Text>
            </View>
          </View>
        )}
      </View>

      {/* ── Get Started button ────────────────────────────────── */}
      <View className="px-6 pb-8">
        <Pressable
          className="bg-primary rounded-2xl py-4 flex-row items-center justify-center"
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text className="text-body-lg font-semibold text-white mr-2">
            Get Started
          </Text>
          <Text className="text-body-lg font-bold text-white">›</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  logoIcon: {
    width: 44,
    height: 44,
  },
  // Fills all remaining vertical space between text and button
  mascotSection: {
    flex: 1,
    width: "100%",
  },
  // Stretches to match mascotSection's measured height exactly
  mascotWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  bubble: {
    position: "absolute",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  // "Hello!" — left edge, ~25% from top of mascot area
  bubbleLeft: {
    top: "22%",
    left: 20,
    backgroundColor: "#F0F4FF",
  },
  // "¡Hola!" — right edge, ~8% from top
  bubbleRight: {
    top: "8%",
    right: 20,
    backgroundColor: "#EEF2FF",
  },
  // "你好!" — right edge, ~60% from top (lower-right)
  bubbleBottomRight: {
    top: "60%",
    right: 20,
    backgroundColor: "#FFF0F0",
  },
});
