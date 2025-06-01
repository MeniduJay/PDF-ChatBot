const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

const app = express();

app.use(cors());
app.use(express.json());

// Middleware used for file uploading
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2000 * 1024 * 1024 }, // Limit file size to 200MB

  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});

// Endpoint to handle file upload
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const form = new FormData();
    form.append(
      "file",
      fs.createReadStream(req.file.path),
      req.file.originalname
    );

    const response = await axios.post("http://localhost:8000/upload/", form, {
      headers: {
        "content-type": "application/pdf",
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    fs.unlinkSync(req.file.path, () => {});

    res.json(response.data);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

//  Error handling middleware for Multer and custom errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File too large. Max 200MB allowed." });
    }
  } else if (err.message === "Only PDF files are allowed") {
    return res
      .status(400)
      .json({ error: "Invalid file type. Only PDFs are allowed." });
  }

  return res.status(500).json({ error: "Something went wrong." });
});

// User Question Endpoint
app.post("/ask", async (req, res) => {
  console.log("Received question:", req.body);
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/ask/",
      { question: question },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error asking question:", error);

    if (error.response) {
      console.error("Fast api error:", error.response.data);
    }

    res.status(500).json({ error: "Failed to process question" });
  }
});

app.listen(3000, () => console.log("Server is running on port 3000"));
