import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FormSection, FormHead, CoveragePage } from "../styles/index";
import { Button, Cascader, Form, Input, Select } from "antd";
import CoverageList from "../coverage/CoverageList";

const Coverage = () => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <>
      <CoverageList />
      {/*<CoveragePage>*/}
      {/*  <Row>*/}
      {/*    <Col md={6}>*/}
      {/*      <FormHead>*/}
      {/*        <p>Coverage</p>*/}
      {/*      </FormHead>*/}
      {/*      <FormSection>*/}
      {/*        <Form*/}
      {/*          layout="vertical"*/}
      {/*          initialValues={{*/}
      {/*            size: componentSize,*/}
      {/*          }}*/}
      {/*          onValuesChange={onFormLayoutChange}*/}
      {/*          size={componentSize}*/}
      {/*        >*/}
      {/*          <Row>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Bodily Injury and Property Damage Liability Limit ">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Uninsured/Underinsured Motorist Bodily Injury Limit ">*/}
      {/*                <Cascader*/}
      {/*                  options={[*/}
      {/*                    {*/}
      {/*                      value: "$25k",*/}
      {/*                      label: "$25k",*/}
      {/*                      children: [*/}
      {/*                        {*/}
      {/*                          value: "$50k",*/}
      {/*                          label: "$50k",*/}
      {/*                        },*/}
      {/*                      ],*/}
      {/*                    },*/}
      {/*                    {*/}
      {/*                      value: "Demo",*/}
      {/*                      label: "Demo",*/}
      {/*                      children: [*/}
      {/*                        {*/}
      {/*                          value: "Demo",*/}
      {/*                          label: "Demo",*/}
      {/*                        },*/}
      {/*                      ],*/}
      {/*                    },*/}
      {/*                    {*/}
      {/*                      value: "$50k",*/}
      {/*                      label: "$50k",*/}
      {/*                      children: [*/}
      {/*                        {*/}
      {/*                          value: "$75k",*/}
      {/*                          label: "$75k",*/}
      {/*                        },*/}
      {/*                      ],*/}
      {/*                    },*/}
      {/*                  ]}*/}
      {/*                />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Uninsured/Underinsured Property Damage Limit ">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="$15k with a $0 deductible">*/}
      {/*                    $15k with a $0 Deductible*/}
      {/*                  </Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="$30k with a $0 deductible">*/}
      {/*                    $30k with a $0 Deductible*/}
      {/*                  </Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Medical Payments ">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Comprehensive ">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="$500 deductible">*/}
      {/*                    $500 Deductible*/}
      {/*                  </Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="$1000 deductible">*/}
      {/*                    $1000 Deductible*/}
      {/*                  </Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Collision">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Employer Non-Owned Auto Liability">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Trailer Interchange">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Hired Auto Liability">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="General Liability">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Motor Truck Cargo">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Non-Owned Trailer Physical Damage">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Do you require Refrigeration Breakdown coverage?">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Number of Non-Owned Trailers">*/}
      {/*                <Input />*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col>*/}
      {/*              <Form.Item*/}
      {/*                className="multipleInputs"*/}
      {/*                label="What commodities are you hauling?"*/}
      {/*              >*/}
      {/*                <Input placeholder="Type in option..." />*/}
      {/*                <Input placeholder="Type in option..." />*/}
      {/*                <Input placeholder="Type in option..." />*/}
      {/*                <Input placeholder="Type in option..." />*/}
      {/*              </Form.Item>*/}
      {/*              <Form.Item>*/}
      {/*                <Button>Update Coverage</Button>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*          </Row>*/}
      {/*        </Form>*/}
      {/*      </FormSection>*/}
      {/*    </Col>*/}
      {/*    <Col md={6}>*/}
      {/*      /!* <FormHead>*/}
      {/*      <p>Coverage</p>*/}
      {/*    </FormHead> *!/*/}
      {/*      <FormSection>*/}
      {/*        <Form*/}
      {/*          layout="vertical"*/}
      {/*          initialValues={{*/}
      {/*            size: componentSize,*/}
      {/*          }}*/}
      {/*          onValuesChange={onFormLayoutChange}*/}
      {/*          size={componentSize}*/}
      {/*        >*/}
      {/*          <Row>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Liability">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="yes">Yes</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}></Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="UM">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="CSL">CSL</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="NBL">NBL</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="$1 Million">*/}
      {/*                    $1 Million*/}
      {/*                  </Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="$10 Million">*/}
      {/*                    $10 Million*/}
      {/*                  </Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="UIM">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="CSL">CSL</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="NBL">NBL</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="$1 Million">*/}
      {/*                    $1 Million*/}
      {/*                  </Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="$10 Million">*/}
      {/*                    $10 Million*/}
      {/*                  </Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Trailer Interchange ">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="select">Select</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Number of Non-Owned Trailers ">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="type">Type</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="new">New</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Coverage Limit and Deductible">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="select">Select</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}></Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Non Owned Trailer Physical Damage">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="select">Select</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Coverage Limit and Deductible">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="select">Select</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="General Liability">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="select">Select</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}></Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="On Hook">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="select">Select</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Coverage Limit and Deductible">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="select">Select</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Garagekeepers">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="select">Select</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*            <Col md={6}>*/}
      {/*              <Form.Item label="Coverage Limit and Deductible">*/}
      {/*                <Select>*/}
      {/*                  <Select.Option value="select">Select</Select.Option>*/}
      {/*                  <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                  <Select.Option value="no">No</Select.Option>*/}
      {/*                </Select>*/}
      {/*              </Form.Item>*/}
      {/*            </Col>*/}
      {/*          </Row>*/}
      {/*        </Form>*/}
      {/*      </FormSection>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}

      {/*  <Row>*/}
      {/*    <Col md={6}>*/}
      {/*      <FormSection>*/}
      {/*        <div className="coverage-airstream">*/}
      {/*          <div className="header">*/}
      {/*            <div className="image">*/}
      {/*              <img src="/images/truck.svg" alt="I am truck" />*/}
      {/*            </div>*/}
      {/*            <h4 className="heading">2012 AIRSTREAM 390 XL</h4>*/}
      {/*          </div>*/}

      {/*          <div className="select-list">*/}
      {/*            <div className="items">*/}
      {/*              <div className="item headings">*/}
      {/*                <div className="title">Coverage</div>*/}
      {/*                <div className="ant-row">Limit</div>*/}
      {/*              </div>*/}
      {/*              <div className="item">*/}
      {/*                <div className="title">Comprehensive</div>*/}
      {/*                <Form.Item>*/}
      {/*                  <Select>*/}
      {/*                    <Select.Option value="select">Select</Select.Option>*/}
      {/*                    <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                    <Select.Option value="no">No</Select.Option>*/}
      {/*                  </Select>*/}
      {/*                </Form.Item>*/}
      {/*              </div>*/}
      {/*              <div className="item">*/}
      {/*                <div className="title">Collision</div>*/}

      {/*                <Form.Item>*/}
      {/*                  <Select>*/}
      {/*                    <Select.Option value="select">Select</Select.Option>*/}
      {/*                    <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                    <Select.Option value="no">No</Select.Option>*/}
      {/*                  </Select>*/}
      {/*                </Form.Item>*/}
      {/*              </div>*/}
      {/*              <div className="item">*/}
      {/*                <div className="title">Medical Payments</div>*/}
      {/*                <Form.Item>*/}
      {/*                  <Select>*/}
      {/*                    <Select.Option value="select">Select</Select.Option>*/}
      {/*                    <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                    <Select.Option value="no">No</Select.Option>*/}
      {/*                  </Select>*/}
      {/*                </Form.Item>*/}
      {/*              </div>*/}
      {/*              <div className="item">*/}
      {/*                <div className="title">Rental Reimbursement</div>*/}
      {/*                <Form.Item>*/}
      {/*                  <Select>*/}
      {/*                    <Select.Option value="select">Select</Select.Option>*/}
      {/*                    <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                    <Select.Option value="no">No</Select.Option>*/}
      {/*                  </Select>*/}
      {/*                </Form.Item>*/}
      {/*              </div>*/}
      {/*              <div className="item">*/}
      {/*                <div className="title">Rental with Downtime</div>*/}
      {/*                <Form.Item>*/}
      {/*                  <Select>*/}
      {/*                    <Select.Option value="select">Select</Select.Option>*/}
      {/*                    <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                    <Select.Option value="no">No</Select.Option>*/}
      {/*                  </Select>*/}
      {/*                </Form.Item>*/}
      {/*              </div>*/}
      {/*              <div className="item">*/}
      {/*                <div className="title">Roadside Assistance</div>*/}
      {/*                <Form.Item>*/}
      {/*                  <Select>*/}
      {/*                    <Select.Option value="select">Select</Select.Option>*/}
      {/*                    <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                    <Select.Option value="no">No</Select.Option>*/}
      {/*                  </Select>*/}
      {/*                </Form.Item>*/}
      {/*              </div>*/}
      {/*              <div className="item">*/}
      {/*                <div className="title">*/}
      {/*                  Fire and theft w/ combined additional coverage*/}
      {/*                </div>*/}
      {/*                <Form.Item>*/}
      {/*                  <Select>*/}
      {/*                    <Select.Option value="select">Select</Select.Option>*/}
      {/*                    <Select.Option value="demo">Demo</Select.Option>*/}
      {/*                    <Select.Option value="no">No</Select.Option>*/}
      {/*                  </Select>*/}
      {/*                </Form.Item>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </FormSection>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</CoveragePage>*/}
    </>
  );
};

export default Coverage;
