from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from pydantic import BaseModel, Field
from discontinuity_api.database.dbmodels import get_db
from discontinuity_api.database.api import getPrompt
import logging
from langchain.output_parsers import PydanticOutputParser
from sqlalchemy.orm import Session

logger = logging.getLogger(__name__)


def build_agent_chat_prompt(system_message):
    return ChatPromptTemplate.from_messages(
        [
            ("system", system_message),
            ("placeholder", "{chat_history}"),
            ("human", "{input}"),
            ("placeholder", "{agent_scratchpad}"),
        ]
    )



STANDARD_RETRIEVAL_PROMPT = PromptTemplate.from_template("""
System: You are a conversational chat bot assistant that uses the Documents as context to answer the users questions. The Documents are a list of files that have been provided to you by the user. You can use the Documents to help answer the users questions. Do your best to answer the question based on the context provided. If you reference a Document let the user know which document you are referencing. If you reference information that is not in the Documents, let the user know that you are providing information that is not in the Documents and they should verify the information.
 
All output should be in markdown format.

Documents:
{context}

Question:
{input}

""")


agent_chat= """
You are a helpful assistant. Your goal is to help the user search through files in their workspace. 

use the workspace_file_list tool if the user asks about metadata on the files in the workspace. 

use the workspace_retriever tool if the user asks about the content of the files in the workspace. Do not make more than one call to the workspace_retriever tool, if the user asks about the content of multiple files in the workspace, combine the requests into one call to the workspace_retriever tool.


Choose one of the two tools to help the user with their question.

"""

STANDARD_AGENT_CHAT = build_agent_chat_prompt(agent_chat)

STANDARD_PROMPT = """
System: You are a conversational chat bot assistant that uses the Documents as context to answer the users questions. The Documents are a list of files that have been provided to you by the user. You can use the Documents to help answer the users questions. Do your best to answer the question based on the context provided. If you reference a Document let the user know which document you are referencing. If you reference information that is not in the Documents, let the user know that you are providing information that is not in the Documents and they should verify the information.
 
All output should be in markdown format.

Documents:
{context}

Question:
{input}
"""

TAVILY_PROMPT = """
Your tools: 
tavily_search_results_json is a tool that searches the web for information based on the user's question. It returns the top 5 search results in JSON format. Only use the tool if the user asks for a web search. 
"""

TOOL_PROMPT = """
TOOLS:

------

Assistant has access to the following tools:

{tools}

To use a tool, please use the following format:

```

Thought: Do I need to use a tool? Yes

Action: the action to take, should be one of [{tool_names}]

Action Input: the input to the action

Observation: the result of the action

```

When you have a response to say to the Human, or if you do not need to use a tool, you MUST use the format:

```

Thought: Do I need to use a tool? No

Final Answer: [your response here]

```
"""


def get_prompt_by_id(session: Session, prompt_id:str):
    
    if not prompt_id:
        logger.info("Using Standard Agent Chat (no prompt provided)")
        return STANDARD_AGENT_CHAT
    
    prompt = getPrompt(session=session, prompt_id=prompt_id)

    
    if prompt is None:
        logger.info("Using Standard Agent Chat (unable to find prompt)")
        return STANDARD_AGENT_CHAT
    else:
        logger.info(f"Using Custom Prompt {prompt.id}-{prompt.name}")

        template = build_agent_chat_prompt(prompt.prompt)

        #template.partial(format_instructions=getMemoryParser().get_format_instructions())

        return template


def getMemoryParser():
    
    return PydanticOutputParser(pydantic_object=Memory)


class Memory(BaseModel):
    """ Information about the context of the conversation """

    sentiment: str = Field(None, description="The sentiment of the conversation")
    context: str = Field(None, description="The context of the conversation")

