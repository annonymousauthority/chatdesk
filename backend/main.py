from fastapi import FastAPI, File, UploadFile, HTTPException
from logger_setup import setup_logger
from logging import getLogger
import os
from routers import process_documents, query_embedding
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

setup_logger()

# logger code
debug_logger = getLogger("debug_logger")
info_logger = getLogger("info_logger")
error_logger = getLogger("error_logger")

app.include_router(process_documents.router)
app.include_router(query_embedding.router)


@app.get("/")
async def root():
    return {"Information": f"This is the root of the application."}


if __name__ == "__main__":
    import uvicorn

    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 8000))

    uvicorn.run(app, host=host, port=port, reload=True)
