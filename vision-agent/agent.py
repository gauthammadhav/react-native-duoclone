import os
from dotenv import load_dotenv

# Load the .env file located in the same directory as this script
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from vision_agents.core import Agent, User, Runner, AgentLauncher
from vision_agents.plugins import getstream, openai

def create_agent():
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="Teacher", id="ai-teacher"),
        instructions="You are an AI language teacher. By default you always speak English and teach the selected language through English. Keep your responses concise and friendly.",
        llm=openai.Realtime(),
    )

async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs):
    call = await agent.create_call(call_type, call_id)
    
    # Retrieve the custom data packed from the frontend
    try:
        call_response = await call.get()
        custom = getattr(call_response.call, "custom", {})
    except Exception:
        custom = {}
        
    ai_prompt = custom.get("ai_teacher_prompt", "You are an AI language teacher.")
    language = custom.get("language", "en")
    goal = custom.get("goal", "")
    vocabulary = custom.get("vocabulary", [])
    phrases = custom.get("phrases", [])
    
    agent.instructions = f"{ai_prompt}\n\nContext:\n- Language: {language}\n- Goal: {goal}\n- Vocabulary: {vocabulary}\n- Phrases: {phrases}\n\nKeep your responses concise and friendly."

    async with agent.join(call):
        await agent.simple_response("Hi there! I'm your AI language teacher. Are you ready to practice?")
        await agent.finish()

if __name__ == "__main__":
    runner = Runner(AgentLauncher(create_agent=create_agent, join_call=join_call))
    runner.cli()
