from typing import List
from fastapi import APIRouter, Body
from fastapi import FastAPI, File, UploadFile, HTTPException
import os
from helpers.document_format import format_document
from logging import getLogger
from helpers.chat_system import query_embeddings
from pydantic import BaseModel

# logger code
debug_logger = getLogger("debug_logger")
info_logger = getLogger("info_logger")
error_logger = getLogger("error_logger")


class QueryRequest(BaseModel):
    query: str
    document: List[str]


router = APIRouter()


@router.post("/queryembeddings/")
async def create_chunk_document(request_body: QueryRequest = Body(...)):
    query = request_body.query
    document = request_body.document

    try:
        document_rereanked = query_embeddings(query=query, document=document)
        for r in document_rereanked.results:
            print(f"Document: {r.document}")
            print(f"Relevance Score: {r.relevance_score}")
            print(f"Index: {r.index}")
            print("\n")
        info_logger.info(f"Query successfull.")
        return {"retrieved_document": document_rereanked.results[0].document}
    except Exception as e:
        error_logger.error(f"Error uploading file {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
