import React, { useState, useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { GoPlus } from "react-icons/go";

// ES6 Modules or TypeScript
import Swal from "sweetalert2";

import { Button, DatePicker, Form, Input, Select } from "antd";
import { FormSection, FormHead } from "../styles/index";
import DriversForm from "./DriversForm";
import DriversList from "./drivers/DriversList";
import { CffFormContext } from "../contexts/cffDataContext";
import AddNew from "./AddNew";

const Drivers = () => {
  const [componentSize, setComponentSize] = useState("default");
  const { currentFromData, removeDriver } = useContext(CffFormContext); // data according to the current selected user by email
  const { driver } = currentFromData || {};

  const [drivers, setDrivers] = useState([]);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    driver && setDrivers(driver);
  }, [driver]);

  /** Delete Driver
   * @param {Number} index
   */
  const handleDelete = (index) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedDrivers = drivers.filter((d, i) => {
          return i !== index;
        });
        setDrivers(() => {
          return [...updatedDrivers];
        });
        removeDriver([...updatedDrivers]);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="Drivers">
      <AddNew title="+ Add Driver" setAddNew={setAddNew} />
      <DriversList
        driver={drivers}
        setDrivers={setDrivers}
        addNew={addNew}
        setAddNew={setAddNew}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Drivers;
