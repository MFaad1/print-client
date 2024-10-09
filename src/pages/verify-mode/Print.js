import * as React from "react";
import './index.css'

const Print = React.forwardRef((props, ref) => {
  const iframeRef = React.useRef(null);

  
  const isImage = (url) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  const isPDF = (url) => /\.pdf$/i.test(url);
  const isWord = (url) => /\.(doc|docx)$/i.test(url);
  const isExcel = (url) => /\.(xls|xlsx)$/i.test(url);
  const isPowerPoint = (url) => /\.(ppt|pptx)$/i.test(url);
  


  return (
    <div className="main_container" ref={ref}>
      {isImage(props.fileUrl) ? (
        <img alt="Document Image" src={props.fileUrl} width="200" />
      ) : isPDF(props.fileUrl) ? (

        <iframe
        className="isPdf"
          id="print-iframe"
          title="Document PDF"
          src={props.fileUrl}
          width="100%"
          height="600px"
          style={{ display: "none" }}

        ></iframe>
      ) : isWord(props.fileUrl) ? (
  
        <iframe
          title="Word Document"
          src={`https://docs.google.com/gview?url=${props.fileUrl}&embedded=true`}
          width="100%"
          height="600px"
          style={{ display: "none" }}
        ></iframe>
      ) : isExcel(props.fileUrl) ? (
    
        <iframe
          title="Excel Document"
          src={`https://docs.google.com/gview?url=${props.fileUrl}&embedded=true`}
          width="100%"
          height="600px"
          style={{ display: "none" }}
        ></iframe>
      ) : isPowerPoint(props.fileUrl) ? (
   
        <iframe
          title="PowerPoint Document"
          src={`https://docs.google.com/gview?url=${props.fileUrl}&embedded=true`}
          width="100%"
          height="600px"
          style={{ display: "none" }}
        ></iframe>
      ) : (

        <p>Unsupported file format. <a href={props.fileUrl} download>Download the file</a>.</p>
      )}
    </div>
  );
});

export default Print;
