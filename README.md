# 📄 PDF Research Assistant

A full-stack application that allows users to upload research papers (PDFs), generate structured summaries (like Title, Abstract, Methodology, etc.), and chat with an AI assistant to ask questions based on the document.

---

![Node.js](https://img.shields.io/badge/node-%3E%3D16-blue)
![Python](https://img.shields.io/badge/python-%3E%3D3.8-yellow)
![MIT License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- 📤 Upload PDF research papers
- 📑 Auto-generate structured summaries (Title, Abstract, Methodology, Results, etc.)
- 🤖 Chat with AI about your uploaded documents
- 📚 Clean book-style UI

---

## 🧰 Tech Stack

- ⚛️ **Frontend:** React + TypeScript
- 🌐 **Backend:** Node.js + Express
- 🤖 **AI Service:** FastAPI + Python + Gemini AI

---

📁 Project Structure
PDF-ChatBot/
├── Frontend/ # React TypeScript application
├── Node-server/ # Express.js backend API
├── LLM/ # FastAPI Python AI service
│ ├── .env # Environment variables (create this)
│ └── .env.example # Environment template
└── README.md # This file

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- Google Gemini API Key (get free at [Google AI Studio](https://aistudio.google.com/app))

---

## ⚡ Quick Start

### 1. Clone the Repository & Install Dependencies

```bash
git clone <your-repo-url>
cd PDF-ChatBot


# Install Frontend Dependencies
cd Frontend &&
npm install &&
cd ..

# Install node.js Dependencies
cd Node-server &&
npm install
cd ..


# Install Python Backend  Dependencies

# Optional but recommended: create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# Install dependencies

cd LLM &&
pip install -r requirements.txt && (if it doesnt work use "py -m pip install -r requirements.txt")
cd..


2. Set Up API Key
# The AI service requires a Google Gemini API key to function:

bash
# Navigate to the LLM directory
cd LLM

# Copy the example environment file
cp .env.example .env

# Open the .env file in your preferred text editor
# For example, using nano:
nano .env

# Or using VS Code:
code .env
4. Configure Your API Key
Edit the .env file and replace the placeholder with your actual Gemini API key:

env
# Replace 'your_gemini_api_key_here' with your actual API key
GEMINI_API_KEY=your_actual_api_key_from_google_ai_studio

# Example (don't use this key, it's just for demonstration):
# GEMINI_API_KEY=AIzaSyD1234567890abcdefghijklmnopqrstuvwxyz

3. Run All Services


Terminal 1 - Python AI Service:
bash
cd LLM
py -m uvicorn app.main:app


Terminal 2 - Node Backend:
bash
cd Node-server
npm run dev


Terminal 3 - React Frontend:
bash
cd Frontend
cd PDF-Chatbot
npm run dev


4. Use the App

🚀 How to Use
Uploading and Analyzing Documents
Upload PDF: Click the upload button and select a research paper (PDF format)
Wait for Processing: The system will extract text and generate a structured summary
Review Summary: View the auto-generated sections (Title, Abstract, Methodology, etc.)
Start Chatting: Use the chat interface to ask questions about the document


Example Questions You Can Ask
"What is the main hypothesis of this research?"
"Summarize the methodology used in this study"
"What were the key findings?"
"How large was the sample size?"
"What are the limitations mentioned by the authors?"

🛠️ Troubleshooting
Common Issues
Port Already in Use

bash
# If port 3000, 5000, or 8000 is busy, you can specify different ports:

# For Python service (change port):
python -m uvicorn main:app --reload --port 8001

# For Node backend (change in package.json or use):
PORT=5001 npm run dev
API Key Issues

Ensure your .env file is in the LLM directory
Verify your API key is valid and active
Check that there are no extra spaces around the API key
Dependencies Issues

bash
# Clear npm cache if needed
npm cache clean --force

# Reinstall Python dependencies
pip install -r requirements.txt --force-reinstall
Need Help?
If you encounter any issues:

Check that all three services are running
Verify your API key is correctly configured
Ensure all dependencies are installed
Check the console logs for error messages


```
