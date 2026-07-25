import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "@/tw";
import { Image } from "@/tw/image";
import { images } from "@/constants/images";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Mic, Headphones, Sparkles } from "lucide-react-native";

export default function AITeacher() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-3 pb-4">
          <Text className="text-h2 font-bold text-fg text-center">AI Teacher</Text>
          <Text className="text-body-md text-muted text-center mt-1">
            Practice speaking naturally
          </Text>
        </View>

        <View className="items-center mt-4">
          <Image
            source={images.aiTeacherBg}
            style={{ width: 260, height: 260 }}
            contentFit="contain"
          />
        </View>

        <View className="px-6 mt-8 gap-4">
          <View style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}>
              <Mic size={24} color="#0EA5E9" />
            </View>
            <View className="flex-1">
              <Text className="text-body-lg font-bold text-fg">Voice Conversations</Text>
              <Text className="text-body-sm text-muted mt-0.5">
                Speak in your target language and get instant feedback.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: "#FEF08A" }]}>
              <Sparkles size={24} color="#EAB308" />
            </View>
            <View className="flex-1">
              <Text className="text-body-lg font-bold text-fg">Smart Corrections</Text>
              <Text className="text-body-sm text-muted mt-0.5">
                The AI helps you with grammar, vocabulary, and pronunciation.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: "#FCE7F3" }]}>
              <Headphones size={24} color="#EC4899" />
            </View>
            <View className="flex-1">
              <Text className="text-body-lg font-bold text-fg">Listen & Learn</Text>
              <Text className="text-body-sm text-muted mt-0.5">
                Train your ear by listening to native-sounding pronunciation.
              </Text>
            </View>
          </View>
        </View>

        <View className="px-6 mt-10">
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Start Conversation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#58CC02",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 4,
    borderBottomColor: "#46A302",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});
