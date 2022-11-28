import React, { useState } from "react";
import { Collapse } from "antd";
import UserInfo from "./user-info/UserInfo";
import UserPermission from "./user-permision/UserPermission";
import UserRole from "./user-role/UserRole";
// Style
import "./TeamManagement.css";

const { Panel } = Collapse;

const TeamManagement = ({ userInfo: data, setUserInfo: setData }) => {
  return (
    <>
      <div className="team-management-wrapper">
        <Collapse defaultActiveKey={["1"]}>
          <Panel header="User Info" key="1">
            <UserInfo setData={setData} data={data} />
          </Panel>
          <Panel
            header={<p style={{ color: "#0360CC" }}>User Permission</p>}
            key="2"
            style={{ color: "#0360CC" }}
            id="user-permission"
          >
            <UserPermission data={data} setData={setData} />
          </Panel>
          <Panel
            header={<p style={{ color: "#3E8CEE" }}>User Rols</p>}
            key="3"
            id="user-rols"
          >
            <UserRole data={data} setData={setData} />
          </Panel>
        </Collapse>
      </div>
    </>
  );
};
export default TeamManagement;
