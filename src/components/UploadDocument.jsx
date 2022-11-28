import React, { useState } from "react";
import { HiUpload } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Row, Col } from "react-bootstrap";
import { Form, Upload, Select, Input } from "antd";
import { FormHead, UploadStart, UploadCard } from "../styles";
import FileUpload from "./FileUpload";

const UploadDocument = () => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [fileUploadComponent, setFileUploadComponent] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <UploadStart>
      <Row id="sectionHide">
        <Col md={6}>
          <FormHead>
            <p>Upload Document</p>
          </FormHead>
          <UploadCard className="uploadStartCard">
            <Form
              layout="vertical"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onFormLayoutChange}
              size={componentSize}
            >
              <Form.Item
                valuePropName="fileList"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  setFileUploadComponent([
                    ...fileUploadComponent,
                    <FileUpload />,
                  ]);
                }}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <div>
                    <HiUpload />
                    <div className="uploadClass">
                      <span>Upload a file</span>
                      <span> or</span>
                      <span> drag and drop</span>
                    </div>
                    <span className="fileSize">file up to 25MB</span>
                  </div>
                </Upload>
              </Form.Item>
            </Form>
            {selectedFile === null
              ? ""
              : fileUploadComponent.map((item, i) => <FileUpload key={item} />)}
          </UploadCard>
        </Col>
      </Row>
    </UploadStart>
  );
};

export default UploadDocument;
