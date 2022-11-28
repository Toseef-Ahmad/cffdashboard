import React, { useContext, useState, useEffect } from "react";
import { Collapse, Button, Tag, Modal, Select } from "antd";
import { CffFormContext } from "../contexts/cffDataContext";

// Styles
import "@components/vehicles/VehiclesList.css";
import CoverageListPanelCard from "./CoverageListPanelCard";

// const REQUIRED_FIELDS = {
//   collision: "SPLIT",
//   comprehensive: "SPLIT",
//   garage_keepers: "1",
//   garage_keepers_deductable: "$25k with a $500 Deductible",
//   liability: null,
//   non_own_damage: "0",
//   non_own_deductable: "$5k with a $1,000 Deductible",
//   on_hook: "1",
//   on_hook_deductable: "$25k with a $500 Deductible",
//   trailer_deductable: "$5k with a $1,000 Deductible",
//   trailer_interchange: "1",
//   numer_of_non_owned: "5",
// };

const VehiclesList = () => {
  const { Panel } = Collapse;
  const { currentFromData } = useContext(CffFormContext); // data according to the current selected user by email
  const { coverage, driver } = currentFromData || {};
  const [isEdit, setIsEdit] = useState(false);

  const renderSaveOrEdit = () => {
    return (isEdit && "Save") || "Edit";
  };

  const handleSave = () => {
    isEdit && setIsEdit("update");
  };

  const genExtra = () => (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h4 style={{ fontWeight: 700, marginBottom: "0px" }}>Coverage</h4>
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
      {coverage && (
        <Collapse
          bordered={false}
          expandIconPosition="right"
          style={{
            borderRadius: 10,
            marginBottom: 30,
            backgroundColor: "#fff",
          }}
        >
          <Panel key={1} header={genExtra()} showArrow={false}>
            <CoverageListPanelCard
              coverageObj={{ ...coverage }}
              driver={{ ...driver }}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            />
          </Panel>
        </Collapse>
      )}
    </>
  );
};

export default VehiclesList;
