import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "@/tw";

export default function AITeacher() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-h1 font-bold text-primary text-center">
          AI Teacher
        </Text>
      </View>
    </SafeAreaView>
  );
}
