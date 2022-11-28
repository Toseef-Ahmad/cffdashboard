import React from "react";
import "./custom-button.css";

const CustomButton = (props) => {
  return (
    <button
      onClick={() => {
        props.onClick && props.onClick();
        props.handleSave && props.handleSave();
        props.setEmailTemplateVisible &&
          props.setEmailTemplateVisible(props.emailVisibility);
      }}
      className={`btn custom-button ${props.customClass}`}
      style={{
        fontWeight: props.weight,
        background: props.bgColor
          ? "linear-gradient(96.67deg, #07E8F6 2.16%, #0360CC 99.53%)"
          : "",
        color: props.textColor ? "#0360CC" : "",
      }}
      type={props.type}
      disabled={props.disabled}
    >
      {props.leftIcon ? (
        <div className="icon" style={{ padding: "0px 8px" }}>
          {props.leftIcon}
        </div>
      ) : (
        ""
      )}
      <span>{props.plusIcon} </span>
      <span> {props.title}</span>
      {props.icon || props.leftIcon ? (
        <div style={{ padding: "0px 8px" }}>{props.icon}</div>
      ) : (
        ""
      )}
    </button>
  );
};

export default CustomButton;
