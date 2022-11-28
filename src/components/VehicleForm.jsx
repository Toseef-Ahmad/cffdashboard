import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormSection, FormHead } from '../styles/index';
import { Button, Form, Input, Select } from 'antd';

const VehicleForm = (props) => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Col md={6} key={props.key}>
      <FormHead>
        <p>Vehicle 1: 2012 Volvo Semi</p>
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
              <Form.Item label="Vehicle Type" value="tractor truck">
                <Select>
                  <Select.Option value="tractor truck">Tractor Truck</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="car">Car</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Year">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Make">
                <Select>
                  <Select.Option value="yes">Volvo</Select.Option>
                  <Select.Option value="demo">BMW</Select.Option>
                  <Select.Option value="no">Truck</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Model">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="VIN">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Zip Code where vehicle is located">
                <Input />
              </Form.Item>
            </Col>
            <Col md={6}>
              <Form.Item label="Gross Vehicle Weight">
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
              <Form.Item label="Does the truck have permanently attached equipment?">
                <Select>
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="What is the value of the permanently attached equipment?">
                <Input />
              </Form.Item>
              <Form.Item label="Total Stated Amount (value of vehicle including permanently attached?">
                <Input />
              </Form.Item>
              <Form.Item label="What is the zip code of the location where you park your vehicles when not in use?">
                <Input />
              </Form.Item>
              <Form.Item label="Is an Electronic Log Device (ELD) required to record hours of service?">
                <Select>
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Do any listed vehicles or the load require a hazardous material place card?">
                <Select>
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Farthest one-way distance this vehicle typically travels (90% or more of the time)">
                <Input />
              </Form.Item>
              <Form.Item label="Is there a loan/lease on this vehicle?">
                <Select>
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Would you like physical damage coverage for this vehicle?">
                <Select>
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button>Update Vehicle</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FormSection>
    </Col>
  );
};

export default VehicleForm;
