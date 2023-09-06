from langchain.document_loaders import UnstructuredPDFLoader
from langchain.embeddings.openai import OpenAIEmbeddings

from discontinuity_api.vector import get_vector_db, add_document


# These can only run locally
#
def design_pdf_loading():
    loader = UnstructuredPDFLoader(file_path="./storage/docs/wf.pdf")
    documents = loader.load()

    db = get_vector_db(table_name="winefolly", embeddings=OpenAIEmbeddings())

    add_document(index=db, documents=documents)

    db.save_local(folder_path="./storage/winefolly")


def wf_pdf_loading():
    loader = UnstructuredPDFLoader(file_path="./storage/docs/typerules.pdf")
    documents = loader.load()

    db = get_vector_db(table_name="design", embeddings=OpenAIEmbeddings())

    add_document(index=db, documents=documents)

    db.save_local(folder_path="./storage/design")
