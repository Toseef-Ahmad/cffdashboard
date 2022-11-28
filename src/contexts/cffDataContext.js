import React, { createContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
export const CffFormContext = createContext();

export const CffFormProvider = (props) => {
  const [cffFormData, setCffFormData] = useState([]);
  const [currentFromData, setCurrentFormData] = useState({});
  const [updatedFormData, setUpdatedFormData] = useState({});
  const [activityOrLogs, setActivityOrLogs] = useState([]);

  const { updateCustomer } = useApi();

  React.useEffect(() => {
    if (Object.keys(updatedFormData).length) {
      const { id } = currentFromData;
      updateCustomer(updatedFormData, id);
    }
  }, [updatedFormData]);

  // Find selected email from result array of object.!!!
  /** @param {string} email */
  const findCurrentObj = (email) => {
    if (cffFormData.length) {
      return cffFormData.find((fdata) => {
        return fdata.email === email;
      });
    }
  };

  // selet current Form Data from all result array of objects.!
  /**
   * @param {string} email
   */
  const selectCurrentFormData = (email) => {
    const result = findCurrentObj(email);
    result && setCurrentFormData(result);
  };

  // set Updated Vehicle in Vehicles Array of Current User or Customer.
  /**
   * @param {Object} updatedVehicle
   * @param {number} index
   **/
  const updateVehicle = (updatedVehicle, index) => {
    setUpdatedFormData(() => {
      return {
        ...currentFromData,
        vehicle: currentFromData.vehicle.map((v, i) => {
          if (i === index) {
            return { ...updatedVehicle };
          }
          return v;
        }),
      };
    });
  };

  // set Updated Driver in Current User or Customer.
  /**
   * @param {Object} updatedDriver
   * @param {number} index
   **/
  const updateDriver = (updatedDriver, index) => {
    setUpdatedFormData(() => {
      return {
        ...currentFromData,
        driver: currentFromData.driver.map((d, i) => {
          if (i === index) {
            return { ...updatedDriver };
          }
          return d;
        }),
      };
    });
  };

  // set Updated Coverage in Current User or Customer.
  /**
   * @param {Object} updatedCoverage
   **/
  const updateCoverage = (updatedCoverage) => {
    setUpdatedFormData(() => {
      return {
        ...currentFromData,
        coverage: { ...updatedCoverage },
      };
    });
  };

  // set Updated Business in Current User or Customer.
  /**
   * @param {Object} updatedCoverage
   **/
  const updateBusiness = (
    updatedBusiness,
    updatedCoverage,
    { business, coverage }
  ) => {
    console.log(updatedBusiness, " updated Business");
    setUpdatedFormData(() => {
      return {
        ...currentFromData,
        ...(business && { business: { ...updatedBusiness } }),
        ...(coverage && { coverage: { ...updatedCoverage } }),
      };
    });
  };

  // Add new Vehicle in Current Vehcile Array.
  /** @param {Object} - vehicleObj */
  const addNewVehicle = (vehicleObj) => {
    const obj = {
      ...currentFromData,
      vehicle: [...currentFromData.vehicle, { ...vehicleObj }],
    };
    setUpdatedFormData(() => {
      return obj;
    });

    setCurrentFormData((prev) => {
      return { ...prev, obj };
    });

    trackActivity("vehicle", "Vehicle Added", new Date());
  };

  /** Remove Vehicle
   *  Replace localState to currentformData
   *  @para {Array} vehiclesList
   **/
  const removeVehicle = (vehiclesList) => {
    setUpdatedFormData((prev) => {
      return { ...currentFromData, vehicle: [...vehiclesList] };
    });
    trackActivity("removeVehicle", "Vehicle Removed", new Date());
  };

  // Add new Driver in Current Driver Array.
  /** @param {Object} driverObj */
  const addNewDriver = (driverObj) => {
    setUpdatedFormData(() => {
      return {
        ...currentFromData,
        driver: [...currentFromData.driver, { ...driverObj }],
      };
    });
    trackActivity("driver", "Driver Added", new Date());
  };

  /** Remove Driver
   *  Replace localState to currentformData
   *  @para {Array} driversList
   **/
  const removeDriver = (driversList) => {
    setUpdatedFormData((prev) => {
      return { ...currentFromData, driver: [...driversList] };
    });
    trackActivity("removeDriver", "Driver removed", new Date());
  };

  /** Update Documents
   * @param {object} documents - documents object
   */
  const updateDocuments = (documents) => {
    setUpdatedFormData((prev) => {
      return { ...currentFromData, documents };
    });
  };

  /** Will Insert actiity log to the activityOrLog state
   * @param {String} operationOn - name of the catagory where operation occured.
   * @param {String} message
   * @param {Date} fireDate
   */
  const trackActivity = (operationOn, message, fireDate) => {
    setActivityOrLogs((prev) => {
      return [...prev, { operationOn, message, fireDate }];
    });
  };

  return (
    <>
      <CffFormContext.Provider
        value={{
          cffFormData,
          setCffFormData,
          selectCurrentFormData,
          currentFromData,
          updateVehicle,
          removeVehicle,
          removeDriver,
          updateDriver,
          updateCoverage,
          updateBusiness,
          updateDocuments,
          addNewVehicle,
          addNewDriver,
          trackActivity,
          activityOrLogs,
        }}
      >
        {props.children}
      </CffFormContext.Provider>
    </>
  );
};
