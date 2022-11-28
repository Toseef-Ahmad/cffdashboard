import React, { useEffect, useState, useContext } from "react";
import { Input, Select, DatePicker, Space } from "antd";
import moment, { isDate } from "moment";

// Notify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@components/vehicles/VehiclesListPanelCard.css";
import { CffFormContext } from "../../contexts/cffDataContext";

const DriversListPanelCard = ({
  driverObj = {},
  isEdit,
  setIsEdit,
  setShow,
  addNew = false,
  index = 0,
  setDrivers,
  setAddNew,
  checkIsDriverValid = () => {},
  checkIsLicenseAlreadyExist = () => {},
}) => {
  const { updateDriver, addNewDriver } = useContext(CffFormContext);
  const { RangePicker } = DatePicker;

  // destructuring all vehicle related properties
  const {
    driver_first_name: firstName,
    driver_last_name: lastName,
    driver_dob: dateOfBirth,
    license_number: licenceNumber,
    driver_state: driverState,
    accident_violation: accidentViolation,
  } = driverObj || {};

  const [data, setData] = useState({});
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    console.log(driverObj);
    Object.keys(driverObj).length && setData({ ...driverObj });
  }, [driverObj]);

  useEffect(() => {
    addNew && setData({});
  }, [addNew]);

  const onChange = (value, dateString) => {
    validateDriver();
    !isEdit && setIsEdit(true);
    setData((prev) => {
      return { ...prev, driver_dob: dateString };
    });
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const handleChange = ({ target }) => {
    validateDriver();
    !isEdit && setIsEdit(true);
    const { name, value } = target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSelect = (key) => {
    validateDriver();
    return ({ value }) => {
      setData((prev) => {
        return { ...prev, [key]: value };
      });
    };
  };

  // Update Driver
  useEffect(() => {
    if (isEdit === "update" && !addNew) {
      updateDriver({ ...data }, index);
    } else if (isEdit === "update" && addNew) {
      addNewDriver({ ...data });
      setDrivers((prev) => {
        return [...prev, { ...data }];
      });
      setAddNew(false);
      setIsEdit(false);
      setShow((prev) => {
        return !prev;
      });
    }
  }, [isEdit]);

  const toastId = React.useRef(null);
  const notify = () => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error("License Number cannot be Duplicate.!");
      setAlert(true);
    }
  };

  const validateDriver = () => {
    const result = checkIsLicenseAlreadyExist(data?.driver_licence);
    if (result && !alert) {
      notify();
    }
    return checkIsDriverValid(Object.keys(data).length === 6 && !result);
  };

  return (
    <>
      <div className="container">
        <div className="general-detail">
          <h4 className="general-detail-heading">Information</h4>
          <div className="general-detail-fields">
            {/* First Name */}
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="first-name">First Name</label>
              <Input
                id="first-name"
                name="driver_first_name"
                value={data?.driver_first_name}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>

            {/* Last Name */}
            <div style={{ flexGrow: 1.5 }}>
              <label htmlFor="last-name">Last Name</label>
              <Input
                id="last-name"
                name="driver_last_name"
                value={data?.driver_last_name}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>

            {/* Date Of Birth */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <label>Date Of Birth</label>
              <DatePicker
                style={{
                  flexGrow: 1,
                  height: 30,
                  alignSelf: "flex-end",
                }}
                defaultValue={dateOfBirth && moment(dateOfBirth, "YYYY-MM-DD")}
                onChange={onChange}
                onOk={onOk}
              />
            </div>
            {/* Licence Number */}
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="license-number">License Number</label>
              <Input
                id="license-number"
                name="driver_licence"
                value={data?.driver_licence}
                onChange={handleChange}
                placeholder="License Number"
              />
            </div>

            {/* Drivers license State */}
            <div style={{ flexGrow: 2.5 }}>
              <label htmlFor="driver-state">Drivers License State</label>
              <Input
                id="driver-state"
                name="driver_state"
                value={data?.driver_state}
                onChange={handleChange}
                placeholder="Drivers License State"
              />
            </div>

            {/* Exclude this driver from the policy? (No Coverage) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 2.5,
              }}
            >
              <label htmlFor="exclude-driver">
                Exclude this driver from the policy? (No Coverage)
              </label>
              <Select
                style={{ height: "35.72px", borderRadius: 10 }}
                name="accident_violation"
                onSelect={handleSelect("accident_violation")}
                placeholder="Select"
                defaultValue={(accidentViolation && "Yes") || "Not"}
              >
                <option style={{ height: "" }} value="Yes">
                  Yes
                </option>
                <option value="No">No</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriversListPanelCard;
