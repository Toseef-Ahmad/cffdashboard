import React, { useContext, useState, useEffect } from "react";
import { Collapse, Button, Tag, Modal, Select } from "antd";
import { CffFormContext } from "../../contexts/cffDataContext";

// Styles
import "@components/vehicles/VehiclesList.css";
import AdditionalCompanyListCard from "./AdditionalCompanyListCard";
import PrimaryContactListCard from "./PrimaryContactListCard";

const BusinessList = () => {
  const { Panel } = Collapse;
  const { currentFromData } = useContext(CffFormContext); // data according to the current selected user by email
  const { business, customer } = currentFromData || {};

  const [isEdit, setIsEdit] = useState(false);

  const renderSaveOrEdit = () => {
    return (isEdit && "Save") || "Edit";
  };

  const handleSave = () => {
    isEdit && setIsEdit("update");
  };

  const genExtra = (title) => (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h4 style={{ fontWeight: 400, fontSize: 24, marginBottom: "0" }}>
        {title}
      </h4>
      {/* tag and edit button wrapper */}
      <div className="tag-and-edit-wrapper">
        <Button className="edit-button" onClick={handleSave}>
          {renderSaveOrEdit()}
        </Button>
      </div>
    </div>
  );
  return (
    <>
      {business && (
        <div>
          <Collapse
            bordered={false}
            expandIconPosition="right"
            style={{
              borderRadius: 10,
              marginBottom: 30,
              // backgroundColor: "#fff",
            }}
          >
            <Panel key={1} header={genExtra("Additional Company Information")}>
              <AdditionalCompanyListCard
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                businessObj={business}
                customerObj={customer}
              />
            </Panel>
          </Collapse>
          <Collapse
            bordered={false}
            expandIconPosition="right"
            style={{
              borderRadius: 10,
              marginBottom: 30,
              backgroundColor: "#fff",
            }}
          >
            <Panel key={1} header={genExtra("Primary Contacts")}>
              <PrimaryContactListCard
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                businessObj={business}
                customerObj={customer}
              />
            </Panel>
          </Collapse>
        </div>
      )}
    </>
  );
};

export default BusinessList;
