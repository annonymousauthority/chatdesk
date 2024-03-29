import voyageai


def voyage_embed(documents):

    vo = voyageai.Client(api_key="pa-brrh3dJ02Q_orn6njC0DTCMyiivHhGGEiKv1ETXElco")

    documents_embeddings = vo.embed(
        documents, model="voyage-2", input_type="document"
    ).embeddings

    return documents_embeddings


def embed_query(query, document):
    vo = voyageai.Client(api_key="pa-brrh3dJ02Q_orn6njC0DTCMyiivHhGGEiKv1ETXElco")

    query_embedding = vo.embed(
        [query], model="voyage-2", input_type="query"
    ).embeddings[0]

    documents_reranked = vo.rerank(query, document, model="rerank-lite-1", top_k=1)

    return documents_reranked
