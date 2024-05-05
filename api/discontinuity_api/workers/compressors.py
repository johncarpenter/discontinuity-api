from copy import deepcopy
import logging
from typing import Any, Dict, List, Optional, Sequence, Union

from langchain_core._api.deprecation import deprecated
from langchain_core.callbacks.manager import Callbacks
from langchain_core.documents import Document
from langchain_core.pydantic_v1 import Extra, root_validator
from langchain_core.utils import get_from_dict_or_env

from langchain.retrievers.document_compressors.base import BaseDocumentCompressor


logger = logging.getLogger(__name__)

class AppendMetadataCompressor(BaseDocumentCompressor):
     
     def compress_documents(
        self,
        documents: Sequence[Document],
        query: str,
        callbacks: Optional[Callbacks] = None,
    ) -> Sequence[Document]:
    
        logger.info(f"Appending Filename to Document Content")
        compressed = []
        for doc in documents:
            page_content = f"\n\n{doc.page_content}\n\nFilename: {doc.metadata['file']}"
            doc_copy = Document(page_content, metadata=deepcopy(doc.metadata))
            compressed.append(doc_copy)
        return compressed
     

class CohereRerankFilter(BaseDocumentCompressor):
     
     score_threshold: float = 0.5

     def __init__(self, score_threshold: float = 0.5):
         super().__init__()
         self.score_threshold = score_threshold
     
     def compress_documents(
        self,
        documents: Sequence[Document],
        query: str,
        callbacks: Optional[Callbacks] = None,
    ) -> Sequence[Document]:
    
        logger.info(f"Filtering Documents with Relevance score > {self.score_threshold}")
         
        compressed = []
        for doc in documents:
            if not "relevance_score" in doc.metadata:
                raise ValueError("Document does not have a relevance_score")

            logger.info(f"Relevance Score: {doc.metadata['relevance_score']} filename: {doc.metadata['file']}")  

            if doc.metadata["relevance_score"] > self.score_threshold:                
                compressed.append(doc)
        return compressed