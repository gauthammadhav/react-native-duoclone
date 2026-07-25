import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "@/tw";
import { Image } from "@/tw/image";
import { images } from "@/constants/images";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MessageCircle, Plus } from "lucide-react-native";
import { useRouter } from "expo-router";

const MOCK_CHATS = [
  {
    id: "1",
    name: "Duo (Spanish)",
    lastMessage: "¡Hola! ¿Cómo estás hoy?",
    time: "2m",
    unread: 2,
    avatar: "https://picsum.photos/seed/duo/100/100",
  },
  {
    id: "2",
    name: "Lily (Grammar)",
    lastMessage: "Let's review the past tense.",
    time: "1h",
    unread: 0,
    avatar: "https://picsum.photos/seed/lily/100/100",
  },
  {
    id: "3",
    name: "Zari (Vocab)",
    lastMessage: "You learned 10 new words!",
    time: "1d",
    unread: 0,
    avatar: "https://picsum.photos/seed/zari/100/100",
  },
];

export default function Chat() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="px-5 pt-3 pb-4 flex-row justify-between items-center">
        <Text className="text-h2 font-bold text-fg">Chats</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <Plus size={20} color="#0EA5E9" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {MOCK_CHATS.map((chat) => (
          <TouchableOpacity key={chat.id} style={styles.chatCard} activeOpacity={0.7}>
            <Image
              source={{ uri: chat.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View className="flex-1 justify-center">
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-body-lg font-bold text-fg">{chat.name}</Text>
                <Text className="text-body-sm text-muted font-medium">{chat.time}</Text>
              </View>
              <Text
                className={`text-body-md ${chat.unread > 0 ? "text-fg font-medium" : "text-muted"}`}
                numberOfLines={1}
              >
                {chat.lastMessage}
              </Text>
            </View>
            {chat.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{chat.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View className="items-center mt-12 opacity-80">
          <MessageCircle size={48} color="#E5E7EB" strokeWidth={1.5} />
          <Text className="text-body-md text-muted mt-3 text-center px-4">
            Start a new chat with an AI tutor to practice your writing skills.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newChatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: "#F3F4F6",
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F3F4F6",
  },
  unreadBadge: {
    backgroundColor: "#58CC02",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});
