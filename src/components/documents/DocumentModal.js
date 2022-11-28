import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import {
  HorizontalScrollingIcon,
  VerticalScrollingIcon,
  WrappedScrollingIcon,
  scrollModePlugin,
} from "@react-pdf-viewer/scroll-mode";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Document, Page } from "react-pdf";

const DocumentModal = ({ documentOrImage, open }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");
  const [base64, setBase64] = useState("");
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  //  Pdf viewer plugins
  const newPlugin = defaultLayoutPlugin();
  const scrollModePluginInstance = scrollModePlugin();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const toBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      console.log(e.target.result, " result");
      setBase64(e.target.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Document
            height="250"
            width="250"
            file={base64}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            {base64 && (
              <Viewer
                fileUrl={documentOrImage}
                plugins={[newPlugin, scrollModePluginInstance]}
              />
            )}
          </Worker>
          <a href={documentOrImage} target="_blank" rel="noreferrer">
            Open First PDF
          </a>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentModal;
