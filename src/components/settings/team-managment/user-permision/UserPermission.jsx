import React from "react";
import { Switch } from "antd";
import { RiQuestionFill } from "react-icons/ri";

// Style
import "./user-permission.css";

const UserPermission = ({ data, setData }) => {
  const handleSwitch = (key) => (value) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return (
    <>
      <div className="user-permission-wrapper">
        <div style={{ display: "flex", columnGap: 10 }}>
          <p>User Permissions </p>
          <RiQuestionFill style={{ fontSize: "1.2rem", color: "#637178" }} />
        </div>
        <div className="edit">
          <p>Can Edit XYZ</p>
          <Switch
            checked={data?.user_permission}
            onChange={handleSwitch("user_permission")}
            style={{ marginLeft: "30%" }}
          />
        </div>
      </div>
    </>
  );
};

export default UserPermission;
