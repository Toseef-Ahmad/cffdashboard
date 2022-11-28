import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { GoPlus } from "react-icons/go";
import { FaChevronDown, FaEnvelope } from "react-icons/fa";
import { AiFillPhone, AiOutlineMail, AiOutlineSearch } from "react-icons/ai";

import {
  Table,
  Avatar,
  Button,
  Modal,
  Select,
  Input,
  Collapse,
  Form,
} from "antd";
import apiRequest from "../../apiRequest";

// context API
import { CffFormContext } from "../../contexts/cffDataContext";
import * as PropTypes from "prop-types";
import TeamManagement from "./team-managment/TeamManagement";

function Panel(props) {
  return null;
}

Panel.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
};
const Settings = () => {
  const [form] = Form.useForm();
  const { setCffFormData, selectCurrentFormData, currentFromData } =
    useContext(CffFormContext);
  const [customersData, setcustomersData] = useState([]);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const handleRegistar = () => {
    setModel(false);
    axios.put(
      `https://backend.cffinsure.com/v1/api/user/update_user/${userInfo?.id}`,
      {
        ...userInfo,
        phone: userInfo?.phone.toString(),
      }
    );
  };

  useEffect(() => {
    if (Object.keys(currentFromData).length) {
      setUserInfo(currentFromData);
    }
  }, [currentFromData]);

  /**
   * Generate Avatar background color
   */
  const generateAvatarColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  /*
    * Display First Charectar on Avator.
      @param {string} name - from get first charector
    */
  const displayFirstChar = (name) => {
    return name.charAt(0);
  };

  useEffect(() => {
    apiRequest({
      method: "get",
      url: `/user/get_all_data`,
    })
      .then((res) => {
        setcustomersData(res.data);

        // set response data to context Api
        setCffFormData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (email) => {
    selectCurrentFormData(email);
    setModel(true);
    // Navigator to next route
    // navigate(`/${email}`);
  };

  const handleAddNewMember = () => {
    setModel(true);
    setUserInfo({});
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      render: (name) => {
        return (
          <>
            <Avatar
              style={{
                backgroundColor: `#${generateAvatarColor()}`,
                verticalAlign: "middle",
                textTransform: "capitalize",
                marginRight: "5px",
              }}
              size={40}
              gap={5}
            >
              {displayFirstChar(name)}
            </Avatar>{" "}
            {name}
          </>
        );
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      render: (email) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <FaEnvelope
              style={{ height: 25, fontSize: 16, color: "#0360CC" }}
            />
            <p>{email}</p>
          </div>
        );
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      render: (phone) => {
        return (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <AiFillPhone
                style={{ color: "#0360CC", fontSize: 16, height: 25 }}
              />
              <p>{phone}</p>
            </div>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (_) => {
        return (
          // <Button
          //   onClick={() => handleEdit(_?.email)}
          //   to="#"
          //   style={{
          //     backgroundColor: "var(--Red)",
          //     color: "var(--White)",
          //     padding: "0.3rem 1rem",
          //     borderRadius: "0.375rem",
          //     display: "flex",
          //     flexDirection: "row-reverse",
          //     alignItems: "center",
          //     columnGap: 10,
          //   }}
          //   icon={<FaChevronDown />}
          // >
          //   Edit
          // </Button>
          ""
        );
      },
    },
  ];

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState([]);

  // Convert data to Array of object
  let arr = [];
  const a = customersData.length;
  for (let i = 0; i <= a - 1; i++) {
    arr.push({
      key: customersData[i]?.id,
      name: customersData[i]?.first_name + " " + customersData[i]?.last_name,
      phone: customersData[i]?.phone,
      email: customersData[i]?.email,
      created: customersData[i]?.createdAt,
      operations: (
        <>
          <Button
            onClick={() => handleEdit(customersData[i]?.email)}
            to="#"
            style={{
              backgroundColor: "var(--Red)",
              color: "var(--White)",
              padding: "0.3rem 1rem",
              borderRadius: "0.375rem",
            }}
          >
            Edit
          </Button>
          {/* <span>Delete</span> */}
        </>
      ),
    });
  }

  React.useEffect(() => {
    !data.length && setData(arr);
  }, [arr]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            return index % 2 === 0;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            return index % 2 !== 0;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  /*
   * Find Is Value exist in Object
   * @param {object} - obj
   * @param {string} - value
   */
  const findValueInObj = (obj, value) => {
    const { name, email, phone } = obj;
    return name.match(value) || email.match(value) || ("" + phone).match(value);
  };

  // Search
  const onSearch = ({ target: { value } }) => {
    const filteredData = data?.filter((row) => {
      return findValueInObj(row, value);
    });
    (value && setIsSearching(true)) || setIsSearching(false);
    setFilteredData([...filteredData]);
  };

  const [model, setModel] = useState(false);

  return (
    <>
      <div className="customer">
        {/*  Add Customer Model */}
        <Modal
          title={<h4 style={{ fontWeight: 700 }}>Team Management</h4>}
          centered
          visible={model}
          onOk={() => handleRegistar()}
          onFinish={() => alert("here")}
          onCancel={() => setModel(false)}
          width="680px"
          footer={[
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="primary"
                danger
                id="password"
                style={{
                  background: "#FFFFFF",
                  color: "#000",
                  borderRadius: 5,
                  borderColor: "#A5A5A5",
                  padding: 20,
                }}
              >
                <p style={{ marginTop: -10 }}>Cancel</p>
              </Button>

              <Button
                type="primary"
                danger
                id="password"
                style={{
                  background: "#A20010",
                  borderRadius: 5,
                  padding: 20,
                }}
              >
                <p style={{ marginTop: -10 }} onClick={handleRegistar}>
                  Create User
                </p>
              </Button>
            </div>,
          ]}
        >
          <div>
            <TeamManagement userInfo={userInfo} setUserInfo={setUserInfo} />
          </div>
        </Modal>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4 style={{ marginBottom: 10, fontWeight: 600 }}>Settings</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h6 style={{ color: "#A20010", fontWeight: 700 }}>
                Team Management
              </h6>
              <div
                style={{ height: 3, width: "100%", background: "#A20010" }}
              ></div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", columnGap: 10 }}>
            {/* <Button
              style={{ position: "relative" }}
              className="addBtn"
              onClick={handleAddNewMember}
            >
              Add new Member
            </Button> */}
            <Input
              placeholder="Search by name, email or phone"
              prefix={<AiOutlineSearch />}
              style={{ borderRadius: 5 }}
              onChange={onSearch}
            />
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={(!isSearching && filteredData) || data}
        />
      </div>
    </>
  );
};

export default Settings;
