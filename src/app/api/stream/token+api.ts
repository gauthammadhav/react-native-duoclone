import { StreamClient } from "@stream-io/node-sdk";
import { createClerkClient } from "@clerk/backend";

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET!;
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY!;

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  console.warn("Missing Stream API keys in environment variables");
}

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
