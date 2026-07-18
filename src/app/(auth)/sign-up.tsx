import { useState, useRef } from "react";
import { TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "@/tw";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import VerificationModal from "@/components/VerificationModal";

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSignUp = () => {
    if (email.trim() && password.trim()) {
      setShowModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="px-6 pt-2">
            <Pressable onPress={() => router.back()} className="mb-6 h-8 w-8 justify-center">
              <Text className="text-h2 text-fg">{"<"}</Text>
            </Pressable>
            <Text className="text-display font-bold text-fg mb-2">Create your account</Text>
            <Text className="text-body-lg text-muted mb-6">Start your language journey today ✨</Text>
          </View>

          {/* Mascot Image */}
          <View className="items-center mb-6">
            <Image 
              source={images.mascotAuth || images.mascotWelcome} 
              style={styles.mascot} 
              resizeMode="contain" 
            />
          </View>

          {/* Form */}
          <View className="px-6 space-y-4">
            <Pressable style={styles.inputContainer} onPress={() => emailRef.current?.focus()}>
              <Text className="text-body-sm font-semibold text-muted mb-2">Email</Text>
              <TextInput
                ref={emailRef}
                style={styles.input}
                placeholder="alex@gmail.com"
                placeholderTextColor="#9CA3AF" // text-gray-400
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Pressable>

            <Pressable style={styles.inputContainer} onPress={() => passwordRef.current?.focus()}>
              <Text className="text-body-sm font-semibold text-muted mb-2">Password</Text>
              <View className="flex-row items-center justify-between">
                <TextInput
                  ref={passwordRef}
                  style={[styles.input, { flex: 1 }]}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} className="p-1">
                  <Text className="text-muted font-bold">{showPassword ? "👁️‍🗨️" : "👁️"}</Text>
                </Pressable>
              </View>
            </Pressable>

            <Pressable 
              className="bg-primary rounded-2xl py-4 items-center mt-2"
              onPress={handleSignUp}
            >
              <Text className="text-body-lg font-bold text-white">Sign Up</Text>
            </Pressable>
          </View>

          {/* Divider */}
          <View className="flex-row items-center px-12 my-8">
            <View className="flex-1 h-px bg-border" />
            <Text className="mx-4 text-body-sm text-muted">or continue with</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Social Auth */}
          <View className="px-6 space-y-4 pb-12">
            <Pressable style={styles.socialButton}>
              <Text style={styles.socialIcon}>G</Text>
              <Text className="text-body-md font-semibold text-fg">Continue with Google</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Text style={[styles.socialIcon, { color: '#1877F2' }]}>f</Text>
              <Text className="text-body-md font-semibold text-fg">Continue with Facebook</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Text style={[styles.socialIcon, { color: '#000' }]}></Text>
              <Text className="text-body-md font-semibold text-fg">Continue with Apple</Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center pb-8 mt-auto">
            <Text className="text-body-md text-muted mr-1">Already have an account?</Text>
            <Pressable onPress={() => router.push("/(auth)/sign-in")}>
              <Text className="text-body-md font-bold text-primary">Log in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        email={email}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mascot: {
    width: 200,
    height: 180,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    fontSize: 16,
    color: "#0D132B",
    padding: 0,
    fontWeight: "500",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  socialIcon: {
    position: "absolute",
    left: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#DB4437", // Default to Google red, overridden for others
  },
});
