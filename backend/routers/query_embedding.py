from typing import List
from fastapi import APIRouter, Body
from fastapi import FastAPI, File, UploadFile, HTTPException
import os

from openai import OpenAI
from helpers.document_format import format_document
from logging import getLogger
from helpers.chat_system import embed_query
from pydantic import BaseModel
from helpers.prompt_structure import prompt_structure

# logger code
debug_logger = getLogger("debug_logger")
info_logger = getLogger("info_logger")
error_logger = getLogger("error_logger")


class QueryRequest(BaseModel):
    query: str
    document: List[str]
    category: str
    name: str
    agent: str


router = APIRouter()
MESSAGE_MEMORY = []


@router.post("/queryembeddings/")
async def query_embeddings(request_body: QueryRequest = Body(...)):
    query = request_body.query
    document = request_body.document
    category = request_body.category
    name = request_body.name
    agent = request_body.agent
    MESSAGE_MEMORY.append(query)
    try:
        document_rereanked = embed_query(query=query, document=document)
        for r in document_rereanked.results:
            print(f"Document: {r.document}")
            print(f"Relevance Score: {r.relevance_score}")
            print(f"Index: {r.index}")
            print("\n")

        info_logger.info(f"Query successfull.")

        client = OpenAI(api_key="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")

        prompt = prompt_structure(
            prompt=query,
            category=category,
            context=document_rereanked.results[0].document,
            name=name,
            agent_name=agent,
            chat_history=MESSAGE_MEMORY,
        )

        response = client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {"role": "assistant", "content": "You are a helpful assistant."},
                {"role": "assistant", "content": prompt},
            ],
        )

        return {
            "retrieved_document": document_rereanked.results[0].document,
            "augmented_response": response.choices[0].message.content,
        }
    except Exception as e:
        error_logger.error(f"Error Generating Response {str(e)}")
        print(f"Error Generating Response {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error ${str(e)}")
