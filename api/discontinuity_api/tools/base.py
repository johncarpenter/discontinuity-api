from discontinuity_api.tools.agent_response import AgentResponse, parse
from .workspace_retrievers import create_workspace_retriever_tool
from discontinuity_api.utils import STANDARD_RETRIEVAL_PROMPT, STANDARD_AGENT_CHAT
from langchain_openai import ChatOpenAI
import logging
from langchain.agents import AgentExecutor, create_tool_calling_agent, tool
from langchain.agents.format_scratchpad.openai_tools import format_to_openai_tool_messages
from langchain.agents.format_scratchpad import format_to_openai_function_messages
from langchain.agents.output_parsers.openai_tools import OpenAIToolsAgentOutputParser

logger = logging.getLogger(__name__)

async def get_agent_for_workspace(workspaceId:str, filter:str = "metadata->>'category' in ('NarrativeText','ImageDescription','Transcription','ListItem')"):

    return await default_agent(workspaceId, filter)


async def default_agent(workspaceId:str, filter:str = "metadata->>'category' in ('NarrativeText','ImageDescription','Transcription','ListItem')"): 
    
    logger.info(f"Running default agent for workspace {workspaceId}")

    llm = ChatOpenAI(streaming=True,temperature=0.5, model="gpt-4")

    retriever_tool = await create_workspace_retriever_tool(workspaceId, filter)

    tools = [retriever_tool]

    prompt = STANDARD_AGENT_CHAT

    #agent = create_tool_calling_agent(model, tools, prompt)   
    llm_with_tools = llm.bind_tools(tools)

    agent = (
        {
            "input": lambda x: x["input"],
            "chat_history": lambda x: x["chat_history"],
            "agent_scratchpad": lambda x: format_to_openai_tool_messages(x["intermediate_steps"])

        }
        | prompt
        | llm_with_tools
        | OpenAIToolsAgentOutputParser()
    )
    
     
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=False)
    
    return agent_executor

