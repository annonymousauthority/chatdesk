from fastapi import APIRouter, Body
from fastapi import FastAPI, File, UploadFile, HTTPException
import os

from openai import OpenAI
from pydantic import BaseModel
from helpers.document_format import format_document
from logging import getLogger
from helpers.detect_encoding import detect_encoding
from helpers.extract_pdf import extract_text_from_pdf
from helpers.chat_system import voyage_embed
from helpers.list_converter import list_to_string
from helpers.prompt_structure import prompt_structure

# logger code
debug_logger = getLogger("debug_logger")
info_logger = getLogger("info_logger")
error_logger = getLogger("error_logger")


class QueryRequest(BaseModel):
    query: str
    category: str
    context: str


router = APIRouter()


@router.post("/augmentresponse/")
async def augment_response(request_body: QueryRequest = Body(...)):
    query = request_body.query
    category = request_body.category
    context = request_body.context

    client = OpenAI(api_key="YOUR OPENAI API KEY")
    prompt = prompt_structure(prompt=query, category=category, context=context)

    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )

    return {"response": response}
