/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "../../components/Docs_rendered/index.css";
import "./index.css";

const FileRenderer = ({ file, numPages, setNumPages }) => {
  const fileType = file.file_path.split(".").pop().toLowerCase();
  console.log(fileType, "file Type");

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  console.log(numPages, "file");

  if (fileType === "pdf") {
    return (
      <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Document
          file={file.file_path}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("PDF loading error:", error)}
          style={{ width: "100%", height: "100%" }}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              className="pdf-page"
            />
          ))}
        </Document>
      </div>
    );
  } else if (fileType === "png" || fileType === "jpeg" || fileType === "jpg") {
    return <img src={file.file_path} alt="file" style={{ maxWidth: "100%" }} />;
  } else if (fileType === "docx" || fileType === "xlsx") {
    return (
      <div>
        <a
          href={file.file_path}
          download={file.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download {file.name}
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <a href={file.file_path} download={file.name}>
          Download {file.name}
        </a>
      </div>
    );
  }
};

export default FileRenderer;
