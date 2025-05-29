from PyPDF2 import PdfReader
import io

def extract_text_from_pdf(file_bytes):
    # Function to extract text from a PDF file given as bytes
    pdf = PdfReader(io.BytesIO(file_bytes))
    text=""

    for page in pdf.pages:
        text += page.extract_text() or ""

    return text