import os 
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from app.config import GOOGLE_API_KEY

def generate_summary(text):
    # Function to generate a summary of the given text using Google Generative AI

    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash",temperature=0.3, google_api_key=GOOGLE_API_KEY)

    prompt_template = """You are a research assistant. Based on the text provided below, extract a concise and structured summary with the following six sections:

1. **Title & Authors** – Provide the title and author names if they are available.
2. **Abstract** – Summarize the abstract in 2–3 sentences. If not present, skip and state: "No abstract found."
3. **Problem Statement** – Clearly identify the core problem or research question. If missing, say: "Problem statement not explicitly mentioned."
4. **Methodology** – Describe the methods or approach used. If missing, say: "Methodology not provided."
5. **Key Results** – List the key findings. If none are found, say: "Key results not found."
6. **Conclusion** – Summarize the conclusions and any implications. If not found, say: "Conclusion not provided."

If most of the information above is missing or unclear, instead provide a brief general summary of the text.

---

Input Text:
{text}
---

Please format your output exactly like this:

**Title & Authors**  
<Your response here>

**Abstract**  
<Your response here>

**Problem Statement**  
<Your response here>

**Methodology**  
<Your response here>

**Key Results**  
<Your response here>

**Conclusion**  
<Your response here>


"""
    prompt = PromptTemplate( template =prompt_template, input_varaibles=["text"] )
    response = model.invoke(prompt.format(text=text))

    return response.content
