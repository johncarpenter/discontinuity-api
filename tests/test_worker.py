from discontinuity_api.workers import design_pdf_loading, retrieval_qa
from discontinuity_api.vector import get_vector_db, query_index


def test_design_pdf_loading():
    # design_pdf_loading()
    assert True


def test_query_design_pdf_loading():
    db = get_vector_db(table_name="winefolly")

    reponse = query_index(index=db, query="What are some italian varieties?")

    print(reponse)
    assert True


def test_retrieval_qa():
    db = get_vector_db(table_name="winefolly")

    reponse = retrieval_qa(index=db, query="What makes port special?")
    print(reponse)

    assert True
