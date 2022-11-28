import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, space } from "antd";
import "./Login.css";
import useApi from "../../hooks/useApi";

// login Context
import { LoginContext } from "../../contexts/loginContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { checkIsLoggedIn, setIsLogin } = useContext(LoginContext);
  const { login, setIsLoading, isLoading } = useApi();

  useEffect(() => {
    checkIsLoggedIn() && navigate("/customer");
    console.log(isLoading, " data ");
  });

  /**
   * display notification
   * @param {string} message - message received from api response
   */
  const notify = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      navigate("/customer");
    }, 2000);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onFinish = (values) => {
    setIsLoading(true);
    login(data)
      .then(() => {
        // persist data to localStorage.
        localStorage.setItem("user", JSON.stringify(true));
        setIsLoading(false);
        setIsLogin(true);
        notify("Logged In");
      })
      .catch((err) => {
        console.log();

        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLoading(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-wrapper">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <div className="login">
          <div className="heading">
            <img
              className="login-logo"
              src={require("../../assests/login/cff-insurance-img.png")}
            />
            <img
              className="login-title"
              src={require("../../assests/login/cff-insurance.png")}
            />
          </div>

          <h2 style={{ fontWeight: 600, marginTop: 40 }}>
            Login to your account
          </h2>

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
              <div>
                <label style={{ fontWeight: 600, fontSize: 18 }}>Email</label>
                <Input
                  placeholder="Type"
                  name="admin_email"
                  style={{ padding: 10, width: "100%" }}
                  onChange={handleChange}
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
                  message: "Please Enter your Password.!!!",
                },
              ]}
            >
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <label style={{ fontWeight: 600, fontSize: 18 }}>
                    Password
                  </label>
                  <Link
                    style={{
                      color: "blue",
                      alignSelf: "flex-end",
                      marginBottom: 3,
                    }}
                    to="/reset-password"
                  >
                    Forget Password
                  </Link>
                </div>
                <Input
                  placeholder="Type"
                  name="password"
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
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
