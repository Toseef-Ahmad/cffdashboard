import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GoPlus } from "react-icons/go";
import { AiFillPhone, AiOutlineSearch } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa";

import { Table, Avatar, Button, Modal, Select, Input } from "antd";
import apiRequest from "../apiRequest";
import timezones from "timezones.json";

// context API
import { CffFormContext } from "../contexts/cffDataContext";
import ReactPaginate from "react-paginate";

/** Months Constant */
const MONTHS = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
}

/**
 * Find Current TIME ZONE
 * @param {number} offset
 * @return {string} current time zone
 */
// function expression
const findTimezone = (offset) => {
  // timezones array
  const currentTimezone = timezones.find((z) => {
    console.log(z.offset, offset, " tttt");
    // return z.offset === offset;
  });
  return currentTimezone.abbr;
};

/**
 * Display Formated Date and Time
 * @param {string} date
 * @returns {string} formatedDate
 */
// function expression
const formatedDate = (date) => {

  const dateObj = new Date(date);
  const hours = dateObj.getHours();

  const yearWithDate =
    MONTHS[dateObj.getMonth()] +
    " " +
    dateObj.getDate() +
    " " +
    dateObj.getFullYear();
  const time =
    hours > 12 && hours - 12 + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds() + " PM" ||
      hours + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds() + " AM"
  return (
    <>
      <p style={{ marginBottom: 0 }}>{yearWithDate}</p>
      <p style={{ color: "#0360CC" }}>{time}</p>
    </>
  );
};

const Customer = () => {
  const { setCffFormData, selectCurrentFormData, currentFromData } =
    useContext(CffFormContext);
  const [customersData, setcustomersData] = useState([]);
  const navigate = useNavigate();

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
  const displayFirstChar = (name = "") => {
    return name?.charAt(0);
  };

  useEffect(() => {
    apiRequest({
      method: "get",
      url: `/dashboard/get_cff_dashboard_data`,
    })
      .then((res) => {
        setcustomersData(res.data.result);

        // set response data to context Api
        setCffFormData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (email) => {
    selectCurrentFormData(email);

    // Navigator to next route
    navigate(`/${email}`);
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
      title: "Company Name",
      dataIndex: "company",
      sorter: (a, b) => a.age - b.age,
      render: () => {
        return (
          <>
            <div>
              <p>Justin Feaster Transportation LLC</p>
            </div>
          </>
        );
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.age - b.age,
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
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.age - b.age,
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
      title: "Assigned Agent",
      dataIndex: "assigned",
      sorter: (a, b) => a.age - b.age,
      render: () => {
        return (
          <>
            <div>
              <p>Justin Feaster</p>
            </div>
          </>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "created",
      sorter: (a, b) => a.age - b.age,
      render: (date) => {
        return formatedDate(date);
      },
    },
    {
      title: "Operations",
      dataIndex: "operations",
    },
  ];

  const data = [];

  const a = customersData.length;

  for (let i = 0; i <= a - 1; i++) {
    data.push({
      key: customersData[i]?.id,
      name: customersData[i]?.business.business_first_name,
      phone: customersData[i]?.business.business_phone,
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleShowForms = (e) => {};

  const handleDelete = (key) => {
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
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
            if (index % 2 !== 0) {
              return false;
            }

            return true;
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
            if (index % 2 !== 0) {
              return true;
            }

            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const [model, setModel] = useState(false);

  return (
    <>
      <div className="customer">
        {/*  Add Customer Model */}
        <Modal
          title={
            <h4 style={{ fontWeight: 700, color: "#A20010" }}>
              {/*{currentVehicleModel}*/}+ Add new customer
            </h4>
          }
          centered
          visible={model}
          onOk={() => setModel(false)}
          onCancel={() => setModel(false)}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              placeholder="Find Contact in 360"
              prefix={<AiOutlineSearch />}
              style={{ borderRadius: 5, marginBottom: 10 }}
            />
            <Select placeholder="Assigned Agent" style={{ borderRadius: 5 }} />
          </div>
        </Modal>
        <div style={{ display: "flex", width: "100%" }}>
          <h4>Customers</h4>
          <a
            className="addBtn"
            onClick={() => {
              setModel(true);
              // handleShowForms;
            }}
          >
            Create New Customer
          </a>
        </div>
        <div>
          <Table
            rowSelection={false}
            columns={columns}
            dataSource={data}
            Team
            Management
          />
        </div>
      </div>
    </>
  );
};

export default Customer;
