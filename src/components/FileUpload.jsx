import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { Form, Upload, Select, Input } from "antd";

const FileUpload = (props) => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <div className="fileUploading" key={props.key}>
      <div className="square"></div>
      <div className="fileProgress">
        <p>filename.pdf</p>
        <p>525KB • 30% uploaded</p>
      </div>
      <Form
        className="Inputs"
        layout="vertical"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item>
          <Input placeholder="File Name" />
        </Form.Item>
        <Form.Item>
          <Select>
            <Select.Option value="id card">ID Card</Select.Option>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="bank card">Bank Card</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <div className="cancelFile">
        <RiDeleteBinLine />
      </div>
    </div>
  );
};

export default FileUpload;
