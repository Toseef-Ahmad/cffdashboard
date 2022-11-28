import React, { useContext, useState } from "react";
import { Collapse, Button, Tag, Modal, Select } from "antd";
import { CffFormContext } from "../../contexts/cffDataContext";
import { documents } from "./static";
import DocumentCard from "../DocumentCard";

const DocumentsList = ({ documentsList, handleDeleteDocument }) => {
  const { Panel } = Collapse;
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
      {currentSection === title && collapse && (
        <div className="tag-and-edit-wrapper">
          <Button className="edit-button">save</Button>
        </div>
      )}
    </div>
  );
  return (
    <>
      {Object.keys(documentsList).map((key, index) => {
        // const { title, img, text } = document;

        return (
          <>
            <Collapse
              bordered={false}
              expandIconPosition="right"
              onChange={() => {
                setCurrentSection(key);
                setCollapse(!collapse);
              }}
              style={{
                borderRadius: 10,
                marginBottom: 30,
                backgroundColor: "#fff",
              }}
              defaultActiveKey={index}
            >
              <Panel key={index} header={genExtra(key)} showArrow={false}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {documentsList[key].map(({ name, document }, index) => {
                    return (
                      <DocumentCard
                        img={"./images/document.png"}
                        text={name}
                        document={document}
                        catagory={key}
                        index={index}
                        handleDeleteDocument={handleDeleteDocument}
                      />
                    );
                  })}
                  {/*<DocumentCard img={img} text={text} />*/}
                </div>
              </Panel>
            </Collapse>
          </>
        );
      })}
    </>
  );
};

export default DocumentsList;
