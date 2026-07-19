import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable, ScrollView } from '@/tw';
import { Image } from '@/tw/image';
import { images } from '@/constants/images';
import { languages } from '@/data/languages';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { usePostHog } from 'posthog-react-native';

export default function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const router = useRouter();
  const posthog = usePostHog();
  const setStoreLanguage = useUserStore((state) => state.setSelectedLanguage);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8 mt-4">
          <Image source={images.earth} className="w-[340px] h-[200px] mb-6" />
          <Text className="text-h1 font-bold text-fg text-center">
            What would you like to learn?
          </Text>
        </View>

        <View className="gap-4 pb-8">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <Pressable
                key={lang.code}
                onPress={() => setSelectedLanguage(lang.code)}
                className={`flex-row items-center p-4 rounded-2xl border-2 ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-surface'
                }`}
              >
                <Image
                  source={{ uri: lang.flag }}
                  className="w-10 h-8 rounded-sm mr-4"
                />
                <Text
                  className={`text-h3 font-bold flex-1 ${
                    isSelected ? 'text-primary' : 'text-fg'
                  }`}
                >
                  {lang.name}
                </Text>
              </Pressable>
            );
          })}
          
          <Pressable className="flex-row items-center justify-center p-4 rounded-2xl border-2 border-border bg-transparent mt-2">
            <Text className="text-h4 font-bold text-muted uppercase tracking-wider">
              See all languages
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Confirmation Button */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-border">
        <Pressable
          className={`w-full rounded-2xl p-4 items-center ${
            selectedLanguage ? 'bg-primary' : 'bg-surface'
          }`}
          disabled={!selectedLanguage}
          onPress={() => {
            if (selectedLanguage) {
              posthog.capture('language_selected', { language_code: selectedLanguage });
              posthog.register({ selected_language: selectedLanguage });
              setStoreLanguage(selectedLanguage);
              router.replace('/');
            }
          }}
        >
          <Text
            className={`text-body-lg font-bold ${
              selectedLanguage ? 'text-white' : 'text-muted'
            }`}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
