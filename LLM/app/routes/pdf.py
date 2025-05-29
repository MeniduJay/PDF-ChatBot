from fastapi import APIRouter, UploadFile, File
from LLM.app.services.summary import generate_summary
from LLM.app.services.pdf_utils import extract_text_from_pdf

router = APIRouter()

@router.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    # Function to handle PDF file upload
    
    contents = await file.read()

    #extract text from the PDF file
    text = extract_text_from_pdf(contents)

    #generate summary from the extracted text
    summary = generate_summary(text)

    return {"summary": summary}

    