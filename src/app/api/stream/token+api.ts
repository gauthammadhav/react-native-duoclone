import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET!;

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  console.warn("Missing Stream API keys in environment variables");
}

const stream = new StreamClient(STREAM_API_KEY || "dummy", STREAM_API_SECRET || "dummy");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return Response.json({ error: "Missing userId" }, { status: 400 });
    }

    const token = stream.generateUserToken({
      user_id: userId,
      validity_in_seconds: 60 * 60 * 4,
    });

    return Response.json({ token });
  } catch (error) {
    console.error("Stream token API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
