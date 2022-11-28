import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
//styles
import "./uploadProgress.css";

export default ({
  setFileRef,
  setFileInfo,
  setProgress,
  progress,
  setCurrentFile,
}) => {
  const [file, setFile] = React.useState(null);
  const uploadRef = React.useRef();
  const statusRef = React.useRef();
  const loadTotalRef = React.useRef();
  const progressRef = React.useRef();

  React.useEffect(() => {
    setFileRef(uploadRef);
  }, []);

  useEffect(() => {
    if (file) {
      setCurrentFile(file);
    }
  }, [file]);

  const UploadFile = (e) => {
    setProgress(0);
    const file = uploadRef.current.files[0];
    const { name, size } = file;
    setFileInfo({ name, size });
    setFile(URL.createObjectURL(file));
    var formData = new FormData();
    formData.append("image", file);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", ProgressHandler, false);
    xhr.addEventListener("load", SuccessHandler, false);
    xhr.addEventListener("error", ErrorHandler, false);
    xhr.addEventListener("abort", AbortHandler, false);
    xhr.open("POST", "fileupload.php");
    xhr.send(formData);
  };

  const ProgressHandler = (e) => {
    var percent = Math.round((e.loaded / e.total) * 100);
    progressRef.current.value = percent;
    setProgress(percent);
  };

  const SuccessHandler = (e) => {
    progressRef.current.value = 0;
  };
  const ErrorHandler = () => {
    statusRef.current.innerHTML = "upload failed!!";
  };
  const AbortHandler = () => {
    statusRef.current.innerHTML = "upload aborted!!";
  };

  return (
    <div className="progress-bar">
      <input
        accept="image/jpeg, image/png, application/pdf"
        type="file"
        name="file"
        ref={uploadRef}
        onChange={UploadFile}
        style={{ display: "none" }}
      />
      {progress !== 100 && (
        <>
          {/* File Name */}
          <p className="file-name">{uploadRef?.current?.files[0]?.name}</p>

          <div className="progress-bar-controller">
            <span className="box"></span>
            <label>
              <progress ref={progressRef} value="0" max="100" />
            </label>
            <span className="cross">
              <AiOutlineClose />
            </span>
          </div>
        </>
      )}
    </div>
  );
};
