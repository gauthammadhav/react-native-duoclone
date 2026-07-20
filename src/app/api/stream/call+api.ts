import { StreamClient } from "@stream-io/node-sdk";
import { createClerkClient } from "@clerk/backend";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET!;
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY!;

const stream = new StreamClient(STREAM_API_KEY || "dummy", STREAM_API_SECRET || "dummy");

const clerk = createClerkClient({
  publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: CLERK_SECRET_KEY,
});

export async function POST(request: Request) {
  try {
    const requestState = await clerk.authenticateRequest(request);
    if (!requestState.isSignedIn) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = requestState.toAuth().userId;

    const body = await request.json();
    const { lessonId, language } = body;
    }

    const callId = `lesson-${lessonId}`;
    
    // Create the call server-side
    const call = stream.video.call("audio_room", callId);
    await call.getOrCreate({
      data: {
        created_by_id: userId,
        members: [{ user_id: userId }],
        custom: {
          language: language || "en",
          lessonId,
        },
      },
    });

    return Response.json({ callId });
  } catch (error) {
    console.error("Stream call API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
