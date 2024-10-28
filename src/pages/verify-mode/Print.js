/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import * as React from "react";
import "./index.css";
import FileRenderer from "../../components/Docs_rendered/FileRenderer";

const Print = React.forwardRef((props, ref) => {
  const iframeRef = React.useRef(null);
  const [numPages, setNumPages] = React.useState(null);

  const isImage = (url) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  const isPDF = (url) => /\.pdf$/i.test(url);
  const isWord = (url) => /\.(doc|docx)$/i.test(url);
  const isExcel = (url) => /\.(xls|xlsx)$/i.test(url);
  const isPowerPoint = (url) => /\.(ppt|pptx)$/i.test(url);

  return (
    <div className="main_container" ref={ref}>
      <FileRenderer
        file={props.fileUrl}
        numPages={numPages}
        setNumPages={setNumPages}
      />
    </div>
  );
});

export default Print;
