import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "@/tw";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-h1 font-bold text-primary text-center">
          Profile
        </Text>
      </View>
    </SafeAreaView>
  );
}
