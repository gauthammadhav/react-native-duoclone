import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "@/tw";
import { Image } from "@/tw/image";
import { Link } from "expo-router";
import { useAuth, useUser } from "@clerk/expo";
import { useUserStore } from "@/store/userStore";
import { languages } from "@/data/languages";

export default function Index() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const clearLanguage = useUserStore((state) => state.clearLanguage);
  const selectedLanguageCode = useUserStore((state) => state.selectedLanguage);
  const selectedLanguage = languages.find(l => l.code === selectedLanguageCode);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center p-6 gap-6">
        <Text className="text-display font-bold text-primary text-center mb-2">
          Voca
        </Text>
        <Text className="text-body-lg text-muted text-center max-w-sm mb-6">
          Welcome back, {user?.primaryEmailAddress?.emailAddress || "Learner"}!
        </Text>

        {selectedLanguage && (
          <View className="bg-surface border-2 border-border rounded-2xl px-6 py-4 mb-6 w-full items-center">
            <Text className="text-body-md text-muted font-bold uppercase tracking-wider mb-2">
              Currently Learning
            </Text>
            <View className="flex-row items-center">
              <Image 
                source={{ uri: selectedLanguage.flag }} 
                className="w-8 h-6 rounded-sm mr-3" 
              />
              <Text className="text-h3 font-bold text-primary">
                {selectedLanguage.name}
              </Text>
            </View>
          </View>
        )}
        
        <Pressable 
          className="bg-surface border-2 border-border rounded-2xl px-8 py-4 w-full items-center mb-4"
          onPress={() => clearLanguage()}
        >
          <Text className="text-body-lg font-bold text-fg">
            Clear Language Storage
          </Text>
        </Pressable>
        
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
