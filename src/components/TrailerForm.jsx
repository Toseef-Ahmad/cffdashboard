import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FormSection, FormHead } from "../styles/index";
import { Button, Form, Input, Select } from "antd";

const TrailerForm = (props) => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Col md={6} key={props.key}>
      <FormHead>
        <p>Trailer 1: 2012 Volvo Trailer</p>
      </FormHead>
      <FormSection>
        <Form
          layout="vertical"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Row>
            <Col md={12}>
              <Form.Item label="Trailer Type">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Year">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Make">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Zip Code where vehicle is located">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="VIN">
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Is there a loan or lease on the vehicle?">
                <Select>
                  <Select.Option value="yes - loan">Yes - Loan</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="no - loan">No - Loan</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Farthest one-way distance this vehicle typically travels (90% or more of the time)">
                <Select>
                  <Select.Option value="100 miles">100 Miles</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="200 miles">200 Miles</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button>Update Trailer</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FormSection>
    </Col>
  );
};

export default TrailerForm;
