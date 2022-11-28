import React, { useState, useEffect, useRef } from "react";

// antd
import { Button, Modal } from "antd";
import { message, Popconfirm } from "antd";

// icons
import { FcDocument } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

// import ImgsViewer from "react-images-viewer";
import DocumentModal from "./documents/DocumentModal";
import { ImageViewer } from "react-image-viewer-dv";

// react-tostify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentCard = ({
  text,
  img,
  document,
  index,
  catagory,
  handleDeleteDocument,
}) => {
  const [open, setOpen] = useState(false);
  const pdfRef = useRef(null);
  const { type, url } = document;

  const confirm = (e) => {
    handleDeleteDocument(catagory, index);
    notify("Document Deleted.");
  };
  const cancel = (e) => {};

  const notify = (message) => toast.success(message);

  return (
    <div
      style={{ position: "relative" }}
      onClick={() => {
        setOpen(true);
      }}
    >
      {(type === "pdf" && url && (
        <>
          <FcDocument
            style={{ width: "150", height: "200" }}
            onClick={() => {
              pdfRef.current.click();
            }}
          />
          {/* Delete icon */}
          <Popconfirm
            title="Are you sure to delete this File?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <TiDelete
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                fontSize: "1.5rem",
                color: "#A20010",
                cursor: "pointer",
                padding: 0,
              }}
            />
          </Popconfirm>
        </>
      )) ||
        (url && (
          <>
            <ImageViewer>
              <img
                style={{ padding: 5 }}
                src={url}
                alt="click here"
                width="200"
                height="200"
              />
            </ImageViewer>
            {/* Delete icon */}
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <TiDelete
                style={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  fontSize: "1.5rem",
                  color: "#A20010",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            </Popconfirm>
          </>
        ))}
      <a
        href={url}
        ref={pdfRef}
        target="_blank"
        rel="noreferrer"
        style={{ display: "hidden" }}
      ></a>
      <p style={{ textAlign: "center" }}>{text}</p>

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default DocumentCard;
