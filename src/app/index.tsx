import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "@/tw";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center gap-6">
        <Text className="text-h1 font-bold text-primary">Voca</Text>
        <Pressable
          className="bg-primary rounded-2xl px-8 py-4"
          onPress={() => router.push("/onboarding")}
        >
          <Text className="text-body-lg font-semibold text-white">
            Go to Onboarding
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}