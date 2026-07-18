import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "@/tw";
import { useAuth, useUser } from "@clerk/expo";

export default function Index() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center p-6 gap-6">
        <Text className="text-display font-bold text-primary text-center mb-2">
          Voca
        </Text>
        <Text className="text-body-lg text-muted text-center max-w-sm mb-6">
          Welcome back, {user?.primaryEmailAddress?.emailAddress || "Learner"}!
        </Text>
        
        <Pressable
          className="bg-primary rounded-2xl px-8 py-4 w-full items-center"
          onPress={() => signOut()}
        >
          <Text className="text-body-lg font-semibold text-white">
            Sign Out
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}