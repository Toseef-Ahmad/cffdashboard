import React, { useEffect, useState, useContext } from "react";
import { Input, Select, InputNumber } from "antd";
import { CffFormContext } from "../../contexts/cffDataContext";
import "./VehiclesListPanelCard.css";

const VehiclesListPanelCard = ({
  vehicleObj,
  vehicleType,
  isEdit,
  setIsEdit,
  index,
  addNew = false,
  setAddNew,
  setVehicles,
  setIsVehicleValid,
}) => {
  /**
   * GENERAL DETAILS
   * Vehicle type
   * year
   * make
   * vin number
   * is there loan or lease on the vehicle = lease_value in vehicle obj
   *
   * DETAILS
   * zip code where vehicle is located
   * Gross vehicle weight
   * would you like physical damage coverage for this vehicle = coverage_vehicle in vehicle obj
   * What is the zip code of the location where you park your vehicles when not in use? = zip_code in vehicle obj
   * The Farthest one-way distance this vehicle typically travels (90% or more of the time) = typically_travel in vehicle
   * Is an Electronic Log Device (ELD) required to record hours of service? = hours_of_service in vehicle obj
   * Do any listed vehicles or the load require a hazardous material place card? = place_card in vehicle obj
   * Does the truck have permanently attached equipment? = attach_equipment in vehicle obj
   * What is the value of the permanently attached equipment? = attach_equipment_p2 in vehicle obj
   * Total Stated Amount (value of vehicle including permanently attached equipment) = vehicle_value + attach_equipment_p2
   * */

  const { updateVehicle, addNewVehicle } = useContext(CffFormContext);

  // destructuring all vehicle related properties
  const {
    Make: make,
    Model: model,
    "Model Year": modelYear,
    vehicle_number: vehicleNumber,

    zip_code: zipCode,
    hour_of_service: hourOfService,
    pace_card: placeCard,
    typically_travel: typicallyTravel,
    attach_equipment: attachedEquipment,
    attach_equipment_p2: attachEquipmentP2,
    coverage_vehicle: coverageVehicle,
    lease_vehicle: leaseVehicle,
    gross_vehicle_weight: grossVehicleWeight,
    vehicle_value: vehicleValue,
    travel_distance: travelDistance,
  } = vehicleObj?.vin || {};

  const [vin, setVin] = useState({});
  const [vehicle, setVehicle] = useState({});
  useEffect(() => {
    setVin({ ...vehicleObj?.vin });
    setVehicle({ ...vehicleObj });
  }, []);

  useEffect(() => {
    isEdit === "update" &&
      !addNew &&
      updateVehicle({ ...vehicle, vin: { ...vin } }, index);
    // isEdit === "update" &&
    if (isEdit === "update" && addNew) {
      addNewVehicle({ ...vehicle, vin: { ...vin } });
      setVehicles((prev) => {
        return [...prev, { ...vehicle, vin: { ...vin } }];
      });
      setAddNew(false);
    }
  }, [isEdit]);

  const handleSelect = (key) => {
    validateVehicle();
    !isEdit && setIsEdit(true);

    return ({ value }) => {
      setVin((prev) => {
        return { ...prev, [key]: value };
      });
    };
  };
  const handleChange = ({ target }) => {
    validateVehicle();
    !isEdit && setIsEdit(true);
    const { name, value } = target;

    switch (name) {
      case "Make":
        setVin((prev) => {
          return { ...prev, Make: { ...prev.Make, Value: value } };
        });
        break;
      case "Model":
        setVin((prev) => {
          return { ...prev, Model: { ...prev.Model, Value: value } };
        });
        break;
      case "Model Year":
        setVin((prev) => {
          return {
            ...prev,
            ["Model Year"]: { ...prev["Model Year"], Value: value },
          };
        });
        break;
      default:
        setVin((prev) => {
          return { ...prev, [name]: value };
        });
    }
  };

  const validateVehicle = () => {
    setIsVehicleValid(Object.keys(vin).length === 12 && vehicle?.vehicle_type);
  };

  // ----- debugging area
  useEffect(() => {
    console.log(vehicle, " vehicle ");
    console.log(vin, " vin ");
    console.log(vehicleNumber, " vehicle number");
  });

  return (
    <>
      <div className="container">
        <div className="general-detail">
          <h4 className="general-detail-heading">General Details</h4>
          <div className="general-detail-fields">
            {/* vehicle type */}
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="vehicle_type">Vehicle Type</label>
              <Input
                id="vehicle_type"
                name="vehicle_type"
                value={vehicle?.vehicle_type}
                placeholder="Vehicle Type"
                onChange={({ target: { name, value } }) => {
                  !isEdit && setIsEdit(true);
                  setVehicle((prev) => {
                    return { ...prev, [name]: value };
                  });
                }}
              />
            </div>

            {/* Year */}
            <div style={{ flexGrow: 1.5 }}>
              <label htmlFor="year">Year</label>
              <Input
                id="year"
                name="Model Year"
                onChange={handleChange}
                value={vin["Model Year"]?.Value}
                placeholder={modelYear?.Value}
              />
            </div>

            {/* Make */}
            <div style={{ flexGrow: 1.5 }}>
              <label htmlFor="make">Make</label>
              <Input
                id="make"
                name="Make"
                onChange={handleChange}
                value={vin?.Make?.Value}
                placeholder="Vehicle Make"
              />
            </div>

            {/* model */}
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="model">Model</label>
              <Input
                id="model"
                name="Model"
                value={vin.Model?.Value}
                onChange={handleChange}
                placeholder="Vehicle Model"
              />
            </div>

            {/* Vin */}
            <div style={{ flexGrow: 2.5 }}>
              <label htmlFor="vin">Vin</label>
              <Input
                id="vin"
                name="vehicle_number"
                value={(vin?.vehicle_number && vin?.vehicle_number) || ""}
                onChange={handleChange}
                placeholder="Vehicle Number"
              />
            </div>

            {/* Is there a loan or lease on the vehicle? */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 2.5,
              }}
            >
              <label htmlFor="lease_vehicle">
                Is there a loan or lease on the vehicle?
              </label>
              <Select
                style={{ height: "35.72px", borderRadius: 10 }}
                name="lease_vehicle"
                placeholder="Select"
                defaultValue={leaseVehicle}
              >
                <option style={{ height: "" }} value="Yes – Loan">
                  Yes – Loan
                </option>
                <option value="Yes – Lease">Yes – Lease</option>
                <option value="No">No</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="details">
          <h4 className="details-heading">Details</h4>
          <div className="details-fields">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "end",
                gap: 30,
                width: "100%",
              }}
            >
              {/* Zip Code */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="zip">Zip Code where vehicle is located</label>
                <div style={{ flexGrow: 3 }}>
                  <Input
                    id="zip"
                    value={vin?.zip_code || ""}
                    name="zip_code"
                    onChange={handleChange}
                    placeholder="Zip Code"
                  />
                </div>
              </div>
              {/* Gross Vehicle Weight */}
              <div style={{ flexGrow: 2 }}>
                <label htmlFor="weight">Gross Vehicle Weight</label>
                <Input
                  id="weight"
                  name="gross_vehicle_weight"
                  value={vin?.gross_vehicle_weight}
                  onChanage={handleChange}
                  placeholder="Gross Vehicle Weight"
                />
              </div>

              {/* Damage Coverage */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 4,
                }}
              >
                <label htmlFor="damage_coverage">
                  Would you like physical damage coverage for this vehicle?
                </label>
                <Select
                  style={{
                    height: "35.72px",
                    borderRadius: 10,
                  }}
                  placeholder="Select"
                  name="coverage_vehicle"
                  defaultValue={(vin?.coverage_vehicle && "Yes") || "No"}
                  onSelect={handleSelect("damage_coverage")}
                  id="damage_coverage"
                  labelInValue
                >
                  <option style={{ height: "" }} value="1">
                    Yes
                  </option>
                  <option value="0">No</option>
                </Select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 30,
                width: "100%",
              }}
            >
              {/* Parking Zip Code */}
              <div style={{ flexGrow: 1 }}>
                <label htmlFor="parking-zip">
                  What is the zip code of the location where you park you
                  vehicles when not in use?
                </label>
                <Input
                  id="parking-zip"
                  name="zip_code_not_use"
                  value={vin?.zip_code_not_use || ""}
                  onChange={handleChange}
                  placeholder="0000"
                />
              </div>

              {/* Farthest one-way distance this vehicle typically travels (90% or more of the time) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 5,
                }}
              >
                <label htmlFor="travel_distance">
                  Farthest one-way distance this vehicle typically travels (90%
                  or more of the time)
                </label>
                <Select
                  style={{ borderRadius: 10 }}
                  name="damage_coverage"
                  placeholder="Select"
                  defaultValue={vin?.travel_distance || "No Available"}
                  onSelect={handleSelect("travel_distance")}
                  id="travel_distance"
                >
                  <option style={{ height: "" }} value="100 Miles">
                    100 Miles
                  </option>
                  <option value="200 Miles">200 Miles</option>
                </Select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 30,
                width: "100%",
              }}
            >
              {/* Is an Electronic Log Device (ELD) required to record hours of service? */}
              <div
                style={{
                  display: "flex",

                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <label htmlFor="hour_of_service">
                  Is an Electronic Log Device (ELD) required to record hours of
                  service?
                </label>
                <Select
                  style={{ borderRadius: 10 }}
                  name="hourOfService"
                  placeholder="Select"
                  defaultValue={(vin?.hour_of_service && "Yes") || "No"}
                  onSelect={handleSelect("hour_of_service")}
                  id="hour_of_service"
                >
                  <option style={{ height: "" }} value="No">
                    No
                  </option>
                  <option value="Yes">Yes</option>
                </Select>
              </div>

              {/* Do any listed vehicles or the load require a hazardous material place card? */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <label htmlFor="place_card">
                  Do any listed vehicles or the load require a hazardous
                  material place card?
                </label>
                <Select
                  style={{ height: "35.72px", borderRadius: 10 }}
                  name="pace_card"
                  placeholder="Select"
                  defaultValue={vin?.placeCard}
                  onSelect={handleSelect("pace_card")}
                  id="place_card"
                >
                  <option style={{ height: "" }} value="No">
                    No
                  </option>
                  <option value="Yes">Yes</option>
                </Select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 30,
                flexWrap: "wrap",
              }}
            >
              {/* Does the truck have permanently attached equipment? */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <label htmlFor="attach_equipment">
                  Does the truck have permanently attached equipment?
                </label>
                <Select
                  style={{ borderRadius: 10 }}
                  name="attach_equipment"
                  placeholder="Select"
                  defaultValue={(vin?.attach_equipment && "Yes") || "No"}
                  onSelect={handleSelect("attach_equipment")}
                  id="attach_equipment"
                >
                  <option style={{ height: "" }} value="Yes">
                    Yes
                  </option>
                  <option value="No">No</option>
                </Select>
              </div>

              {/* What is the value of the permanently attached equipment? */}
              <div style={{ flexGrow: 1 }}>
                <label htmlFor="attach_equipment_P2">
                  What is the value of the pe permanently attached equipment?
                </label>
                <Input
                  id="attach_equipment_p2"
                  name="attach_equipment_p2"
                  value={vin?.attach_equipment_p2 || ""}
                  onChange={handleChange}
                  placeholder="$10000"
                />
              </div>

              {/* Total Stated Amount (value of vehicle including permanently attached equipment) */}
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="total_amount">
                  Total Stated Amount (value of vehicle including permanently
                  attached equipment)
                </label>
                <InputNumber
                  style={{ width: "38%" }}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  id="total_amount"
                  name="total_amount"
                  defaultValue={
                    (vin?.attach_equipment_p2 || 0) +
                      (vin?.vehicle_value || 0) || ""
                  }
                  value={
                    (vin?.attach_equipment_p2 || 0) + (vin?.vehicle_value || 0)
                  }
                  onChange={(value) => {
                    setVin((prev) => {
                      return { ...prev, total_amount: value };
                    });
                  }}
                  placeholder="$10000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehiclesListPanelCard;
