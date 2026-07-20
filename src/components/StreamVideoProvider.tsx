import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/expo";
import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";
import Constants from "expo-constants";
import { ActivityIndicator, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const getApiUrl = (path: string) => {
  const hostUri = Constants.expoConfig?.hostUri;
  const baseUrl = hostUri ? `http://${hostUri}` : "http://localhost:8081";
  return `${baseUrl}${path}`;
};

export const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [client, setClient] = useState<StreamVideoClient>();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!user) {
      if (client) {
        client.disconnectUser().catch(console.error);
        setClient(undefined);
      }
      return;
    }

    const streamUser: User = {
      id: user.id,
      name: user.firstName || user.id,
      image: user.imageUrl,
    };

    const tokenProvider = async () => {
      const response = await fetch(getApiUrl("/api/stream/token"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await response.json();
      return data.token;
    };

    const c = StreamVideoClient.getOrCreateInstance({
      apiKey: process.env.EXPO_PUBLIC_STREAM_API_KEY || "dummy",
      user: streamUser,
      tokenProvider,
    });

    setClient(c);

    return () => {
      c.disconnectUser().catch(console.error);
      setClient(undefined);
    };
  }, [user?.id]);

  if (!client) {
    return <>{children}</>;
  }

  // Pass insets to the theme so CallContent respects safe areas
  const theme = {
    variants: { insets },
  };

  return (
    <StreamVideo client={client} style={theme}>
      {children}
    </StreamVideo>
  );
};
