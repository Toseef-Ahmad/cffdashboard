import React, { useContext, useState, useEffect } from "react";
import { Divider, Steps } from "antd";

import { FcDocument } from "react-icons/fc";
import { FiTruck } from "react-icons/fi";
import { BsFillPersonDashFill } from "react-icons/bs";

import { CffFormContext } from "../contexts/cffDataContext";

const styles = {
  container: {
    width: "400px",
    padding: "0 20px",
  },
};
const OPERATIONS = {
  driver: (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3607 26.8502C20.6619 26.8502 26.5807 20.9314 26.5807 13.6302C26.5807 6.32895 20.6619 0.410156 13.3607 0.410156C6.05951 0.410156 0.140625 6.32895 0.140625 13.6302C0.140625 20.9314 6.05951 26.8502 13.3607 26.8502Z"
        fill="#6AC752"
      />
      <path
        d="M13.3607 26.8502C20.6619 26.8502 26.5807 20.9314 26.5807 13.6302C26.5807 6.32895 20.6619 0.410156 13.3607 0.410156C6.05951 0.410156 0.140625 6.32895 0.140625 13.6302C0.140625 20.9314 6.05951 26.8502 13.3607 26.8502Z"
        fill="#6AC752"
      />
      <path
        d="M11.3573 14.4609C5.64729 14.4609 6.05724 19.5309 6.05724 19.5309H16.6573C16.6573 19.5309 17.0673 14.4609 11.3573 14.4609Z"
        fill="white"
      />
      <path
        d="M11.3586 12.6C12.8986 12.6 14.1587 11.35 14.1587 9.79999C14.1587 8.24999 12.9086 7 11.3586 7C9.81864 7 8.55859 8.24999 8.55859 9.79999C8.55859 11.35 9.80864 12.6 11.3586 12.6Z"
        fill="white"
      />
      <path
        d="M20.2673 11.7305H18.8073V9.98047H16.6672V11.7305H15.0273V13.4705H16.6672V15.2805H18.8073V13.4705H20.2673V11.7305Z"
        fill="white"
      />
    </svg>
  ),
  removeDriver: <BsFillPersonDashFill style={{ color: "red" }} />,
  vehicle: <FiTruck />,
  removeVehicle: <FiTruck style={{ color: "red" }} />,
  document: <FcDocument />,
};

const Activity = () => {
  const { activityOrLogs } = useContext(CffFormContext);
  const [steps, setSteps] = useState([]);

  const convert24to12Time = (time) => {
    const arr = time.split(":");
    const hours = arr[0];
    const minuts = arr[1];
    const seconds = arr[2];

    if (hours > 12) {
      return hours - 12 + ":" + minuts + ":" + seconds + " PM";
    } else {
      return hours + ":" + minuts + ":" + seconds + " AM";
    }
  };

  let t = new Date();

  const renderDate = (date) => {
    const actualDate = new Date(date).toString().split("GMT")[0];
    const a = actualDate.toString().split(" ");

    const day = a[0];
    const month = a[1];
    const datee = a[2];
    const year = a[3];
    t = convert24to12Time(a[4]);

    return month + " " + datee + " " + day + " " + year;
  };

  useEffect(() => {
    const arr = activityOrLogs.map(({ operationOn, message, fireDate }) => {
      return {
        title: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "380px",
            }}
          >
            <div>{message}</div>
            <div>
              {renderDate(fireDate)}
              <div style={{ textAlign: "right" }}>{t}</div>
            </div>
          </div>
        ),
        icon: OPERATIONS[operationOn],
      };
    });
    setSteps([...arr]);
  }, [activityOrLogs]);

  useEffect(() => {
    console.log(activityOrLogs, " activityOrLogs");
  });

  return (
    <div style={{ width: "450px" }}>
      <Steps
        type="default"
        className={styles.container}
        direction="vertical"
        items={[...steps]}
      />
    </div>
  );
};

export default Activity;
