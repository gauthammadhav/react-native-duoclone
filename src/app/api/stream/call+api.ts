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

    const body = (await request.json()) as unknown;
    
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { lessonId, language, goal, vocabulary, phrases, ai_teacher_prompt, script } = body as Record<string, unknown>;

    if (typeof lessonId !== "string" || !lessonId) {
      return Response.json({ error: "Missing or invalid lessonId" }, { status: 400 });
    }

    const isArray = (arr: unknown): arr is any[] => Array.isArray(arr);
    const isStringArray = (arr: unknown): arr is string[] => 
      Array.isArray(arr) && arr.every(item => typeof item === "string");

    if (language !== undefined && typeof language !== "string") return Response.json({ error: "Invalid language" }, { status: 400 });
    if (goal !== undefined && typeof goal !== "string") return Response.json({ error: "Invalid goal" }, { status: 400 });
    if (ai_teacher_prompt !== undefined && typeof ai_teacher_prompt !== "string") return Response.json({ error: "Invalid ai_teacher_prompt" }, { status: 400 });
    
    // We allow vocabulary, phrases, and script to be passed through directly to Stream custom data.

    const callId = `lesson-v2-${userId}-${lessonId}-${Date.now()}`;
    
    const call = stream.video.call("audio_room", callId);
    await call.getOrCreate({
      data: {
        created_by_id: userId,
        members: [
          { user_id: userId },
          { user_id: "ai-teacher", role: "admin" }
        ],
        custom: {
          language: language || "en",
          lessonId,
          goal: goal || "",
          vocabulary: vocabulary || [],
          phrases: phrases || [],
          ai_teacher_prompt: ai_teacher_prompt || "",
          script: script || []
        },
        settings_override: {
          transcription: {
            mode: "auto-on",
            closed_caption_mode: "auto-on",
            language: language || "en",
          }
        }
      },
    });

    // Ensure the AI teacher has the admin role even if the call already existed
    await call.updateCallMembers({
      update_members: [
        { user_id: "ai-teacher", role: "admin" }
      ]
    });

    return Response.json({ callId });
  } catch (error: any) {
    console.error("Stream call API error details:", error?.response?.data || error);
    return Response.json({ error: "Internal server error", details: error?.message }, { status: 500 });
  }
}
