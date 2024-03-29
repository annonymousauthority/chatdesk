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


router = APIRouter()


@router.post("/queryembeddings/")
async def query_embeddings(request_body: QueryRequest = Body(...)):
    query = request_body.query
    document = [
        "The School of AI is an AI learning community that teaches you the fundamental building blocks in building and integrating AI models for commercial software applications. You will learn Classification, Vector Database, Python, Natural Language Processing, and Generative AI. The Program is broken down into 3 Tiers spread across a year, each student starts from the first tier and decides to go up the other Tiers.",
        "You will learn Classification, Vector Database, Python, Natural Language Processing, and Generative AI. The Program is broken down into 3 Tiers spread across a year, each student starts from the first tier and decides to go up the other Tiers. The admission fee for Tier I is $250, covering 4 months.",
        "The Program is broken down into 3 Tiers spread across a year, each student starts from the first tier and decides to go up the other Tiers. The admission fee for Tier I is $250, covering 4 months. The admission fee for Tier II is $500, covering 4 months.",
        "The admission fee for Tier I is $250, covering 4 months. The admission fee for Tier II is $500, covering 4 months. The admission fee for Tier III is $750, Covering 4 months.",
        "The admission fee for Tier II is $500, covering 4 months. The admission fee for Tier III is $750, Covering 4 months. The program uses a Fee payment plan for its students where payment is made monthly.",
        "The admission fee for Tier III is $750, Covering 4 months. The program uses a Fee payment plan for its students where payment is made monthly. We also offer scholarships and admission fee adjustments for certain countries.",
        "The program uses a Fee payment plan for its students where payment is made monthly. We also offer scholarships and admission fee adjustments for certain countries. Here’s the link to register: https://learnwithaugustine.com/applynow .",
        "We also offer scholarships and admission fee adjustments for certain countries. Here’s the link to register: https://learnwithaugustine.com/applynow . Your learning will be done online via Discord, and your learning materials will be uploaded to a private folder on your Google Drive.",
        "Here’s the link to register: https://learnwithaugustine.com/applynow . Your learning will be done online via Discord, and your learning materials will be uploaded to a private folder on your Google Drive. You will also access a learning leaderboard where everyone is evaluated based on their submissions.",
        "Your learning will be done online via Discord, and your learning materials will be uploaded to a private folder on your Google Drive. You will also access a learning leaderboard where everyone is evaluated based on their submissions. If you want to know more about what the curriculum covers, you can visit https://learnwithaugustine.com/#program .",
    ]
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
            category="Customer Rep",
            context=document_rereanked.results[0].document,
        )

        response = client.chat.completions.create(
            model="gpt-4-1106-preview",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt},
            ],
        )
        return {
            "retrieved_document": document_rereanked.results[0].document,
            "augmented_response": response.choices[0].message.content,
        }
    except Exception as e:
        error_logger.error(f"Error uploading file {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error ${str(e)}")
