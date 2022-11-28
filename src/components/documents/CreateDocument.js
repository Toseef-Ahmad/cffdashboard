import React, { useContext, useState } from "react";
import { Collapse, Button, Tag, Modal, Select } from "antd";
import { CffFormContext } from "../../contexts/cffDataContext";
import CreateDocumentCard from "./CreateDocumentCard";

const DocumentsList = ({ setAddNew, uploadDocument }) => {
  const { Panel } = Collapse;
  const { currentFromData } = useContext(CffFormContext); // data according to the current selected user by email
  const [currentSection, setCurrentSection] = useState("");
  const [collapse, setCollapse] = useState(false);

  const genExtra = (title) => (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h4 style={{ fontWeight: 700 }}>{title}</h4>
      <Button
        className="edit-button"
        onClick={() => {
          setAddNew(false);
        }}
      >
        Cencal
      </Button>
    </div>
  );
  return (
    <>
      <Collapse
        bordered={false}
        expandIconPosition="right"
        style={{
          borderRadius: 10,
          marginBottom: 30,
          backgroundColor: "#fff",
        }}
        defaultActiveKey={0}
      >
        <Panel header={genExtra("Upload Document")} key={0} showArrow={false}>
          <CreateDocumentCard uploadDocument={uploadDocument} />
        </Panel>
      </Collapse>
    </>
  );
};

export default DocumentsList;
