import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./Pdf_upload.css";

function Pdf_upload() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [questions, setQuestions] = useState<string>(""); // State for generated questions
  const [loading, setLoading] = useState<boolean>(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [selectedFileType, setSelectedFileType] = useState<string>("pdf"); // State for file type selection

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFileType(e.target.value); // Update selected file type (pdf or ppt)
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const endpoint =
      selectedFileType === "pdf"
        ? "http://127.0.0.1:8080/summarize_pdf/"
        : "http://127.0.0.1:8080/summarize_ppt/"; // Change endpoint based on file type selection

    try {
      setLoading(true);
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSummary(response.data.summary);
      setQuestions(""); // Clear previously generated questions
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const endpoint =
      selectedFileType === "pdf"
        ? "http://127.0.0.1:8080/gen_ques_pdf"
        : "http://127.0.0.1:8080/gen_ques_ppt"; // Change endpoint based on file type selection

    try {
      setLoading(true);
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setQuestions(response.data.summary); // Set generated questions
      setSummary(""); // Clear previous summary
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.message);
      } else {
        console.error("An unknown error occurred", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const displayContent = summary || questions;
    if (displayContent) {
      const lines = displayContent.split("\n");
      setDisplayedLines([]); // Reset displayed lines
      setTyping(true);

      lines.forEach((line, index) => {
        setTimeout(() => {
          setDisplayedLines((prev) => [...prev, line]);
          if (index === lines.length - 1) setTyping(false);
        }, index * 500); // Adjust delay (500ms) for typing speed
      });
    }
  }, [summary, questions]);

  const handleDownload = async () => {
    const content = summary || questions; // Choose summary or questions to download
    if (!content) {
      alert("No content available to download!");
      return;
    }

    // Create a new PDF document
    const doc = new jsPDF();
    let yPosition = 10; // Initial vertical position
    const lineHeight = 10; // Line height

    // Split the content into lines
    const lines = content.split("\n");

    // Loop through lines and add text to the PDF
    lines.forEach((line) => {
      const parts = line.split(/(\*\*.*?\*\*)/); // Split by bold markers `**`
      let xPosition = 10; // Reset xPosition for each line

      parts.forEach((part) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          // Bold text
          const text = part.slice(2, -2); // Remove `**`
          doc.setFont("Helvetica", "bold");
          doc.text(text, xPosition, yPosition);
        } else {
          // Normal text
          doc.setFont("Helvetica", "normal");
          doc.text(part, xPosition, yPosition);
        }
        xPosition += doc.getTextWidth(part) + 2; // Increment xPosition
      });

      yPosition += lineHeight;

      // Check if the yPosition exceeds the page height and add a new page if necessary
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10; // Reset yPosition for the new page
      }
    });

    // Save the PDF file
    doc.save(questions ? "questions.pdf" : "summary.pdf");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>File Processor</h1>

      {/* Select file type (PDF or PPT) */}
      <div>
        <label>Select File Type: </label>
        <select value={selectedFileType} onChange={handleFileTypeChange}>
          <option value="pdf">PDF</option>
          <option value="ppt">PPT</option>
        </select>
      </div>

      {/* File input */}
      <input
        type="file"
        accept={
          selectedFileType === "pdf"
            ? "application/pdf"
            : "application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
        }
        onChange={handleFileChange}
      />

      {/* Upload button */}
      <div>
        <button onClick={handleUpload} disabled={loading}>
          {loading
            ? "Uploading..."
            : selectedFileType === "pdf"
            ? "Summarize PDF"
            : "Summarize PPT"}
        </button>
      </div>

      {/* Generate Questions button */}
      <div>
        <button onClick={handleGenerateQuestions} disabled={loading}>
          {loading
            ? "Generating..."
            : selectedFileType === "pdf"
            ? "Generate PDF Questions"
            : "Generate PPT Questions"}
        </button>
      </div>

      {/* Display content (summary or questions) */}
      {displayedLines.length > 0 && (
        <div>
          <h2>{summary ? "Summary:" : "Questions:"}</h2>
          <div>
            {displayedLines.map((line, index) => (
              <p
                key={index}
                style={{
                  fontWeight: line.trim().endsWith(":") ? "bold" : "normal",
                  fontSize: line.trim().endsWith(":") ? "1.2rem" : "1rem",
                  marginBottom: line.trim().endsWith(":") ? "8px" : "4px",
                }}
              >
                {line}
              </p>
            ))}
          </div>
          {!typing && (
            <button onClick={handleDownload}>
              Download {summary ? "Summary" : "Questions"} as PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Pdf_upload;
