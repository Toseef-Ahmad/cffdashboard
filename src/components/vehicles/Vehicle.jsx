import React, { useState, useEffect } from "react";
import { Button, Collapse, Tag } from "antd";

// icons
import { MdDeleteOutline } from "react-icons/md";
import VehiclesListPanelCard from "@components/vehicles/VehiclesListPanelCard";

const Vehicle = ({
  v = {},
  index = 0,
  setModel = () => {},
  setCurrentVehicleModel = () => {},
  addNew = false,
  setAddNew = () => {},
  setVehicles = () => {},
  handleDelete = () => {},
}) => {
  const { Panel } = Collapse;
  const [status, setStatus] = useState("Active");
  const { vehicle_type } = v;
  const [isShow, setIsShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isVehicleValid, setIsVehicleValid] = useState(false);

  // useEffect(() => {
  //   addNew && setIsShow(true);
  // });

  useEffect(() => {
    isEdit && setIsShow(true);
  }, [isEdit]);

  const renderSaveOrEdit = () => {
    return (isEdit && "Save") || "Edit";
  };

  const handleSave = () => {
    isEdit && setIsEdit("update");
    // setAddNew(false);
  };

  const {
    Make: make,
    Model: model,
    "Model Year": modelYear,
    vehicle_number: vehicleNumber,
  } = v?.vin || {};

  // handleCancle
  const handleCancle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddNew(false);
  };

  const tag = () => {
    return (
      <>
        {/* tag and edit button wrapper */}
        <div className="tag-and-edit-wrapper">
          {(Object.keys(v).length && (
            <Tag
              style={{}}
              className="tag"
              onClick={() => {
                setCurrentVehicleModel(
                  `Vehicle ${index + 1}: ${modelYear?.Value || ""} ${
                    model?.Value || ""
                  } ${vehicle_type || ""}`
                );
                setModel(true);
              }}
            >
              {status}
            </Tag>
          )) ||
            ""}
          {/* Cancle Button */}
          <div style={{ display: "flex" }}>
            {isShow && (
              <Button
                disabled={isEdit && !isVehicleValid}
                className={`edit-button ${
                  (!isVehicleValid && "disbale-button") || ""
                }`}
                onClick={handleSave}
              >
                {renderSaveOrEdit()}
              </Button>
            )}

            {addNew && (
              <Button className="edit-button" onClick={handleCancle}>
                Cancel
              </Button>
            )}
          </div>
          <MdDeleteOutline
            onClick={handleDelete(index)}
            className="delete-icon"
          />
        </div>
      </>
    );
  };

  const genExtra = (index, make, model, modelYear, renderSaveOrEdit) => (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h4 style={{ fontWeight: 700, marginBottom: "0" }}>
        Vehicle {index + 1}:{" "}
        <span style={{ fontWeight: 400 }}>
          {make?.Value} {model?.Value} {modelYear?.Value}
        </span>
      </h4>
      {tag()}
    </div>
  );

  return (
    <>
      <Collapse
        bordered={false}
        expandIconPosition="right"
        style={{
          borderRadius: 10,
          marginBottom: 30,
          backgroundColor: "#fff",
        }}
        onChange={() =>
          setIsShow((prev) => {
            return !prev;
          })
        }
        defaultActiveKey={addNew && 1}
      >
        <Panel
          className="panel"
          key={(addNew && 1) || index}
          header={genExtra(
            index,
            make,
            modelYear,
            model,
            vehicle_type,
            renderSaveOrEdit
          )}
          showArrow={false}
        >
          <VehiclesListPanelCard
            vehicleObj={v}
            vehicleType={vehicle_type}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
            index={index}
            setIsShow={setIsShow}
            addNew={addNew}
            setVehicles={setVehicles}
            setAddNew={setAddNew}
            setIsVehicleValid={setIsVehicleValid}
          />
        </Panel>
      </Collapse>
    </>
  );
};
export default Vehicle;
