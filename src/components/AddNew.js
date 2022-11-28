import React from "react";

const styles = {
  /* Add new Vehicle */
  addNew: {
    width: "100%",
    height: 93,
    border: "2px dashed #a20010",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: 30,
  },
};

const AddNew = ({ title, setAddNew = () => {} }) => (
  <div style={styles.addNew} onClick={() => setAddNew(true)}>
    <span style={{ fontSize: 24, lineHeight: 29, color: "#A20010" }}>
      {title}
    </span>
  </div>
);

export default AddNew;
