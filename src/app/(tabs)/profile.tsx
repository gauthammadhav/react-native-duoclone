import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "@/tw";
import { Image } from "@/tw/image";
import { images } from "@/constants/images";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Settings, LogOut, Flame, Zap, Shield } from "lucide-react-native";
import { useUser, useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="px-5 pt-3 pb-4 flex-row justify-between items-center border-b-[1.5px] border-b-gray-100">
        <Text className="text-h2 font-bold text-fg">Profile</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Settings size={22} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View className="px-5 mt-6 flex-row items-center gap-4">
          <Image
            source={{ uri: user?.imageUrl || "https://picsum.photos/seed/user/100/100" }}
            style={styles.avatar}
            contentFit="cover"
          />
          <View className="flex-1">
            <Text className="text-h3 font-bold text-fg">
              {user?.fullName || "Language Learner"}
            </Text>
            <Text className="text-body-md text-muted mt-1">
              Joined {user?.createdAt ? new Date(user.createdAt).getFullYear() : "2026"}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Statistics */}
        <View className="px-5">
          <Text className="text-h4 font-bold text-fg mb-4">Statistics</Text>
          
          <View className="flex-row flex-wrap gap-4">
            <View style={styles.statCard}>
              <View className="flex-row items-center gap-2 mb-2">
                <Flame size={20} color="#FF9600" />
                <Text className="text-body-md font-bold text-muted">Day Streak</Text>
              </View>
              <Text className="text-h3 font-bold text-fg">0</Text>
            </View>

            <View style={styles.statCard}>
              <View className="flex-row items-center gap-2 mb-2">
                <Zap size={20} color="#FBBF24" />
                <Text className="text-body-md font-bold text-muted">Total XP</Text>
              </View>
              <Text className="text-h3 font-bold text-fg">150</Text>
            </View>

            <View style={styles.statCard}>
              <View className="flex-row items-center gap-2 mb-2">
                <Shield size={20} color="#3B82F6" />
                <Text className="text-body-md font-bold text-muted">Current League</Text>
              </View>
              <Text className="text-h3 font-bold text-fg">Bronze</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Actions */}
        <View className="px-5">
          <TouchableOpacity style={styles.actionButton} onPress={handleSignOut} activeOpacity={0.7}>
            <LogOut size={20} color="#EF4444" />
            <Text className="text-body-lg font-bold text-red-500 ml-3">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
  },
  divider: {
    height: 1.5,
    backgroundColor: "#F3F4F6",
    marginVertical: 24,
    marginHorizontal: 20,
  },
  statCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: "#FECACA",
  },
});
