import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormSection, FormHead } from '../styles/index';
import { GoPlus } from 'react-icons/go';
import { MdCancel } from 'react-icons/md';
import { Button, DatePicker, Form, Input, Select } from 'antd';

const DriversForm = (props) => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleDelete = () => {
    const { driversComponent, setDriversComponent } = props;
    setDriversComponent(driversComponent.filter((item, index) => index !== props.id));
  };

  return (
    <Col md={6} key={props.id}>
      <FormHead>
        <p>Driver {props.id + 1}: Lorenzo Preciado</p>
        <MdCancel onClick={() => handleDelete()} />
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
            <Col md={6}>
              <Form.Item label="First Name">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Last Name">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Date of Birth">
                <DatePicker placeholder="" />
              </Form.Item>
            </Col>
            <Col md={6}></Col>
            <Col md={6}>
              <Form.Item label="License Number">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Drivers License State">
                <Select>
                  <Select.Option value="tx">TX</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="tz">TZ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col> */}
            <Form.Item label="Exclude this driver from the policy? (No coverage)">
              <Select>
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="demo">Demo</Select.Option>
                <Select.Option value="no">No</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Has this driver had any accidents or violations in the past 5 years?">
              <Select>
                <Select.Option value="yes">Yes</Select.Option>
                <Select.Option value="demo">Demo</Select.Option>
                <Select.Option value="no">No</Select.Option>
              </Select>
            </Form.Item>

            <Col md={6}>
              <Form.Item label="Date of incident">
                <DatePicker placeholder="" />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Accident/Violation">
                <Select>
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Does this driver need an SR22?">
                <Select>
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="SR22 Filing State">
                <Select>
                  <Select.Option value="tx">TX</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="tz">TZ</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Form.Item>
              <Button>Update Driver</Button>
            </Form.Item>
            {/* </Col> */}
          </Row>
        </Form>
      </FormSection>
    </Col>
  );
};

export default DriversForm;
