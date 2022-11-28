import React from "react";
import { Select } from "antd";

// Style
import "./user-role.css";

const UserRole = ({ data, setData }) => {
  const { Option } = Select;
  const handleSelect = (value) => {
    setData((prev) => {
      return { ...prev, user_role: value };
    });
  };
  return (
    <>
      <div className="user-role-wrapper">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="role">User Role</label>
          <Select
            defaultValue={data?.user_role}
            style={{ borderRadius: 5 }}
            onSelect={handleSelect}
          >
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </div>
      </div>
    </>
  );
};

export default UserRole;
