import React from "react";
import "./input-field.css";

const InputField = (props) => {
    return (
        <div
            className={`form-group input-field ${props.customClass}`}
            style={{ alignSelf: "end" }}
        >
            <div id="input-field-icon">{props.icon}</div>
            <input
                onChange={props.onChange}
                placeholder={props.title}
                type={props.type}
                name={props.name}
                className={`form-control ${props.icon && "pl-5"}`}
            />
            <div onClick={props.onIconClick} id="input-field-icon">
                {props.endIcon}
            </div>
        </div>
    );
};

export default InputField;
