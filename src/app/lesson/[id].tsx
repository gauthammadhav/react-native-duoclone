import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated as RNAnimated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "@/tw";
import { Image } from "@/tw/image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Video,
  Mic,
  MicOff,
  Languages,
  PhoneOff,
  Volume2,
} from "lucide-react-native";
import { images } from "@/constants/images";
import { lessons } from "@/data/lessons";
import { useLessonStore } from "@/store/lessonStore";

// ── Mock feedback data ────────────────────────────────────────────────────────
const FEEDBACK_RATINGS = [
  { label: "Speaking", value: "Excellent", color: "#58CC02" },
  { label: "Pronunciation", value: "Great", color: "#5B5EA6" },
  { label: "Grammar", value: "Good", color: "#5B5EA6" },
];

// ── Session states ────────────────────────────────────────────────────────────
type SessionState = "connecting" | "active" | "listening" | "speaking";

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { markCompleted } = useLessonStore();

  // ── lesson data ───────────────────────────────────────────────────────────
  const lesson = lessons.find((l) => l.id === id);

  // Guard: unknown / malformed route ID — go back immediately, never touch store
  useEffect(() => {
    if (!lesson) router.back();
  }, [lesson, router]);

  if (!lesson) return null;

  // ── UI state ─────────────────────────────────────────────────────────────
  const [sessionState, setSessionState] = useState<SessionState>("connecting");
  const [micEnabled, setMicEnabled] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  // ── Language-aware greetings ────────────────────────────────────────────
  // Derive language code from the lesson ID prefix (e.g. "es_lesson_3" → "es")
  const langCode = lesson.id.split('_')[0];
  const GREETINGS: Record<string, string> = {
    es: '\u00a1Hola', fr: 'Bonjour', ja: '\u3053\u3093\u306b\u3061\u306f',
    de: 'Hallo',    it: 'Ciao',    ko: '\uc548\ub155\ud558\uc138\uc694',
    zh: '\u4f60\u597d',  pt: 'Ol\u00e1',
  };
  const AFFIRMATIONS: Record<string, string> = {
    es: '\u00a1Muy bien! That was great! \ud83d\udc4f',
    fr: 'Tr\u00e8s bien\u202f! That was great! \ud83d\udc4f',
    ja: '\u3088\u304f\u3067\u304d\u307e\u3057\u305f\uff01 That was great! \ud83d\udc4f',
    de: 'Sehr gut! That was great! \ud83d\udc4f',
    it: 'Molto bene! That was great! \ud83d\udc4f',
    ko: '\uc798 \ud588\uc5b4\uc694! That was great! \ud83d\udc4f',
    zh: '\u5f88\u597d\uff01 That was great! \ud83d\udc4f',
    pt: 'Muito bem! That was great! \ud83d\udc4f',
  };
  const greeting = GREETINGS[langCode] ?? 'Hello';
  const affirmation = AFFIRMATIONS[langCode] ?? 'Great job! \ud83d\udc4f';

  // ── Mock teacher messages cycling ───────────────────────────────────────────
  const teacherMessages = [
    `${greeting}! I'm your AI teacher. Today we'll practice: "${lesson.title}"`,
    lesson.phrases[0]
      ? `Try saying: "${lesson.phrases[0].phrase}"`
      : `Let's begin with "${lesson.goal}"`,
    affirmation,
    "Now let's try the next phrase. Are you ready?",
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const currentMessage = teacherMessages[messageIndex];

  // ── Pulse animation for mic/speaking indicator ───────────────────────────
  const pulseAnim = useRef(new RNAnimated.Value(1)).current;

  useEffect(() => {
    // Simulate session connecting → active
    const timer = setTimeout(() => setSessionState("active"), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (sessionState !== "active") return;
    // Cycle through teacher messages every 4 seconds
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
    const interval = setInterval(() => {
      setSessionState("speaking");
      timeoutHandle = setTimeout(() => {
        setMessageIndex((i) => (i + 1) % teacherMessages.length);
        setSessionState("active");
        timeoutHandle = null;
      }, 2000);
    }, 4000);
    return () => {
      clearInterval(interval);
      if (timeoutHandle !== null) clearTimeout(timeoutHandle);
    };
  }, [sessionState, teacherMessages.length]);

  // Pulse loop for the mic listening indicator
  useEffect(() => {
    const pulse = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        RNAnimated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  // ── handlers ─────────────────────────────────────────────────────────────
  const handleEndCall = () => {
    markCompleted(lesson.id);
    router.back();
  };

  const sessionLabel =
    sessionState === "connecting"
      ? "Connecting..."
      : sessionState === "speaking"
      ? "Teacher is speaking..."
      : micEnabled
      ? "Your turn — speak now"
      : "Mic off";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A1A2E" }}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={[styles.header, { paddingTop: 8 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>AI Teacher</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>
        {/* Right action icons */}
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionChip}
            onPress={() => setCameraEnabled((v) => !v)}
            activeOpacity={0.75}
          >
            <Video size={18} color={cameraEnabled ? "#5B5EA6" : "#6B7280"} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.actionChip}>
            <Text style={styles.streakNum}>12</Text>
          </View>
          <TouchableOpacity style={styles.actionChip} activeOpacity={0.75}>
            <Volume2 size={18} color="#6B7280" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Teacher area (full-width card) ──────────────────────────────── */}
      <View style={styles.teacherCard}>
        {/* Background gradient overlay */}
        <View style={styles.teacherBg} />

        {/* Mascot — centered, large */}
        <Image
          source={images.mascotAuth}
          style={styles.mascotImage}
          contentFit="contain"
        />

        {/* User preview — top right */}
        <View style={styles.userPreview}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" }}
            style={styles.userPreviewImage}
            contentFit="cover"
          />
          {cameraEnabled && (
            <View style={styles.cameraOffOverlay}>
              <Video size={14} color="#fff" strokeWidth={2} />
            </View>
          )}
        </View>

        {/* Session status pill */}
        <View style={styles.statusPill}>
          <RNAnimated.View
            style={[
              styles.statusDot,
              { transform: [{ scale: sessionState === "speaking" ? pulseAnim : 1 }] },
            ]}
          />
          <Text style={styles.statusText}>{sessionLabel}</Text>
        </View>

        {/* Speech bubble */}
        {subtitlesEnabled && sessionState !== "connecting" && (
          <View style={styles.bubbleWrapper}>
            <View style={styles.bubble}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bubbleText}>{currentMessage}</Text>
              </View>
              <TouchableOpacity style={styles.speakerBtn} activeOpacity={0.7}>
                <Volume2 size={20} color="#5B5EA6" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
            {/* Bubble tail */}
            <View style={styles.bubbleTail} />
          </View>
        )}
      </View>

      {/* ── Controls row ────────────────────────────────────────────────── */}
      <View style={styles.controls}>
        {/* Camera */}
        <View style={styles.controlItem}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => setCameraEnabled((v) => !v)}
            activeOpacity={0.75}
          >
            <Video size={22} color={cameraEnabled ? "#5B5EA6" : "#1A1A2E"} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>Camera</Text>
        </View>

        {/* Mic */}
        <View style={styles.controlItem}>
          <RNAnimated.View
            style={[
              styles.controlBtn,
              micEnabled && { transform: [{ scale: pulseAnim }] },
              micEnabled && styles.controlBtnActive,
            ]}
          >
            <TouchableOpacity onPress={() => setMicEnabled((v) => !v)} activeOpacity={0.75}>
              {micEnabled ? (
                <Mic size={22} color="#1A1A2E" strokeWidth={2} />
              ) : (
                <MicOff size={22} color="#EF4444" strokeWidth={2} />
              )}
            </TouchableOpacity>
          </RNAnimated.View>
          <Text style={styles.controlLabel}>Mic</Text>
        </View>

        {/* Subtitles */}
        <View style={styles.controlItem}>
          <TouchableOpacity
            style={styles.controlBtn}
            onPress={() => setSubtitlesEnabled((v) => !v)}
            activeOpacity={0.75}
          >
            <Languages size={22} color={subtitlesEnabled ? "#5B5EA6" : "#1A1A2E"} strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>Subtitles</Text>
        </View>

        {/* End Call */}
        <View style={styles.controlItem}>
          <TouchableOpacity
            style={[styles.controlBtn, styles.endCallBtn]}
            onPress={handleEndCall}
            activeOpacity={0.8}
          >
            <PhoneOff size={22} color="#FFFFFF" strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={styles.controlLabel}>End Call</Text>
        </View>
      </View>

      {/* ── Feedback card ───────────────────────────────────────────────── */}
      <View style={[styles.feedbackCard, { marginBottom: Math.max(insets.bottom + 8, 16) }]}>
        {FEEDBACK_RATINGS.map((item, i) => (
          <View
            key={item.label}
            style={[
              styles.feedbackItem,
              i < FEEDBACK_RATINGS.length - 1 && styles.feedbackDivider,
            ]}
          >
            <Text style={styles.feedbackLabel}>{item.label}</Text>
            <Text style={[styles.feedbackValue, { color: item.color }]}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 30,
    color: "#1A1A2E",
    lineHeight: 34,
    fontWeight: "300",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A2E",
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#58CC02",
  },
  onlineText: {
    fontSize: 13,
    color: "#58CC02",
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionChip: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  streakNum: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A2E",
  },

  // Teacher card
  teacherCard: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#D6C9B8",
  },
  teacherBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#C8BAA8",
  },
  mascotImage: {
    position: "absolute",
    bottom: 100,
    left: -20,
    width: "80%",
    height: "80%",
  },
  userPreview: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 90,
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  userPreviewImage: {
    width: "100%",
    height: "100%",
  },
  cameraOffOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },

  // Status pill
  statusPill: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.85)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5B5EA6",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1A1A2E",
  },

  // Speech bubble
  bubbleWrapper: {
    position: "absolute",
    bottom: 16,
    left: 12,
    right: 12,
  },
  bubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bubbleText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1A1A2E",
    lineHeight: 24,
  },
  speakerBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleTail: {
    width: 20,
    height: 12,
    backgroundColor: "#FFFFFF",
    marginLeft: 24,
    // CSS triangle trick — use borderRadius to fake a tail
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },

  // Controls
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  controlItem: {
    alignItems: "center",
    gap: 6,
  },
  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  controlBtnActive: {
    backgroundColor: "#EEF2FF",
  },
  endCallBtn: {
    backgroundColor: "#EF4444",
  },
  controlLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },

  // Feedback card
  feedbackCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  feedbackItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  feedbackDivider: {
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  feedbackLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A2E",
  },
  feedbackValue: {
    fontSize: 14,
    fontWeight: "700",
  },
});
