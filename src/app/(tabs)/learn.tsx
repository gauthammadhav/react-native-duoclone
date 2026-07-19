import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Pressable,
  ScrollView,
} from "@/tw";
import { Image } from "@/tw/image";
import { useUserStore } from "@/store/userStore";
import { useLessonStore } from "@/store/lessonStore";
import { languages } from "@/data/languages";
import { units as allUnits } from "@/data/units";
import { lessons, LessonWithImage } from "@/data/lessons";
import { images } from "@/constants/images";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Check, Lock, BookOpen, ChevronLeft, Bookmark } from "lucide-react-native";
import { useRouter } from "expo-router";

type TabType = "lessons" | "practice";

type LessonStatus = "completed" | "in_progress" | "locked";

function getLessonStatus(
  lessonId: string,
  completedIds: string[],
  inProgressId: string | null
): LessonStatus {
  if (completedIds.includes(lessonId)) return "completed";
  if (inProgressId === lessonId) return "in_progress";
  return "locked";
}

export default function Learn() {
  const router = useRouter();
  const selectedLanguageCode = useUserStore((s) => s.selectedLanguage);
  const { completedLessonIds, inProgressLessonId, setInProgress, _hasHydrated } =
    useLessonStore();

  const [activeTab, setActiveTab] = useState<TabType>("lessons");

  // ── derive data ───────────────────────────────────────────────────────────
  const langCode = selectedLanguageCode || "es";
  const selectedLanguage = languages.find((l) => l.code === langCode);

  // All units for the current language
  const langUnits = allUnits
    .filter((u) => u.languageCode === langCode)
    .sort((a, b) => a.order - b.order);

  // All lessons for the current language
  const langLessons = lessons
    .filter((l) => l.id.startsWith(langCode))
    .sort((a, b) => a.order - b.order);

  // Use the first unit as the "current" unit for the header
  const currentUnit = langUnits[0];

  const completedCount = langLessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;

  // ── seed mock state if this is first time viewing ─────────────────────────
  useEffect(() => {
    // Wait until AsyncStorage rehydration is done — prevents overwriting saved progress
    if (!_hasHydrated) return;

    // Only seed if nothing is tracked yet for this language
    const hasAnyProgress = langLessons.some(
      (l) =>
        completedLessonIds.includes(l.id) || inProgressLessonId === l.id
    );
    if (!hasAnyProgress && langLessons.length >= 3) {
      // Mock: first 2 completed, 3rd in-progress
      useLessonStore.setState((prev) => ({
        completedLessonIds: [
          ...prev.completedLessonIds,
          langLessons[0].id,
          langLessons[1].id,
        ],
        inProgressLessonId: langLessons[2].id,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langCode, _hasHydrated]);

  // ── handle lesson tap ─────────────────────────────────────────────────────
  const handleLessonPress = (lesson: LessonWithImage, status: LessonStatus) => {
    // Locked lessons are not navigable yet
    if (status === "locked") return;
    setInProgress(lesson.id);
    router.push(`/lesson/${lesson.id}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Top header ──────────────────────────────────────────────── */}
        <View className="px-5 pt-3 pb-2 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={() => router.back()}
              className="w-9 h-9 items-center justify-center active:opacity-60"
            >
              <ChevronLeft size={26} color="#0D132B" strokeWidth={2.5} />
            </Pressable>
            <View>
              <Text className="text-h2 font-bold text-fg leading-tight">
                {inProgressLessonId
                  ? (langLessons.find((l) => l.id === inProgressLessonId)?.title ?? selectedLanguage?.name)
                  : (currentUnit?.title ?? selectedLanguage?.name)}
              </Text>
              <Text className="text-body-sm text-muted font-medium mt-0.5">
                {currentUnit
                  ? `${currentUnit.title} • ${completedCount} / ${langLessons.length} lessons`
                  : `${completedCount} / ${langLessons.length} lessons`}
              </Text>
            </View>
          </View>
          <Pressable className="w-9 h-9 items-center justify-center active:opacity-60">
            <Bookmark size={22} color="#5B5EA6" strokeWidth={2} fill="#5B5EA6" />
          </Pressable>
        </View>

        {/* ── Hero image ──────────────────────────────────────────────── */}
        <View style={styles.heroContainer}>
          <Image
            source={images.lessonScreenThumbnail}
            style={styles.heroImage}
            contentFit="cover"
          />
          {/* Rounded top for the content below */}
          <View style={styles.heroBottomCurve} />
        </View>

        {/* ── Tabs ────────────────────────────────────────────────────── */}
        <View className="mx-5 mt-4">
          <View className="flex-row bg-[#F2F2F7] rounded-2xl p-1">
            <Pressable
              style={[
                styles.tabBtn,
                activeTab === "lessons" && styles.tabBtnActive,
              ]}
              onPress={() => setActiveTab("lessons")}
            >
              <Text
                className={
                  activeTab === "lessons"
                    ? "text-body-md font-bold text-primary"
                    : "text-body-md font-medium text-muted"
                }
              >
                Lessons
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabBtn,
                activeTab === "practice" && styles.tabBtnActive,
              ]}
              onPress={() => setActiveTab("practice")}
            >
              <Text
                className={
                  activeTab === "practice"
                    ? "text-body-md font-bold text-primary"
                    : "text-body-md font-medium text-muted"
                }
              >
                Practice
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ── Lesson list ─────────────────────────────────────────────── */}
        {activeTab === "lessons" ? (
          <View className="px-5 mt-5 pb-10 gap-3">
            {langLessons.map((lesson, index) => {
              const status = getLessonStatus(
                lesson.id,
                completedLessonIds,
                inProgressLessonId
              );
              return (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  status={status}
                  onPress={() => handleLessonPress(lesson, status)}
                />
              );
            })}
          </View>
        ) : (
          <View className="px-5 mt-8 pb-10 items-center gap-4">
            <View className="w-16 h-16 bg-[#F2F2F7] rounded-full items-center justify-center">
              <BookOpen size={28} color="#9CA3AF" strokeWidth={2} />
            </View>
            <Text className="text-h4 font-bold text-fg">Practice coming soon</Text>
            <Text className="text-body-md text-muted text-center">
              Vocabulary drills and review exercises will appear here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LessonCard component
// ─────────────────────────────────────────────────────────────────────────────
interface LessonCardProps {
  lesson: LessonWithImage;
  index: number;
  status: LessonStatus;
  onPress: () => void;
}

function LessonCard({ lesson, index, status, onPress }: LessonCardProps) {
  const isCompleted = status === "completed";
  const isInProgress = status === "in_progress";
  const isLocked = status === "locked";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={isLocked ? 1 : 0.75}
      style={[
        styles.card,
        isInProgress && styles.cardActive,
        isLocked && { opacity: 0.6 },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.cardLabel,
            isInProgress && styles.cardLabelActive,
          ]}
        >
          Lesson {index + 1}
        </Text>
        <Text
          style={[
            styles.cardTitle,
            isInProgress && styles.cardTitleActive,
          ]}
        >
          {lesson.title}
        </Text>
        {isInProgress ? (
          <Text style={styles.inProgressBadge}>In progress</Text>
        ) : !isCompleted ? (
          <Text style={styles.cardSub}>
            0 / {lesson.activities.length} activities
          </Text>
        ) : null}
      </View>

      {/* Status icon */}
      {isCompleted ? (
        <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: "#58CC02", alignItems: "center", justifyContent: "center" }}>
          <Check size={18} color="#FFFFFF" strokeWidth={3.5} />
        </View>
      ) : isInProgress ? (
        <View style={styles.inProgressIcon}>
          <Image
            source={{ uri: `https://picsum.photos/seed/${lesson.id}_icon/60/60` }}
            style={{ width: 44, height: 44, borderRadius: 8 }}
            contentFit="cover"
          />
        </View>
      ) : (
        <View style={styles.lockedIcon}>
          <Lock size={18} color="#9CA3AF" strokeWidth={2.5} />
        </View>
      )}
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  heroContainer: {
    width: "100%",
    height: 220,
    position: "relative",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroBottomCurve: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 14,
  },
  tabBtnActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    gap: 12,
  },
  cardActive: {
    borderColor: "#5B5EA6",
    backgroundColor: "#F5F5FF",
    shadowColor: "#5B5EA6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    marginBottom: 3,
    letterSpacing: 0.3,
  },
  cardLabelActive: {
    color: "#5B5EA6",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0D132B",
  },
  cardTitleActive: {
    color: "#0D132B",
  },
  cardSub: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 3,
  },
  inProgressBadge: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5B5EA6",
    marginTop: 4,
  },
  inProgressIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#EEF2FF",
  },
  lockedIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
  },
});
