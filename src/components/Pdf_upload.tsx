import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function Pdf_upload() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [questions, setQuestions] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [selectedFileType, setSelectedFileType] = useState<string>("pdf");
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState<number | null>(null);

  // Handle file selection
  useEffect(() => {
    const fetchUserId = async () => {
      if (token) {
        try {
          console.log("Fetching user ID with token:", token); // Log token before making request
          const response = await axios.get(
            "http://127.0.0.1:8080/auth/user/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("User ID response:", response.data); // Log response data
          setUserId(response.data.id);
        } catch (error) {
          console.error("Error fetching user ID:", error); // Log error if it occurs
        }
      } else {
        console.log("No token found in localStorage.");
      }
    };

    fetchUserId(); // Call the function to fetch the user ID
  }, [token]); // Dependency on token ensures this runs when the token changes

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle file type selection (PDF or PPT)
  const handleFileTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFileType(e.target.value);
  };

  // Upload the selected file to generate a summary
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    if (userId === null) {
      alert("User not logged in or user ID is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId.toString());

    const endpoint =
      selectedFileType === "pdf"
        ? "http://127.0.0.1:8080/summarize_pdf/"
        : "http://127.0.0.1:8080/summarize_ppt/";

    try {
      setLoading(true);
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSummary(response.data.summary);
      setQuestions("");
    } catch (error) {
      console.error(
        "Error:",
        axios.isAxiosError(error) ? error.message : error
      );
    } finally {
      setLoading(false);
    }
  };

  // Generate questions from the uploaded file
  const handleGenerateQuestions = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    if (!userId) {
      alert("Invalid User");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId.toString());

    const endpoint =
      selectedFileType === "pdf"
        ? "http://127.0.0.1:8080/gen_ques_pdf"
        : "http://127.0.0.1:8080/gen_ques_ppt";

    try {
      setLoading(true);
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setQuestions(response.data.questions);
      console.log("Questions: ", response.data.questions);
      setSummary("");
    } catch (error) {
      console.error(
        "Error:",
        axios.isAxiosError(error) ? error.message : error
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle typing effect for displaying content
  useEffect(() => {
    const displayContent = summary || questions;
    if (displayContent) {
      const lines = displayContent.split("\n");
      setDisplayedLines([]);
      setTyping(true);

      lines.forEach((line, index) => {
        setTimeout(() => {
          setDisplayedLines((prev) => [...prev, line]);
          if (index === lines.length - 1) setTyping(false);
        }, index * 500);
      });
    }
  }, [summary, questions]);

  // Download content (summary or questions) as a PDF
  const handleDownload = async () => {
    const content = summary || questions;
    if (!content) {
      alert("No content available to download!");
      return;
    }

    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth() - 2 * margin;

    const lines = doc.splitTextToSize(content, pageWidth); // Wrap text to fit page width
    let yPosition = margin;

    for (const line of lines) {
      // Check if the text fits on the current page
      if (yPosition + 10 > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        yPosition = margin;
      }

      doc.text(line, margin, yPosition);
      yPosition += 10; // Move down for the next line
    }

    doc.save(questions ? "questions.pdf" : "summary.pdf");
  };

  // Format line for display, handling bold markers
  const formatLine = (line: string) => {
    const trimmedLine = line.trim();
    const isBold = trimmedLine.includes("**");
    const isBulletPoint = trimmedLine.startsWith("-");

    if (isBulletPoint) {
      const content = trimmedLine.slice(1).trim(); // Remove the dash
      if (isBold) {
        const boldParts = content.split("**");
        return (
          <li className="list-disc pl-5">
            {boldParts.map((part, index) =>
              index % 2 === 1 ? <strong key={index}>{part}</strong> : part
            )}
          </li>
        );
      }
      return <li className="list-disc pl-5">{content}</li>;
    } else if (isBold) {
      const boldParts = trimmedLine.split("**");
      return (
        <>
          {boldParts.map((part, index) =>
            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
          )}
        </>
      );
    }

    return line;
  };

  return (
    <div className="container mx-auto p-5 max-w-3xl">
      <h1 className="text-center text-3xl font-bold mb-5">File Processor</h1>

      {/* Notice Section */}
      <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md mb-5 border border-yellow-300">
        <p>
          <strong>Note:</strong> PDFs must contain text content and not images
          of text (e.g., scanned documents). Ensure your file meets this
          requirement for accurate processing.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <select
          className="p-3 border border-gray-300 rounded-md"
          value={selectedFileType}
          onChange={handleFileTypeChange}
        >
          <option value="pdf">PDF</option>
          <option value="ppt">PPT</option>
        </select>

        <label className="cursor-pointer bg-blue-500 text-white p-3 rounded-md">
          {file ? file.name : "Choose a file"}
          <input
            type="file"
            className="hidden"
            accept={
              selectedFileType === "pdf"
                ? "application/pdf"
                : "application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
            }
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-3 rounded-md"
          onClick={handleUpload}
          disabled={loading || !file}
        >
          {loading
            ? "Processing..."
            : selectedFileType === "pdf"
            ? "Summarize PDF"
            : "Summarize PPT"}
        </button>

        <button
          className="bg-gradient-to-r from-red-500 to-yellow-400 text-white p-3 rounded-md"
          onClick={handleGenerateQuestions}
          disabled={loading || !file}
        >
          {loading
            ? "Generating..."
            : selectedFileType === "pdf"
            ? "Generate PDF Questions"
            : "Generate PPT Questions"}
        </button>
      </div>

      {displayedLines.length > 0 && (
        <div className="bg-gray-100 p-5 rounded-lg mt-5">
          <h2 className="text-2xl font-semibold mb-4">
            {summary ? "Summary:" : "Questions:"}
          </h2>
          <div>
            {displayedLines.map((line, index) => (
              <p
                key={index}
                className={typing ? "typing-effect" : ""}
                style={{
                  fontWeight: line.trim().endsWith(":") ? "600" : "400",
                  fontSize: line.trim().endsWith(":") ? "1.2rem" : "1rem",
                  marginBottom: line.trim().endsWith(":") ? "12px" : "8px",
                }}
              >
                {formatLine(line)}
              </p>
            ))}
          </div>
          {!typing && (
            <button
              className="bg-gradient-to-r from-blue-500 to-green-400 text-white p-3 rounded-md"
              onClick={handleDownload}
            >
              Download {summary ? "Summary" : "Questions"} as PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default Pdf_upload;
