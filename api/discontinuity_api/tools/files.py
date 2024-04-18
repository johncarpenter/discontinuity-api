from langchain.tools import tool


@tool
def workspace_files(wordspaceId:str) -> dict:
    """ Returns the list of files within the workspace"""


    return response