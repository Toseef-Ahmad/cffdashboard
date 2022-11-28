import React, { useContext, useEffect, useState } from "react";
import { Collapse, Button, Tag, Modal, Select } from "antd";
import { CffFormContext } from "../../contexts/cffDataContext";

// Styles
import "./VehiclesList.css";
import Vehicle from "./Vehicle";

const VehiclesList = ({ vehicles, handleDelete }) => {
  const { Panel } = Collapse;
  const { currentFromData } = useContext(CffFormContext); // data according to the current selected user by email
  const { vehicle } = currentFromData;
  const [model, setModel] = useState(false);
  const [currentVehicleModel, setCurrentVehicleModel] = useState("");
  const [vehicless, setVehicles] = useState([]);

  useEffect(() => {
    console.log(vehicle, vehicles, " veghicles.,,,");
  });

  return (
    <>
      {/*  Status Model */}
      <Modal
        title={
          <h4 style={{ fontWeight: 700, color: "#A20010" }}>
            {currentVehicleModel}
          </h4>
        }
        centered
        visible={model}
        onOk={() => setModel(false)}
        onCancel={() => setModel(false)}
      >
        <Select style={{ width: "100%" }} placeholder="Status"></Select>
      </Modal>
      {vehicles?.map((v, index) => {
        return (
          <Vehicle
            v={v}
            index={index}
            setModel={setModel}
            setCurrentVehicleModel={setCurrentVehicleModel}
            setVehicles={setVehicles}
            handleDelete={handleDelete}
          />
        );
      })}
    </>
  );
};

export default VehiclesList;
