import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, ScrollView } from "@/tw";
import { Image } from "@/tw/image";
import { useUser } from "@clerk/expo";
import { useUserStore } from "@/store/userStore";
import { languages } from "@/data/languages";
import { lessons } from "@/data/lessons";
import { images } from "@/constants/images";
import { Bell, BookOpen, Headphones, Video, Bot, Check, Circle } from "lucide-react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { usePostHog } from "posthog-react-native";

export default function Index() {
  const router = useRouter();
  const posthog = usePostHog();
  const { user } = useUser();
  const selectedLanguageCode = useUserStore((state) => state.selectedLanguage);
  
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({ lesson: true });

  const toggleItem = (id: string) => {
    const isCompleted = !completedItems[id];
    setCompletedItems(prev => ({ ...prev, [id]: isCompleted }));
    if (isCompleted) {
      posthog.capture("learning_plan_item_completed", { item_id: id, language_code: currentLanguageCode });
    }
  }; 
  
  // Find current language data, default to Spanish if not set
  const currentLanguageCode = selectedLanguageCode || 'es';
  const selectedLanguage = languages.find(l => l.code === currentLanguageCode);
  
  // Find the current lesson (we'll just use the first lesson of the selected language for now)
  const currentLesson = lessons.find(l => l.id.startsWith(currentLanguageCode)) || lessons[0];
  
  // The user's name
  const firstName = user?.firstName || "Alex";
  
  // Determine greeting based on language
  const getGreeting = () => {
    if (currentLanguageCode === 'es') return 'Hola';
    if (currentLanguageCode === 'fr') return 'Bonjour';
    if (currentLanguageCode === 'de') return 'Hallo';
    if (currentLanguageCode === 'it') return 'Ciao';
    if (currentLanguageCode === 'pt') return 'Olá';
    if (currentLanguageCode === 'ja') return 'こんにちは';
    if (currentLanguageCode === 'ko') return '안녕하세요';
    if (currentLanguageCode === 'zh') return '你好';
    return 'Hello';
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-5 gap-6 pb-12">
          
          {/* Header */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              {selectedLanguage?.flag ? (
                <Image source={{ uri: selectedLanguage.flag }} className="w-8 h-8 rounded-full bg-surface border border-border" contentFit="cover" />
              ) : (
                <View className="w-8 h-8 rounded-full bg-surface border border-border" />
              )}
              <Text className="text-h3 font-bold text-fg">
                {getGreeting()}, {firstName}! 👋
              </Text>
            </View>
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1.5">
                <Image source={images.streakFire} className="w-7 h-7" contentFit="contain" />
                <Text className="text-h4 font-bold text-fg">12</Text>
              </View>
              <Bell size={24} color="#0D132B" strokeWidth={2.5} />
            </View>
          </View>

          {/* Daily Goal Card */}
          <View className="bg-[#FFF4E5] rounded-[24px] p-5 flex-row justify-between items-center">
            <View className="flex-1 gap-2">
              <Text className="text-body-lg font-bold text-[#6B7280]">Daily goal</Text>
              <View className="flex-row items-baseline gap-1.5 mb-1">
                <Text className="text-display font-bold text-fg leading-none">15</Text>
                <Text className="text-body-lg text-[#6B7280]">/ 20 XP</Text>
              </View>
              <View className="h-2.5 w-[85%] bg-[#FFD7BA] rounded-full overflow-hidden">
                <View className="h-full w-3/4 bg-[#FF8A00] rounded-full" />
              </View>
            </View>
            <Image source={images.treasure} className="w-24 h-24 -my-2" contentFit="contain" />
          </View>

          {/* Continue Learning Card */}
          <View className="bg-primary rounded-[24px] p-6 overflow-hidden relative">
            <View className="w-2/3 gap-1 relative z-10">
              <Text className="text-body-lg text-white/90 font-medium">Continue learning</Text>
              <Text className="text-h1 font-bold text-white leading-tight">{selectedLanguage?.name}</Text>
              <Text className="text-body-lg text-white/90 mb-5">A1 • Unit 3</Text>
              <Pressable 
                className="bg-white rounded-2xl py-3.5 px-6 self-start shadow-sm active:opacity-80"
                onPress={() => {
                  posthog.capture("lesson_opened", { entry_point: "continue_learning", language_code: currentLanguageCode });
                  router.push('/(tabs)/learn');
                }}
              >
                <Text className="text-body-lg font-bold text-primary">Continue</Text>
              </Pressable>
            </View>
            {/* Palace image at bottom right */}
            <Image 
              source={images.palace} 
              className="absolute -bottom-4 -right-4 w-48 h-48" 
              contentFit="contain" 
            />
          </View>

          {/* Today's Plan */}
          <View className="gap-5">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-h3 font-bold text-fg">Today's plan</Text>
              <Pressable onPress={() => {
                posthog.capture("lesson_opened", { entry_point: "todays_plan", language_code: currentLanguageCode });
                router.push('/(tabs)/learn');
              }} className="active:opacity-70">
                <Text className="text-body-md font-bold text-primary">View all</Text>
              </Pressable>
            </View>

            {/* Item 1: Lesson */}
            <Pressable 
              className="flex-row items-center gap-4 active:opacity-70"
              onPress={() => toggleItem('lesson')}
            >
              <View className="w-[56px] h-[56px] bg-primary rounded-2xl items-center justify-center shadow-sm">
                <BookOpen color="white" size={26} strokeWidth={2.5} />
              </View>
              <View className="flex-1 gap-0.5">
                <Text className="text-h4 font-bold text-fg">Lesson</Text>
                <Text className="text-body-md text-muted">At the café</Text>
              </View>
              {completedItems['lesson'] ? (
                <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                  <Check color="white" size={20} strokeWidth={3.5} />
                </View>
              ) : (
                <View className="w-8 h-8 rounded-full items-center justify-center border-2 border-border" />
              )}
            </Pressable>

            {/* Item 2: AI Conversation */}
            <Pressable 
              className="flex-row items-center gap-4 active:opacity-70"
              onPress={() => toggleItem('ai_conversation')}
            >
              <View className="w-[56px] h-[56px] bg-primary rounded-2xl items-center justify-center shadow-sm">
                <Headphones color="white" size={26} strokeWidth={2.5} />
              </View>
              <View className="flex-1 gap-0.5">
                <Text className="text-h4 font-bold text-fg">AI Conversation</Text>
                <Text className="text-body-md text-muted">Talk about your day</Text>
              </View>
              {completedItems['ai_conversation'] ? (
                <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                  <Check color="white" size={20} strokeWidth={3.5} />
                </View>
              ) : (
                <View className="w-8 h-8 rounded-full items-center justify-center border-2 border-border" />
              )}
            </Pressable>

            {/* Item 3: New words */}
            <Pressable 
              className="flex-row items-center gap-4 active:opacity-70"
              onPress={() => toggleItem('new_words')}
            >
              <View className="w-[56px] h-[56px] bg-[#FF4D4F] rounded-2xl items-center justify-center shadow-sm">
                <Bot color="white" size={26} strokeWidth={2.5} />
              </View>
              <View className="flex-1 gap-0.5">
                <Text className="text-h4 font-bold text-fg">New words</Text>
                <Text className="text-body-md text-muted">10 words</Text>
              </View>
              {completedItems['new_words'] ? (
                <View className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                  <Check color="white" size={20} strokeWidth={3.5} />
                </View>
              ) : (
                <View className="w-8 h-8 rounded-full items-center justify-center border-2 border-border" />
              )}
            </Pressable>
          </View>

          {/* Next up Card */}
          <View className="bg-[#F0FDF4] rounded-[24px] p-5 flex-row justify-between items-center mt-1">
            <View className="gap-1 flex-1">
              <Text className="text-body-sm font-medium text-[#6B7280]">Next up</Text>
              <Text className="text-h3 font-bold text-fg">AI Video Call</Text>
              <Text className="text-body-md text-[#6B7280]">Practice speaking</Text>
            </View>
            <View className="relative">
              <Image 
                source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" }} 
                className="w-16 h-16 rounded-full"
                contentFit="cover"
              />
              <View className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full items-center justify-center border-2 border-white">
                <Video color="white" size={12} strokeWidth={3} />
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
