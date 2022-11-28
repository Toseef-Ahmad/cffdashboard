import React, { useEffect, useState, useContext } from "react";
import { CffFormContext } from "../contexts/cffDataContext";
import { Input, Select, DatePicker, Space } from "antd";
import moment from "moment";
import "@components/vehicles/VehiclesListPanelCard.css";

/** collision: "SPLIT",
  comprehensive: "SPLIT",
  garage_keepers: "Select",
  garage_keepers_deductable: "$25k with a $500 Deductible",
  liability: null,
  non_own_damage: "0",
  non_own_deductable: "$5k with a $1,000 Deductible",
  on_hook: "1",
  on_hook_deductable: "$25k with a $500 Deductible",
  trailer_deductable: "$5k with a $1,000 Deductible",
  trailer_interchange: "1",
  numer_of_non_owned: "400"
   */

// Coverage Limit and Desuctable Static Values
const DEDUCTABLE = [
  " $5k with a $500 Deductible",
  " $5k with a $1,000 Deductible",
  " $10k with a $500 Deductible",
  " $10k with a $1,000 Deductible",
  "$25k with a $500 Deductible",
  "$50k with a $1,000 Deductible",
  " $75k with a $1,000 Deductible",
  "$100k with a $1,000 Deductible",
  "$150k with a $1,000 Deductible",
  "$200k with a $1,000 Deductible",
  " $250k with a $1,000 Deductible",
];

const CoverageListPanelCard = ({ coverageObj, isEdit, setIsEdit }) => {
  const { updateCoverage } = useContext(CffFormContext);

  const [data, setData] = useState({});
  useEffect(() => {
    setData({ ...coverageObj });
  }, [coverageObj]);

  // Update Coverage
  useEffect(() => {
    if (isEdit === "update") updateCoverage({ ...data });
  }, [isEdit]);

  /**
   * Render property on JSX
   * @param {string} value
   * */
  const renderValue = (value) => {
    console.log(value, ' value .....')
    return (
      (value === '1' && "Yes") ||
      (value === 0 && "No") ||
      (value === "undefined" && "Not Found") ||
      value
    );
  };

  const renderJSX = (type) => {
    switch (type) {
      case "input":
        /** Render Input Field
         * @param {string} property
         * @param {string} label
         * @param {string} placeholder
         * */
        return function ({ property = "", label = "", placeholder = label }) {
          const value = renderValue(data[property]);
          console.log(value, ' madical')
          return (
            <div style={{ flexGrow: 2 }}>
              <label htmlFor={value}>{label}</label>
              <Input
                id={value}
                value={value}
                name={property}
                placeholder={placeholder}
                onChange={({ target }) => {
                  setData((prev) => {
                    !isEdit && setIsEdit(true);
                    const { name, value } = target;
                    return { ...prev, [name]: value };
                  });
                }}
              />
            </div>
          );
        };
      case "select":
        /**
         * @param {string} property
         * @param {string} defaultValue
         * @param {Array} values
         * @param {string} placeholder
         * @param {string} label
         * */
        return function ({
          property = "",
          defaultValue = "Select",
          values = [],
          placeholder = "",
          label = "",
        }) {
          const value = this[property];
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 2.5,
              }}
            >
              <label htmlFor="exclude-driver">{label}</label>
              <Select
                style={{ height: "35.72px", borderRadius: 10 }}
                name="exclude-driver"
                placeholder={placeholder}
                value={value || defaultValue}
                onSelect={(value) => {
                  setData((prev) => {
                    !isEdit && setIsEdit(true);
                    return { ...prev, [property]: value };
                  });
                }}
              >
                {values.map((v) => {
                  return (
                    <option style={{ height: "" }} value={v}>
                      {v}
                    </option>
                  );
                })}
              </Select>
            </div>
          );
        }.bind(data);
    }
  };

  const renderInput = renderJSX("input");
  const renderSelect = renderJSX("select");

  renderInput("collision", "Collision");

  const comprehensiveOptions = ["Yes", "No"];
  renderSelect("comprehensive", [...comprehensiveOptions], "$500 Deductible");



  // Testing Env
  useEffect(() => {
    console.log(coverageObj, ' coverageObj')
  })


  return (
    <>
      <div className="container">
        <div className="general-detail">
          <h4 className="general-detail-heading" style={{ marginBottom: 100 }}>
            Liability (all in 1 dropdown)
          </h4>
          <h4 className="general-detail-heading" style={{ marginBottom: 100 }}>
            UM/UIM Bodily Injury (all in 1 dropdown)
          </h4>
          <h4 className="general-detail-heading" style={{ marginBottom: 150 }}>
            UM/UIM Property Damage (all in 1 dropdown)
          </h4>

          {/* Physical Damage */}
          <h5 className="general-detail-heading">Physical Damage</h5>
          <div style={{ display: "flex" }}>
            <div className="general-detail-fields">
              {/* Collision */}
              {renderInput({ property: "collision", label: "Collision" })}

              {/* comprehensive */}
              {renderInput({
                property: "comprehensive",
                label: "Comprehensive",
              })}
            </div>
          </div>

          {/* Additional Coverages */}
          <h5 className="general-detail-heading" style={{ marginTop: 50 }}>
            Additional Coverages
          </h5>
          <div style={{ display: "flex" }}>
            <div className="general-detail-fields">
              {/* Medical Payments */}
              {renderInput({
                property: "medical_payments",
                label: "Medical Payments",
              })}

              {/* MotorTruck Cargo */}
              {renderInput({
                property: "motor_truck_cargo",
                label: "Motor Truck Cargo",
              })}

              {/* Hired Auto Liability */}
              {renderInput({
                property: "hired_auto_liability",
                label: "Hired Auto Liability",
                placeholder: "Hired Auto Liability",
              })}

              {/* General Liability */}
              {renderInput({
                property: "gernal_libility",
                placeholder: "General Liability",
                label: "General Liability",
              })}
            </div>
          </div>

          {/*  Trailer Interchange */}
          <h5 className="general-detail-heading" style={{ marginTop: 50 }}>
            Trailer Interchange
          </h5>
          <div style={{ display: "flex" }}>
            <div className="general-detail-fields">
              {/* Trailer Interchange */}

              {renderInput({
                property: "trailer_interchange",
                label: "Trailer Interchange",
              })}

              {/* Coverage Limit and Deductible */}
              {renderInput({
                property: "trailer_deductable",
                label: "Coverage Limit and Deductible",
              })}

              {/* Number of Non-Owned Trailers */}
              <div style={{ flexBasis: 400 }}>
                {renderInput({
                  property: "numer_of_non_owned",
                  label: "Trailer Interchange",
                })}
              </div>
            </div>
          </div>

          {/*  Non-Owned Trailer */}
          <h5 className="general-detail-heading" style={{ marginTop: 50 }}>
            Non-Owned Trailer
          </h5>
          <div style={{ display: "flex" }}>
            <div className="general-detail-fields">
              {/* Non-Owned Trailer Physical Damage */}
              {renderSelect({
                property: "non_own_damage",
                label: "Non-Owned Trailer Physical Damage",
                defaultValue: "Select",
              })}

              {/* Coverage Limit and Deductible */}
              {renderSelect({
                property: "non_own_deductable",
                label: "Coverage Limit and Deductible",
                defaultValue: "Select",
                values: [...DEDUCTABLE],
              })}
            </div>
          </div>

          {/*  Garagekeepers */}
          <h5 className="general-detail-heading" style={{ marginTop: 50 }}>
            Garagekeepers
          </h5>
          <div style={{ display: "flex" }}>
            <div className="general-detail-fields">
              {/* Non-Owned Trailer Physical Damage */}
              {renderSelect({
                property: "garage_keepers",
                label: "Garagekeepers",
                defaultValue: "Select",
                values: ["Select", "Not Select"],
              })}

              {/* Coverage Limit and Deductible */}
              {renderSelect({
                property: "garage_keepers_deductable",
                label: "Coverage Limit and Deductible",
                defaultValue: "Select",
                values: [...DEDUCTABLE],
              })}
            </div>
          </div>

          {/*  On Hook */}
          <h5 className="general-detail-heading" style={{ marginTop: 50 }}>
            On Hook
          </h5>
          <div style={{ display: "flex" }}>
            <div className="general-detail-fields">
              {/* On Hook Trailer Physical Damage */}
              {renderSelect({
                property: "on_hook",
                label: "On Hook",
                defaultValue: "Select",
                values: ["Select", "Not Select"],
              })}

              {/* On Hook Coverage Limit and Deductible */}
              {renderSelect({
                property: "on_hook_deductable",
                label: "Coverage Limit and Deductible",
                defaultValue: "Select",
                values: [...DEDUCTABLE],
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverageListPanelCard;
