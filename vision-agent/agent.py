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
        if not custom and isinstance(call_response.call, dict):
            custom = call_response.call.get("custom", {})
    except Exception as e:
        print(f"Error fetching call custom data: {e}")
        custom = {}
        
    print("Retrieved custom data:", custom)
        
    ai_prompt = custom.get("ai_teacher_prompt", "")
    if not ai_prompt:
        ai_prompt = "You are an AI language teacher."
        
    lang_code = custom.get("language", "en")
    
    LANG_MAP = {
        "es": "Spanish", "fr": "French", "ja": "Japanese",
        "de": "German", "it": "Italian", "ko": "Korean",
        "zh": "Chinese", "pt": "Portuguese", "en": "English"
    }
    language = LANG_MAP.get(lang_code, lang_code)
    
    goal = custom.get("goal", "")
    
    # Format vocabulary and phrases gracefully
    vocab_list = custom.get("vocabulary", [])
    if isinstance(vocab_list, list) and len(vocab_list) > 0 and isinstance(vocab_list[0], dict):
        vocabulary = ", ".join([f"{v.get('word', '')} ({v.get('translation', '')})" for v in vocab_list])
    else:
        vocabulary = str(vocab_list)
        
    phrase_list = custom.get("phrases", [])
    if isinstance(phrase_list, list) and len(phrase_list) > 0 and isinstance(phrase_list[0], dict):
        phrases = ", ".join([f"{p.get('phrase', '')} ({p.get('translation', '')})" for p in phrase_list])
    else:
        phrases = str(phrase_list)

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
