import React, { useRef, useEffect, useState, useContext } from "react";
import { Input, Select, Button } from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import UploadProgress from "./uploadFile/UploadProgress";

// Context
import { CffFormContext } from "../../contexts/cffDataContext";

const styles = {
  upload: {
    paddingTop: 20,
    paddingBottom: 40,
    width: "80%",
    margin: "0 auto",
    border: "2px dashed #637178",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 50,
    cursor: "pointer",
  },
  icon: {
    fontSize: 42,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 18,
    lineHeight: "20px",
    marginBottom: 5,
  },
  uploadTextRed: {
    color: "#BD0008",
    fontWeight: 500,
  },
  fileSize: {
    color: "#737373",
  },
  input: {
    display: "none",
  },

  detailsWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
};

const CreateDocumentCard = ({ uploadDocument }) => {
  const [fileRef, setFileRef] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUplaodFile = () => {
    fileRef && fileRef.current.click();
  };

  useEffect(() => {
    console.log(fileInfo, "fileInfo");
  });

  const handleResetStates = () => {
    setFileInfo({});
    setFile("");
    setProgress(0);
  };

  return (
    <>
      <div style={styles.upload} onClick={handleUplaodFile}>
        {/*  Uplaod Icon */}
        <AiOutlineUpload style={styles.icon} />
        {/* Upload Text */}
        <p style={styles.uploadText}>
          <span style={styles.uploadTextRed}>Upload a file</span>{" "}
          <span style={{ color: "black", fontWeight: 600 }}>
            or drag and drop
          </span>
        </p>
        {/* File Size */}
        <p style={styles.fileSize}>file up to 25MB</p>
      </div>

      <UploadProgress
        setFileRef={setFileRef}
        setFileInfo={setFileInfo}
        setProgress={setProgress}
        setCurrentFile={setFile}
        progress={progress}
      />
      {progress === 100 && (
        <UploadedDetails
          uploadDocument={uploadDocument}
          fileDetails={fileInfo}
          file={file}
          handleResetStates={handleResetStates}
        />
      )}
    </>
  );
};

const UploadedDetails = ({
  fileDetails: { name, size = 0 },
  uploadDocument,
  handleResetStates,
  file,
}) => {
  const { Option } = Select;
  const [sizeInKB, setSizeInKB] = useState("");

  // document name and catagory
  const [data, setData] = useState("");

  const convertIntoKB = (file) => {
    return Math.floor(file / 1024) + "KB • 100% Uploaded";
  };

  useEffect(() => {
    setSizeInKB(convertIntoKB(size));
  }, [size]);

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSelect = (value) => {
    setData((prev) => {
      return { ...prev, documentCatagory: value };
    });
  };

  // validate document
  const validateDocument = () => {
    const { documentName, documentCatagory } = data;
    return documentCatagory && documentName;
  };

  const getFileType = () => {
    return name.split(".")[1];
  };

  // Upload
  const handleUpload = () => {
    uploadDocument(
      data?.documentName,
      data?.documentCatagory,
      getFileType(),
      file
    );
    handleResetStates();
  };

  return (
    <>
      <div style={styles.detailsWrapper}>
        <span className="box"></span>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>{name}</p>
          <p style={{ color: "#737373" }}>{sizeInKB}</p>
        </div>
        <Input
          onChange={handleChange}
          name="documentName"
          placeholder="File Name"
          style={{ width: 400 }}
        />

        <Select
          onSelect={handleSelect}
          style={{ width: 400 }}
          placeholder="Document Type"
        >
          <Option value="idCards">ID Card</Option>
          <Option value="policySummary">Policy Summary</Option>
          <Option value="recentCertificates">Recent Certificates</Option>
          <Option value="filling">Filling</Option>
          <Option value="financeArgument">Finance Argument</Option>
          <Option value="misc">Misc</Option>
        </Select>

        {/* Delete Icon */}
        <div>
          <div
            style={{
              width: 30,
              height: 30,
              background: "#FEF2F2",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RiDeleteBinLine style={{ color: "#EF4444" }} />
          </div>
        </div>
      </div>

      {/* Upload */}
      <Button
        onClick={handleUpload}
        disabled={!validateDocument()}
        className="btn"
        style={{ width: "10%", marginTop: 70, marginBottom: 40 }}
      >
        Upload
      </Button>
    </>
  );
};

export default CreateDocumentCard;
