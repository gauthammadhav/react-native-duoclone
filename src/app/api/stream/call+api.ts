import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET!;

const stream = new StreamClient(STREAM_API_KEY || "dummy", STREAM_API_SECRET || "dummy");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, lessonId, language } = body;

    if (!userId || !lessonId) {
      return Response.json({ error: "Missing userId or lessonId" }, { status: 400 });
    }

    const callId = `lesson-${lessonId}`;
    
    // Create the call server-side
    const call = stream.video.call("audio_room", callId);
    await call.getOrCreate({
      data: {
        created_by_id: userId,
        members: [{ user_id: userId, role: "admin" }],
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
