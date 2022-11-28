import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, space } from "antd";
import { toast } from "react-toastify";

import "../Login.css";
import useApi from "../../../hooks/useApi";

const ResetPassword = () => {
  const [data, setData] = useState({});
  const [isOptReceived, setIsOptReceived] = useState(false);
  const [otp, setOtp] = useState(0);
  const { forgetPassword, isLoading, setIsLoading } = useApi();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onFinish = (values) => {
    setIsLoading(true);
    forgetPassword({ ...data })
      .then((res) => {
        setIsLoading(false);
        const { otp } = res.data;
        setIsOptReceived(true);
        setOtp(otp || 0);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-wrapper">
        <div
          className="login"
          style={{ height: (isOptReceived && "650px") || "" }}
        >
          <div className="heading">
            <img
              className="logo"
              src={require("../../../assests/login/cff-insurance-img.png")}
            />
            <img
              className="title"
              src={require("../../../assests/login/cff-insurance.png")}
            />
          </div>

          <h2 style={{ fontWeight: 600, marginTop: 40 }}>
            Reset your password
          </h2>
          {(isOptReceived && <NewPassword otp={otp} />) || (
            <Form
              style={{
                width: "100%",
                margin: "0 auto",
              }}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                //   label="Email"
                name="email"
                type="email"
                style={{
                  width: "90%",
                  margin: "0 auto",
                  marginTop: 10,
                  marginBottom: 10,
                }}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please Enter your Email.!!!",
                  },
                ]}
              >
                {/*<label style={{ fontWeight: 600, fontSize: 18 }}>Email</label>*/}
                <Input
                  placeholder="Email"
                  name="admin_email"
                  style={{ padding: 10, width: "100%", marginBottom: 10 }}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn"
                  loading={isLoading}
                >
                  Forget Password
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

const NewPassword = ({ otp = "" }) => {
  const [data, setData] = useState({});
  const { isLoading, setIsLoading, resetPassword } = useApi();

  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    setData((prev) => {
      return { ...prev, otp };
    });
  }, [otp]);

  const setErrorMessage = (name) => {
    switch (name) {
      case "password":
        form.setFields([
          {
            name: "password",
            errors: ["Password Should Be Same."],
          },
          {
            name: "confirmPassword",
            errors: ["Password Should Be Same."],
          },
        ]);
        break;
      case "otp":
        form.setFields([
          {
            name: "otp",
            errors: ["OTP is NOT Valid"],
          },
        ]);
    }
  };

  /**
   * display notification
   * @param {string} message - message received from api response
   */
  const notify = (message) => {
    toast.success(message);

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const validateBothPassword = () => {
    const { password, confirmPassword } = data;
    return password === confirmPassword;
  };

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const onFinish = () => {
    if (validateBothPassword()) {
      setIsLoading(true);
      resetPassword({ ...data })
        .then(() => {
          setIsLoading(false);
          notify("Password Has Changed.!");
        })
        .catch(() => {
          setIsLoading(false);
          setErrorMessage("otp");
        });
    } else {
      setErrorMessage("password");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      style={{
        width: "100%",
        margin: "0 auto",
      }}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        disable={true}
        name="otp"
        style={{
          width: "90%",
          margin: "0 auto",
          marginTop: 10,
          marginBottom: 10,
        }}
        rules={[
          {
            required: !otp,
            message: "Please Enter OPT.!!!",
          },
        ]}
      >
        <div>
          <label style={{ fontWeight: 600, fontSize: 18 }}>OPT</label>
          <Input
            disabled={otp}
            placeholder="OPT"
            name="otp"
            style={{ padding: 10, width: "100%" }}
            onChange={handleChange}
            value={data?.otp}
          />
        </div>
      </Form.Item>

      <Form.Item
        //   label="Email"
        size="large"
        name="password"
        style={{ width: "90%", margin: "0 auto 15px" }}
        rules={[
          {
            required: true,
            message: "Please Enter your New Password.!!!",
          },
        ]}
      >
        <div>
          <label style={{ fontWeight: 600, fontSize: 18 }}>New Password</label>
          <Input
            placeholder="Type"
            name="password"
            style={{ padding: 10, width: "100%" }}
            onChange={handleChange}
          />
        </div>
      </Form.Item>

      {/* Confirm Password */}
      <Form.Item
        size="large"
        name="confirmPassword"
        style={{ width: "90%", margin: "0 auto 15px" }}
        rules={[
          {
            required: true,
            message: "Please Re-enter your Password.!!!",
          },
        ]}
      >
        <div>
          <label style={{ fontWeight: 600, fontSize: 18 }}>
            Confirm Password
          </label>
          <Input
            placeholder="Type"
            name="confirmPassword"
            style={{ padding: 10, width: "100%" }}
            onChange={handleChange}
          />
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn"
          loading={isLoading}
        >
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPassword;
