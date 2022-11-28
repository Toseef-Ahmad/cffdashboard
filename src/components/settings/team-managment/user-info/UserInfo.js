import React, { useRef, useState, useEffect } from "react";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Styles
import "./UserInfo.css";

const UserInfo = ({ data, setData }) => {
  const imgRef = useRef();

  const handleImage = (img) => {
    // decelarative
    getBase64(img).then((res) => {
      setData((prev) => {
        return { ...prev, picture: res };
      });
    });
  };

  const calculateFileSize = (file) => {
    const kb = file / 1024; // KB
    const mb = kb / 1024;
    return Math.floor(mb);
  };

  const isSizeInRange = (file) => {
    return calculateFileSize(file) <= 5;
  };

  const getBase64 = (file) => {
    if (isSizeInRange(file.size)) {
      // imparitive
      return new Promise((resolve) => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();

        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object

          baseURL = reader.result;
          resolve(baseURL);
        };
      });
    } else {
      alert("File Size Exceed");
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // Open Image Picker
  const callImagePicker = () => () => {
    imgRef.current.click();
  };

  // Reset Password
  const handleResetPassword = () => {
    setData((prev) => {
      return { ...prev, password: "" };
    });
  };

  return (
    <>
      <div className="user-info-wrapper">
        {/* User Info Image container */}

        {(data?.picture !== "test user" && (
          <img
            style={{ cursor: "pointer" }}
            src={data?.picture}
            className="img"
            alt=""
            onClick={callImagePicker()}
          />
        )) || (
          <div
            className="img"
            style={{
              background: "#F7FAFC",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={callImagePicker}
          >
            <PlusOutlined
              style={{
                position: "absolute",
                display: "inline-block",
                top: "42%",
                left: "42%",
                fontSize: "2rem",
              }}
            />
          </div>
        )}
        <div className="right-section">
          <p>Agent Photo</p>
          <p style={{ color: "#637178" }}>
            The proposed size is 512*512px <br /> No bigger than 5mb
          </p>
          <div className="buttons">
            <Button
              type="primary"
              danger
              ghost
              style={{
                borderRadius: 5,
                borderColor: "#A20010",
                color: "#A20010",
              }}
              onClick={() => imgRef.current.click()}
            >
              Change
            </Button>
            <Button
              onClick={() =>
                setData((prev) => {
                  return { ...prev, picture: "not Found" };
                })
              }
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
      <div className="user-form-wrapper">
        <div className="first-row">
          {/* first name */}
          <div>
            <label htmlFor="first-name">First Name</label>
            <Input
              style={{ borderRadius: 5 }}
              id="first-name"
              placeholder="First Name"
              name="first_name"
              value={data?.first_name}
              onChange={handleChange}
            />
          </div>
          {/* last name */}
          <div>
            <label htmlFor="last-name">Last Name</label>
            <Input
              style={{ borderRadius: 5 }}
              id="last-name"
              placeholder="Last Name"
              onChange={handleChange}
              name="last_name"
              value={data?.last_name}
            />
          </div>
        </div>
        {/*  Email */}
        <div>
          <label htmlFor="email">Email</label>
          <Input
            style={{ borderRadius: 5 }}
            id="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data?.email}
          />
        </div>

        {/*  Password */}
        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <div style={{ flexGrow: 1 }}>
            <Input
              style={{ borderRadius: 5 }}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data?.password}
            />
          </div>
          <Button
            type="primary"
            danger
            id="password"
            style={{ background: "#A20010", borderRadius: 5 }}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </div>
      </div>
      <input
        onChange={(e) => {
          handleImage(e.target.files[0]);
        }}
        accept="image/png, image/jpeg"
        ref={imgRef}
        type="file"
        style={{ display: "none" }}
      />
    </>
  );
};

export default UserInfo;
