from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.summary import generate_summary
from app.services.pdf_utils import extract_text_from_pdf,get_text_chunks
from app.services.llm_util import get_vector_store
from app.services.qa import user_input
from pydantic import BaseModel

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str

@router.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    # Function to handle PDF file upload
    
    try:

        contents = await file.read()
        if not contents:
            raise HTTPException(status_code=400, detail="Empty file uploaded")

        #extract text from the PDF file
        text = extract_text_from_pdf(contents)
        if not text:
            raise HTTPException(status_code=400, detail="failed to extract text from the PDF")

        #generate summary from the extracted text
        summary = generate_summary(text)

        #split text into chunks
        text_chunks = get_text_chunks(text)

        #store embedded text chunks in a vector store
        get_vector_store(text_chunks)
        

        return {
            "message": "PDF uploaded and processed successfully",
            "summary": summary
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

    
@router.post("/ask/")
async def ask_question(request: QuestionRequest):
    #Function to handle user question input

    try:

        question = request.question.strip()

        if not question:
            raise HTTPException(status_code=400, detail="Question cannot be empty")
    
        #get the answer to the user question
        answer = user_input(question)

        return {
            "message": question,
            "answer": answer
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    

