import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Steps } from "antd";
import Activity from "../Activity";

import "./activityModal.css";

const ActivityModal = ({ openActivity, setOpenActivity }) => {
  const handleOk = () => {
    setOpenActivity(false);
  };

  const handleCancel = () => {
    setOpenActivity(false);
  };

  return (
    <Modal
      title="Basic Modal"
      visible={openActivity}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Activity />
    </Modal>
  );
};

export default ActivityModal;
