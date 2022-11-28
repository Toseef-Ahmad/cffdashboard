import React, { useState, useEffect, useContext } from "react";

// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DocumentsList from "./documents/DocumentsList";
import AddNew from "./AddNew";
import CreateDocument from "./documents/CreateDocument";
import Modal from "antd/lib/modal/Modal";

// Context
import { CffFormContext } from "../contexts/cffDataContext";

const defaultDocumentsList = {
  license: [{ name: "", document: { type: "", url: "" } }],
  policySummary: [{ name: "", document: { type: "", url: "" } }],
  filling: [{ name: "", document: { type: "", url: "" } }],
  recentCertificates: [{ name: "", document: { type: "", url: "" } }],
  idCards: [{ name: "", document: { type: "", url: "" } }],
  financeArgument: [{ name: "", document: { type: "", url: "" } }],
  misc: [{ name: "", document: { type: "", url: "" } }],
};

const Documents = (props) => {
  const [addNew, setAddNew] = useState(false);
  const [documentsList, setDocumentsList] = useState({
    ...defaultDocumentsList,
  });
  const [isUpdate, setIsUpdate] = useState(false);

  // Context
  const { updateDocuments, currentFormData } = useContext(CffFormContext);
  const { documents } = currentFormData || {};
  useEffect(() => {
    if (documents) {
      setDocumentsList({ ...documents });
    }
  }, []);

  useEffect(() => {
    console.log(documents, "ddddd");
  });

  const notify = (message) => toast.success(message);

  const handleSectionShowAndHide = () => {
    props.setState(true);
  };

  const uploadDocument = (fileName, documentCatagory, fileType, fileItself) => {
    const newObj = {
      name: fileName,
      document: { type: fileType, url: fileItself },
    };
    setDocumentsList((prev) => {
      return {
        ...prev,
        [documentCatagory]: [...prev[documentCatagory], { ...newObj }],
      };
    });
    notify("Uploaded.!");
  };

  useEffect(() => {
    updateDocuments(documentsList);
  }, [documentsList]);

  useEffect(() => {
    if (isUpdate) {
      updateDocuments(documentsList);
    } else {
      setIsUpdate(true);
    }
  }, [DocumentsList]);

  useEffect(() => {
    console.log(isUpdate, " isUpdate..");
  });

  /** Delete Document
   * @param {string} cataory
   * @param {number} index
   */
  const handleDeleteDocument = (catagory, index) => {
    const currentDocument = documentsList[catagory];
    const updatedDocument = currentDocument.filter((d, i) => {
      return index !== i;
    });
    setDocumentsList((prev) => {
      return { ...prev, [catagory]: [...updatedDocument] };
    });
    console.log(updatedDocument);
  };

  return (
    <div className="Documents">
      <AddNew title="+ Add Document" setAddNew={setAddNew} />
      {(!addNew && (
        <>
          <DocumentsList
            documentsList={documentsList}
            handleDeleteDocument={handleDeleteDocument}
          />
        </>
      )) || (
        <CreateDocument setAddNew={setAddNew} uploadDocument={uploadDocument} />
      )}

      <ToastContainer />
    </div>
  );
};

export default Documents;
