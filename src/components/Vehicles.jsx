import React, { useState, useContext, useEffect } from "react";
import { Row } from "react-bootstrap";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import { GoPlus } from "react-icons/go";
import VehicleForm from "./VehicleForm";
import TrailerForm from "./TrailerForm";
import { Collapse } from "antd";
import VehiclesList from "../components/vehicles/VehiclesList";

// Context API
import { CffFormContext } from "../contexts/cffDataContext";
import StatusModel from "./vehicles/staus/StatusModel";
import AddNew from "./AddNew";
import Vehicle from "./vehicles/Vehicle";

const Vehicles = () => {
  const { Panel } = Collapse;
  const [componentSize, setComponentSize] = useState("default");
  const { currentFromData, removeVehicle } = useContext(CffFormContext); // data according to the current selected user by email
  const { vehicle } = currentFromData;
  const { driver } = currentFromData || {};
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [addNew, setAddNew] = useState(false);

  useEffect(() => {
    setVehicles((prev) => {
      return [...prev, ...vehicle];
    });
  }, []);

  /** Delete vehicle from vehicles list
   *
   * @param {number} index
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
        const updatedList = vehicles.filter((v, i) => {
          return i !== index;
        });

        setVehicles(() => {
          return [...updatedList];
        });
        removeVehicle([...updatedList]);
        
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <div className="Vehicles">
        <Row>
          <AddNew title="+ Add Vehicle/Trailer" setAddNew={setAddNew} />
          {(!addNew && (
            <VehiclesList handleDelete={handleDelete} vehicles={vehicles} />
          )) || (
            <Vehicle
              setVehicles={setVehicles}
              addNew={addNew}
              setAddNew={setAddNew}
            />
          )}
        </Row>
      </div>
    </>
  );
};

export default Vehicles;
