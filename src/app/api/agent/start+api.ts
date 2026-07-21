import { createClerkClient } from "@clerk/backend";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY!;

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

    const body = await request.json();
    const { callId } = body;

    if (!callId) {
      return Response.json({ error: "Missing callId" }, { status: 400 });
    }

    const baseUrl = (process.env.AGENT_URL || "http://127.0.0.1:8080").replace(/\/$/, "");
    const agentServerUrl = `${baseUrl}/calls/${callId}/sessions`;
    
    // Ping the vision agent local HTTP server
    const response = await fetch(agentServerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        call_type: "audio_room"
      }),
    });

    if (!response.ok) {
      throw new Error(`Agent server responded with ${response.status}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Agent start API error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
