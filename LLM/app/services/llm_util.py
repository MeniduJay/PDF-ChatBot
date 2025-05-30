from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain

from app.config import GOOGLE_API_KEY



def get_vector_store(text_chunks):
    # Function to create a vector store from text chunks using Google Generative AI embeddings

    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.from_texts(text_chunks, embeddings)

    vector_store.save_local("faiss_index")


def get_conversational_chain():
    # Function to get a conversational chain for question answering
    
    prompt_template = """
    You are an academic assistant helping to answer user questions based on research paper content. Use the context below to answer the question as accurately as possible. 

    If the answer is not present in the context, reply with:
    "I couldn’t find relevant information in the provided text."

    ---

    Context:
    {context}

    ---

    Question:
    {question}

    ---

    Answer:
    """
 
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3, google_api_key=GOOGLE_API_KEY)

    prompt = PromptTemplate(
        template=prompt_template, 
        input_variables=["context", "question"]
    )

    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    

    return chain