import React, { useContext, useState, useEffect } from "react";
import { Collapse, Button, Tag, Modal, Select } from "antd";
import { CffFormContext } from "../../contexts/cffDataContext";

// notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// React-icons
import { MdDeleteOutline } from "react-icons/md";

// Styles
import "@components/vehicles/VehiclesList.css";
import DriversListPanelCard from "./DriversListPanelCard";

// Extermal style
import "./driversList.css";

const VehiclesList = ({
  addNew,
  driver,
  setDrivers,
  setAddNew,
  handleDelete,
}) => {
  const { Panel } = Collapse;
  const { driver_first_name, driver_last_name } = driver || {};
  // Check is Used Edit Any value.
  const [isEdit, setIsEdit] = useState(false);
  const [isDriverValid, setIsDriverValid] = useState(false);

  // Control When Edit or save button will display on Collapse Panal
  const [show, setShow] = useState(false);

  useEffect(() => {
    addNew && setShow(true);
  });

  useEffect(() => {
    console.log(driver, " driver");
  });

  const renderSaveOrEdit = () => {
    return ((isEdit || addNew) && "Save") || (driver && !addNew && "Edit");
  };

  const handleSave = (e) => {
    isEdit && setIsEdit("update");
  };

  function handleCancel() {
    setAddNew(false);
    setShow(false);
    setIsEdit(false);
  }

  const checkIsLicenseAlreadyExist = (license) => {
    return driver.some((d) => {
      return d?.driver_licence === license;
    });
  };

  const genExtra = ({ driver_first_name, driver_last_name }, index) => (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h4 style={{ fontWeight: 700, marginBottom: "0px" }}>
        {(driver_first_name || "") + " " + (driver_last_name || "")}
      </h4>
      {/* tag and edit button wrapper */}
      <div className="tag-and-edit-wrapper">
        {addNew && (
          <Button onClick={handleCancel} className="edit-button">
            Cancel
          </Button>
        )}
        {show && (
          <Button
            disabled={!isDriverValid && addNew}
            className={`edit-button ${
              (!isDriverValid && addNew && "disable-button") || ""
            }`}
            onClick={handleSave}
          >
            {renderSaveOrEdit()}
          </Button>
        )}

        <MdDeleteOutline
          onClick={handleDelete(index)}
          className="delete-icon"
        />
      </div>
    </div>
  );

  const checkIsDriverValid = (isValid) => {
    setIsDriverValid(isValid);
  };

  return (
    <>
      {/* <ToastContainer /> */}
      {(!addNew &&
        driver?.map((d, index) => {
          return (
            <Collapse
              bordered={false}
              //   showArrow={false}
              style={{
                borderRadius: 10,
                marginBottom: 30,
                backgroundColor: "#fff",
              }}
              onChange={() => {
                setShow((prev) => {
                  return !prev;
                });
              }}
              // activeKey={show && 1}
            >
              <Panel key={1} header={genExtra(d, index)} className="panel">
                <DriversListPanelCard
                  setDrivers={setDrivers}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                  setShow={setShow}
                  driverObj={d}
                  index={index}
                  handleDelete={handleDelete}
                />
              </Panel>
            </Collapse>
          );
        })) ||
        (addNew && (
          <Collapse
            bordered={false}
            // showArrow={false}
            style={{
              borderRadius: 10,
              marginBottom: 30,
              backgroundColor: "#fff",
            }}
            onChange={() => {
              setShow((prev) => {
                return !prev;
              });
            }}
            activeKey={addNew && 1}
          >
            <Panel key={1} header={genExtra({})}>
              <DriversListPanelCard
                setDrivers={setDrivers}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setShow={setShow}
                addNew={addNew}
                setAddNew={setAddNew}
                checkIsDriverValid={checkIsDriverValid}
                checkIsLicenseAlreadyExist={checkIsLicenseAlreadyExist}
              />
            </Panel>
          </Collapse>
        ))}
      {}
    </>
  );
};

export default VehiclesList;
