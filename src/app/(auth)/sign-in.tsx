import { useState, useRef } from "react";
import { TextInput, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "@/tw";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import VerificationModal from "@/components/VerificationModal";
import { useSignIn, useSSO } from "@clerk/expo";

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const emailRef = useRef<TextInput>(null);

  const isLoading = fetchStatus === 'fetching';

  const handleSignIn = async () => {
    if (!email.trim()) return;

    setErrorMsg("");

    try {
      // Create the sign-in attempt and send the email code
      const { error } = await signIn.emailCode.sendCode({
        emailAddress: email,
      });

      if (error) {
        console.error(JSON.stringify(error, null, 2));
        setErrorMsg(error.errors?.[0]?.longMessage || error.errors?.[0]?.message || error.message || "An error occurred");
        return;
      }

      setShowModal(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setErrorMsg(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || "An error occurred");
    }
  };

  const handleVerify = async (code: string) => {
    try {
      await signIn.emailCode.verifyCode({ code });

      if (signIn.status === 'complete') {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) return;
            router.push("/");
          },
        });
        setShowModal(false);
      } else {
        throw new Error("Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      throw new Error(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || "An error occurred");
    }
  };

  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
      });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      console.error("Google sign in error:", JSON.stringify(err, null, 2));
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
            <Text className="text-display font-bold text-fg mb-2">Welcome back</Text>
            <Text className="text-body-lg text-muted mb-6">Pick up where you left off ✨</Text>
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
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={(text) => { setEmail(text); setErrorMsg(""); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </Pressable>

            {errorMsg ? (
              <Text className="text-error mt-2">{errorMsg}</Text>
            ) : null}

            <Pressable 
              className={`bg-primary rounded-2xl py-4 items-center mt-2 ${isLoading ? 'opacity-70' : ''}`}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-body-lg font-bold text-white">Continue</Text>
              )}
            </Pressable>
          </View>

          {/* Divider */}
          <View className="flex-row items-center px-12 my-8">
            <View className="flex-1 h-px bg-border" />
            <Text className="mx-4 text-body-sm text-muted">or continue with</Text>
            <View className="flex-1 h-px bg-border" />
          </View>

          {/* Social Auth */}
          <View className="px-6 pb-8 space-y-4">
            <Pressable 
              className="flex-row items-center justify-center bg-white border border-border rounded-2xl py-4"
              onPress={handleGoogleSignIn}
            >
              <Text style={styles.socialIcon}>G</Text>
              <Text className="text-body-lg font-bold text-fg ml-3">
                Continue with Google
              </Text>
            </Pressable>

            <Pressable className="flex-row items-center justify-center bg-white border border-border rounded-2xl py-4">
              <Text style={[styles.socialIcon, { color: '#1877F2' }]}>f</Text>
              <Text className="text-body-lg font-bold text-fg ml-3">
                Continue with Facebook
              </Text>
            </Pressable>

            <Pressable className="flex-row items-center justify-center bg-white border border-border rounded-2xl py-4">
              <Text style={[styles.socialIcon, { color: '#000' }]}></Text>
              <Text className="text-body-lg font-bold text-fg ml-3">
                Continue with Apple
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="flex-row justify-center pb-8 mt-auto">
            <Text className="text-body-md text-muted mr-1">Don't have an account?</Text>
            <Pressable onPress={() => router.push("/(auth)/sign-up")}>
              <Text className="text-body-md font-bold text-primary">Sign up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        email={email}
        onVerify={handleVerify}
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
    color: "#DB4437",
  },
});
