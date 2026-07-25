import os
from dotenv import load_dotenv

# Load the .env file located in the same directory as this script
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from vision_agents.core import Agent, User, Runner, AgentLauncher
from vision_agents.plugins import getstream, gemini

def create_agent():
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="Teacher", id="ai-teacher"),
        instructions="You are an AI language teacher. By default you always speak English and teach the selected language through English. Keep your responses concise and friendly.",
        llm=gemini.Realtime(),
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
    script = custom.get("script", [])
    
    script_text = "\n".join([f"{i+1}. {msg}" for i, msg in enumerate(script)]) if script else ""
    
    from vision_agents.core.instructions import Instructions
    
    instructions_text = f"""{ai_prompt}

Context:
- Language: {language}
- Goal: {goal}
- Vocabulary: {vocabulary}
- Phrases: {phrases}
- Script:
{script_text}

IMPORTANT INSTRUCTIONS:
Act as a warm, human, energetic, and encouraging real-world language teacher for the {language} language. 
- Stay strictly within this lesson's goal, vocabulary, phrases, and context. Do not teach unrelated topics or switch to other languages.
- Mostly speak English. Introduce target-language words slowly, always providing the English translation.
- Use short, natural sentences with contractions and gentle encouragement.
- Listen to the user's response, adapt your next explanation accordingly, and ask the student to repeat or try again.
- Keep your replies to one or two conversational sentences.
"""
    agent.instructions = Instructions(input_text=instructions_text)

    async with agent.join(call):
        first_message = f"Hi! I'm your {language} teacher. Today we're going to practice: {goal}. Are you ready to get started?"
        await agent.simple_response(first_message)
        import asyncio
        await asyncio.Event().wait()

if __name__ == "__main__":
    runner = Runner(AgentLauncher(create_agent=create_agent, join_call=join_call))
    runner.cli()
