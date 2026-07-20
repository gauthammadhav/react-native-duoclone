import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable } from "@/tw";
import { Image } from "@/tw/image";
import {
  Video,
  Mic,
  MicOff,
  Languages,
  PhoneOff,
  Volume2,
  ChevronLeft,
  User,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "@/constants/images";
import { lessons } from "@/data/lessons";
import { useLessonStore } from "@/store/lessonStore";
import { useUser } from "@clerk/expo";
import {
  StreamCall,
  useStreamVideoClient,
  Call,
  CallingState,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";
import { getApiUrl } from "@/components/StreamVideoProvider";

// ── Mock feedback data ────────────────────────────────────────────────────────
const FEEDBACK_RATINGS = [
  { label: "Speaking", value: "Excellent", color: "text-[#58CC02]" },
  { label: "Pronunciation", value: "Great", color: "text-[#3B82F6]" },
  { label: "Grammar", value: "Good", color: "text-[#8B5CF6]" },
];

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = lessons.find((l) => l.id === id);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    if (!lesson) {
      router.back();
    }
  }, [lesson, router]);

  useEffect(() => {
    if (!client || !user || !lesson) return;

    let c: Call;
    let isActive = true;

    const initializeCall = async () => {
      try {
        const response = await fetch(getApiUrl("/api/stream/call"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            userId: user.id, 
            lessonId: lesson.id,
            language: lesson.id.split("_")[0]
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create call: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!isActive) return;

        c = client.call("audio_room", data.callId, { reuseInstance: true });
        setCall(c);
        
        c.setDisconnectionTimeout(120);
        await c.join();
        
        // Default to mic enabled, camera disabled for audio lessons
        await c.camera.disable();
      } catch (err) {
        console.error("Failed to initialize call", err);
      }
    };

    initializeCall();

    return () => {
      isActive = false;
      if (c && c.state.callingState !== CallingState.LEFT) {
        c.leave().catch(console.error);
      }
      setCall(undefined);
    };
  }, [client, user?.id, lesson?.id]);

  if (!lesson) return null;

  if (!call) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA", justifyContent: "center", alignItems: "center" }} edges={['top', 'bottom']}>
        <ActivityIndicator size="large" color="#58CC02" />
        <Text className="mt-4 text-[#6B7280] font-semibold text-lg">Connecting to AI Teacher...</Text>
      </SafeAreaView>
    );
  }

  return (
    <StreamCall call={call}>
      <ActiveCallUI lesson={lesson} />
    </StreamCall>
  );
}

function ActiveCallUI({ lesson }: { lesson: any }) {
  const router = useRouter();
  const { markCompleted } = useLessonStore();
  const call = useCall();
  const { useCallCallingState, useMicrophoneState } = useCallStateHooks();
  
  const callingState = useCallCallingState();
  const { status: micStatus, isSpeakingWhileMuted } = useMicrophoneState();

  const micEnabled = micStatus === "enabled";
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);

  // ── Language-aware greetings ────────────────────────────────────────────
  const langCode = lesson.id.split("_")[0];
  const GREETINGS: Record<string, string> = {
    es: "¡Hola", fr: "Bonjour", ja: "こんにちは",
    de: "Hallo", it: "Ciao", ko: "안녕하세요",
    zh: "你好", pt: "Olá",
  };
  const AFFIRMATIONS: Record<string, string> = {
    es: "¡Muy bien!\nThat was great! 👏",
    fr: "Très bien !\nThat was great! 👏",
    ja: "よくできました！\nThat was great! 👏",
    de: "Sehr gut!\nThat was great! 👏",
    it: "Molto bene!\nThat was great! 👏",
    ko: "잘 했어요!\nThat was great! 👏",
    zh: "很好！\nThat was great! 👏",
    pt: "Muito bem!\nThat was great! 👏",
  };
  const greeting = GREETINGS[langCode] ?? "Hello";
  const affirmation = AFFIRMATIONS[langCode] ?? "Great job!\nThat was great! 👏";

  // ── Mock teacher messages cycling ───────────────────────────────────────────
  const teacherMessages = [
    `${greeting}! I'm your AI teacher. Today we'll practice: "${lesson.title}"`,
    lesson.phrases[0]
      ? `Try saying: "${lesson.phrases[0].phrase}"`
      : `Let's begin with "${lesson.goal}"`,
    affirmation,
    "Now let's try the next phrase. Are you ready?",
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const currentMessage = teacherMessages[messageIndex];

  useEffect(() => {
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
    const interval = setInterval(() => {
      timeoutHandle = setTimeout(() => {
        setMessageIndex((i) => (i + 1) % teacherMessages.length);
        timeoutHandle = null;
      }, 3000);
    }, 6000);
    return () => {
      clearInterval(interval);
      if (timeoutHandle !== null) clearTimeout(timeoutHandle);
    };
  }, [teacherMessages.length]);

  const handleEndCall = () => {
    markCompleted(lesson.id);
    router.replace('/');
  };

  const toggleMic = async () => {
    await call?.microphone.toggle();
  };

  const toggleCam = () => {
    setCameraEnabled(!cameraEnabled);
  };

  let statusText = "Online";
  let statusColor = "bg-[#58CC02]";
  
  if (callingState === CallingState.JOINING) {
    statusText = "Connecting...";
    statusColor = "bg-[#FBBF24]";
  } else if (callingState === CallingState.LEFT || callingState === CallingState.OFFLINE) {
    statusText = "Disconnected";
    statusColor = "bg-[#EF4444]";
  } else if (callingState === CallingState.RECONNECTING) {
    statusText = "Reconnecting...";
    statusColor = "bg-[#FBBF24]";
  } else if (!micEnabled) {
    statusText = "Muted";
    statusColor = "bg-[#EF4444]";
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }} edges={['top', 'bottom']}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <Pressable 
          onPress={handleEndCall} 
          className="w-10 h-10 items-center justify-center -ml-2 active:opacity-70"
        >
          <ChevronLeft size={28} color="#1F2937" strokeWidth={2.5} />
        </Pressable>
        <View className="flex-1 ml-1">
          <Text className="text-[18px] font-bold text-[#1F2937]">AI Teacher</Text>
          <View className="flex-row items-center gap-1.5 mt-0.5">
            <View className={`w-2 h-2 rounded-full ${statusColor}`} />
            <Text className="text-[13px] text-[#6B7280] font-semibold">{statusText}</Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          <Pressable 
            className={`w-10 h-10 rounded-full bg-white border items-center justify-center shadow-sm active:opacity-75 ${cameraEnabled ? 'border-[#4F46E5]' : 'border-[#F3F4F6]'}`}
            onPress={toggleCam}
          >
            <Video size={18} color={cameraEnabled ? "#4F46E5" : "#1F2937"} strokeWidth={2.5} />
          </Pressable>
          <View className="w-10 h-10 rounded-full bg-white border border-[#F3F4F6] items-center justify-center shadow-sm">
            <Text className="text-[15px] font-bold text-[#1F2937]">12</Text>
          </View>
          <Pressable className="w-10 h-10 rounded-full bg-white border border-[#F3F4F6] items-center justify-center shadow-sm active:opacity-75">
            <User size={18} color="#1F2937" strokeWidth={2.5} />
          </Pressable>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-4 pb-4 mt-2">
        {/* Teacher Card */}
        <View className="flex-1 rounded-[28px] overflow-hidden bg-[#F3F4F6] mb-5 relative">
          <Image
            source={images.aiTeacherBg}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
            locations={[0.5, 0.8, 1]}
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 300 }}
          />

          {/* User Preview */}
          <View className="absolute top-4 right-4 w-[80px] h-[100px] rounded-2xl overflow-hidden border-[3px] border-white shadow-lg bg-[#E5E7EB]">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80" }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
            {!cameraEnabled && (
              <View className="absolute inset-0 bg-black/40 items-center justify-center">
                <Video size={16} color="#fff" strokeWidth={2.5} />
              </View>
            )}
          </View>

          {/* Speech Bubble */}
          {subtitlesEnabled && (
            <View className="absolute bottom-[115px] left-4 right-4 items-center">
              {/* Tail */}
              <View 
                className="w-5 h-5 bg-white absolute -bottom-2 right-[60px] rounded-[3px] shadow-sm" 
                style={{ transform: [{ rotate: '45deg' }] }} 
              />
              <View className="bg-white rounded-[20px] p-4 flex-row items-center shadow-lg w-full">
                <View className="flex-1 pl-2">
                  <Text className="text-[17px] font-medium text-[#1F2937] leading-[26px]">
                    {currentMessage}
                  </Text>
                </View>
                <Pressable className="w-11 h-11 items-center justify-center ml-2 active:opacity-70">
                  <Volume2 size={24} color="#4F46E5" strokeWidth={2.5} />
                </Pressable>
              </View>
            </View>
          )}

          {isSpeakingWhileMuted && (
             <View className="absolute bottom-[100px] self-center bg-black/70 px-4 py-2 rounded-full">
               <Text className="text-white font-medium">You're muted</Text>
             </View>
          )}

          {/* Controls */}
          <View className="absolute bottom-6 left-0 right-0 flex-row justify-evenly px-2">
            <View className="items-center gap-2">
              <Pressable 
                className={`w-[60px] h-[60px] rounded-full items-center justify-center shadow-md active:opacity-75 ${cameraEnabled ? 'bg-[#4F46E5]' : 'bg-white'}`}
                onPress={toggleCam}
              >
                <Video size={24} color={cameraEnabled ? "#FFFFFF" : "#1F2937"} strokeWidth={2.5} />
              </Pressable>
              <Text className="text-[13px] text-white font-semibold">Camera</Text>
            </View>

            <View className="items-center gap-2">
              <View className={micEnabled ? "animate-pulse" : ""}>
                <Pressable 
                  className="w-[60px] h-[60px] rounded-full bg-white items-center justify-center shadow-md active:opacity-75"
                  onPress={toggleMic}
                >
                  {micEnabled ? (
                    <Mic size={24} color="#1F2937" strokeWidth={2.5} />
                  ) : (
                    <MicOff size={24} color="#EF4444" strokeWidth={2.5} />
                  )}
                </Pressable>
              </View>
              <Text className="text-[13px] text-white font-semibold">Mic</Text>
            </View>

            <View className="items-center gap-2">
              <Pressable 
                className={`w-[60px] h-[60px] rounded-full items-center justify-center shadow-md active:opacity-75 ${subtitlesEnabled ? 'bg-[#4F46E5]' : 'bg-white'}`}
                onPress={() => setSubtitlesEnabled(!subtitlesEnabled)}
              >
                <Languages size={24} color={subtitlesEnabled ? "#FFFFFF" : "#1F2937"} strokeWidth={2.5} />
              </Pressable>
              <Text className="text-[13px] text-white font-semibold">Subtitles</Text>
            </View>

            <View className="items-center gap-2">
              <Pressable 
                className="w-[60px] h-[60px] rounded-full bg-[#EF4444] items-center justify-center shadow-md active:opacity-80"
                onPress={handleEndCall}
              >
                <PhoneOff size={24} color="#FFFFFF" strokeWidth={2.5} />
              </Pressable>
              <Text className="text-[13px] text-white font-semibold">End Call</Text>
            </View>
          </View>
        </View>

        {/* Feedback Card */}
        <View className="flex-row bg-white rounded-[24px] py-4 border border-[#F3F4F6] shadow-sm mb-4">
          {FEEDBACK_RATINGS.map((item, i) => (
            <View 
              key={item.label} 
              className={`flex-1 items-center gap-1.5 ${i < FEEDBACK_RATINGS.length - 1 ? 'border-r border-[#F3F4F6]' : ''}`}
            >
              <Text className="text-[13px] font-semibold text-[#1F2937]">{item.label}</Text>
              <Text className={`text-[14px] font-bold ${item.color}`}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
