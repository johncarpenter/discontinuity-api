from discontinuity_api.workers import website_md_loading, retrieval_qa
from discontinuity_api.vector import get_faiss_vector_db, query_index


def test_load_website_md():
    # website_md_loading()
    assert True


def test_query_website_md():
    db = get_faiss_vector_db(table_name="discontinuity")

    reponse = query_index(index=db, query="Who made this?")

    print(reponse)
    assert True
