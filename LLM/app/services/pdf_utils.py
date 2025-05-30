from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter

import io

def extract_text_from_pdf(file_bytes):
    # Function to extract text from a PDF file given as bytes
    pdf = PdfReader(io.BytesIO(file_bytes))
    text=""

    for page in pdf.pages:
        text += page.extract_text() or ""

    return text

def get_text_chunks(text):
    # Function to split text into chunks of approximately 1000 characters

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, 
        chunk_overlap=1000,
    )

    chunks = text_splitter.split_text(text)
    return chunks
    
