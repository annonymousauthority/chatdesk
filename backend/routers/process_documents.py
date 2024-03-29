from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile, HTTPException
import os
from helpers.document_format import format_document
from logging import getLogger
from helpers.detect_encoding import detect_encoding
from helpers.extract_pdf import extract_text_from_pdf
from helpers.chat_system import voyage_embed
from helpers.list_converter import list_to_string

# logger code
debug_logger = getLogger("debug_logger")
info_logger = getLogger("info_logger")
error_logger = getLogger("error_logger")


router = APIRouter()


@router.post("/chunkdocument/")
async def create_chunk_document(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        detect_encoding(contents)
        text = extract_text_from_pdf(contents)

        document_chunk = format_document(text)
        embedded_document = voyage_embed(document_chunk)
        info_logger.info(f"File successfully chunked.")
        return {
            "chunks": document_chunk,
            "embeddings": list_to_string(embedded_document),
        }
    except Exception as e:
        error_logger.error(f"Error uploading file {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
