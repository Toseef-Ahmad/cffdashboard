import React from "react";
import { Row, Col } from "react-bootstrap";
import { FormHead, AgentSection } from "../styles/index";

const Agent = () => {
  return (
    <div className="Agent">
      <Row>
        <Col md={6} style={{ width: 783 }}>
          <FormHead>
            <p>My Agent</p>
          </FormHead>
          <AgentSection>
            <div className="agentCard">
              <img src="./images/document.png" alt="click here" />
              <p>Justin Feaster</p>
              <p>justin@mygraymark.com</p>
              <p>123-456-7890</p>
            </div>

            {/* CFF Insurance */}
            <div style={{ marginTop: 50 }}>
              <h5 style={{ fontWeight: 700 }}>CFF Insurance </h5>
              <p style={{ marginTop: 20 }}>
                5650 N Riverside Drive <br />
                Suite 101 <br />
                Fort Worth, TX 76137
              </p>
            </div>
          </AgentSection>
        </Col>
      </Row>
    </div>
  );
};

export default Agent;
