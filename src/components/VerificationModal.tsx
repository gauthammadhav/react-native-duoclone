import React, { useState, useRef, useEffect } from "react";
import { Modal, KeyboardAvoidingView, Platform, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import { View, Text } from "@/tw";

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  email: string;
  onVerify: (code: string) => Promise<void>;
}

export default function VerificationModal({ visible, onClose, email, onVerify }: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<TextInput>(null);

  // Automatically focus the input when modal opens
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setCode(""); // reset when closed
      setErrorMsg("");
      setIsLoading(false);
    }
  }, [visible]);

  // Handle code change
  const handleCodeChange = async (text: string) => {
    // Only allow digits
    const cleaned = text.replace(/[^0-9]/g, "");
    setCode(cleaned);
    setErrorMsg("");

    // Auto-navigate when 6 digits are entered
    if (cleaned.length === 6) {
      setIsLoading(true);
      try {
        await onVerify(cleaned);
        // Let the parent close it if needed, or close here
        // If it succeeds, the parent will unmount or redirect
      } catch (err: any) {
        console.error(err);
        setErrorMsg(err.errors?.[0]?.message || err.message || "Invalid code");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePressBoxes = () => {
    inputRef.current?.focus();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={onClose} />
          <View style={styles.modalContent}>
            {/* Handle for drag (visual only) */}
            <View className="w-12 h-1.5 bg-border rounded-full self-center mb-6" />

            <Text className="text-h2 font-bold text-fg text-center mb-2">
              Check your email
            </Text>
            <Text className="text-body-md text-muted text-center mb-8 px-4">
              We've sent a 6-digit verification code to <Text className="font-semibold text-fg">{email}</Text>. Please enter it below.
            </Text>

            {/* OTP Input UI */}
            <Pressable onPress={handlePressBoxes} style={styles.codeContainer} disabled={isLoading}>
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const char = code[index] || "";
                const isFocused = code.length === index;
                return (
                  <View
                    key={index}
                    style={[
                      styles.codeBox,
                      isFocused && styles.codeBoxFocused,
                      char ? styles.codeBoxFilled : null,
                      errorMsg ? styles.codeBoxError : null,
                    ]}
                  >
                    <Text className="text-h2 font-bold text-fg">{char}</Text>
                  </View>
                );
              })}
            </Pressable>
            
            {errorMsg ? (
              <Text className="text-error text-center mt-4">{errorMsg}</Text>
            ) : null}

            {isLoading && (
              <ActivityIndicator size="small" color="#6C4EF5" style={{ marginTop: 16 }} />
            )}

            {/* Hidden actual TextInput */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              maxLength={6}
              style={styles.hiddenInput}
              editable={!isLoading}
              caretHidden
            />

            <Pressable
              style={{ marginTop: 64, marginBottom: 16 }}
              onPress={() => {
                setCode("");
                setErrorMsg("");
                inputRef.current?.focus();
              }}
              disabled={isLoading}
            >
              <Text className="text-primary font-semibold text-center">
                Resend Code
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(13, 19, 43, 0.4)", // Dark overlay matching fg
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 16,
    paddingBottom: 48,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  codeBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB", // border
    backgroundColor: "#F6F7FB", // surface
    justifyContent: "center",
    alignItems: "center",
  },
  codeBoxFocused: {
    borderColor: "#6C4EF5", // primary
    backgroundColor: "#FFFFFF",
  },
  codeBoxFilled: {
    borderColor: "#6C4EF5",
    backgroundColor: "#FFFFFF",
  },
  codeBoxError: {
    borderColor: "#EF4444",
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
});
