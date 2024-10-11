import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import '../../components/Docs_rendered/index.css'

const FileRenderer = ({ file, numPages, setNumPages }) => {

  const fileType = file.file_path.split('.').pop().toLowerCase();
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
console.log(numPages, "file")

  if (fileType === 'pdf') {
    return (
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Document
        file={file.file_path}
        onLoadSuccess={onDocumentLoadSuccess}
        style={{ width: '100%', height: '100%' }}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={window.innerWidth} // Center the pages
          />
        ))}
      </Document>
    </div>
    );
  } else if (file.type.startsWith("image/")) {
    return <img src={URL.createObjectURL(file)} alt="file" />;
  } else if (file.type.startsWith("application/vnd.openxmlformats-officedocument.wordprocessingml.document") || 
             file.type.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
    return (
      <div>
        <a href={URL.createObjectURL(file)} download={file.name}>
          Download {file.name}
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <p>Unsupported file type</p>
        <a href={URL.createObjectURL(file)} download={file.name}>
          Download {file.name}
        </a>
      </div>
    );
  }
};

export default FileRenderer;
