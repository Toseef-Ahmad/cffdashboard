import React, { useContext, useState, useEffect } from "react";
import { Col, Row, Input, Select, Button } from "antd";

// React Icons
import { AiOutlineDelete } from "react-icons/ai";

import { CffFormContext } from "../../contexts/cffDataContext";
// import "@components/vehicles/VehiclesListPanelCard.css";

// US STATES
import STATES from "../../utils/US-STATES";

/** Business Type is Entity Type*/
const PrimaryContactListCard = ({
  isEdit,
  setIsEdit,
  businessObj,
  coverageObj,
  driver,
  customerObj,
}) => {
  const [business, setBusiness] = useState({});
  const [customer, setCustomer] = useState({});
  const [additionalContacts, setAdditionalContacts] = useState([
    { name: "toseef" },
    { name: "ahmad" },
  ]); // additional contacts.
  const [coverage, setCoverage] = useState({});
  const [whichObjectIsEdited, setWhichObjectIsEdited] = useState({
    business: false,
    coverage: false,
  });

  /** 🔥 If there is not any Additional Contacts list inside customer Then create it.!!! */
  useEffect(() => {
    const {
      customer_street,
      customer_street_2,
      customer_city,
      customer_state,
      customer_zip,
    } = customerObj;
    console.log(customer, " customer...");
    setAdditionalContacts((prev) => {
      return [
        {
          customer_street,
          customer_street_2,
          customer_city,
          customer_state,
          customer_zip,
        },
      ];
    });
  }, []);

  const { Option } = Select;

  useEffect(() => {
    setBusiness({ ...businessObj });
    setCoverage({ ...coverageObj });
    setCustomer({ ...customerObj });
  }, []);

  const { currentFromData, updateBusiness } = useContext(CffFormContext);
  const [haveAnyPlacard, setHaveAnyPlacard] = useState(false);

  /**
   * Check any of Vehicle Contains Place Card
   * @return {boolean}
   **/
  const checkPlaceCard = () => {
    const result = currentFromData?.vehicle.some((v) => {
      return v?.vin?.place_card && true;
    });
    setHaveAnyPlacard(result);
  };

  useEffect(() => {
    checkPlaceCard();
  }, [currentFromData]);

  const handleChange = (e, fun) => {
    !isEdit && setIsEdit(true);
    const { name, value } = e?.target;
    switch (fun) {
      case "coverage":
        setWhichObjectIsEdited((prev) => {
          return { ...prev, coverage: true };
        });
        setCoverage((prev) => {
          return { ...prev, [name]: value };
        });
        break;
      case "business":
        setWhichObjectIsEdited((prev) => {
          return { ...prev, business: true };
        });
        setBusiness((prev) => {
          return { ...prev, [name]: value };
        });
        break;
      case "customer":
        setWhichObjectIsEdited((prev) => {
          return { ...prev, customer: true };
        });
        setCustomer((prev) => {
          return { ...prev, [name]: value };
        });
        break;
    }
  };

  const handleSelect = (key, fun) => {
    return (value) => {
      !isEdit && setIsEdit(true);
      switch (fun) {
        case "coverage":
          setWhichObjectIsEdited((prev) => {
            return { ...prev, coverage: true };
          });
          setCoverage((prev) => {
            return { ...prev, [key]: value };
          });
          break;
        case "customer":
          setWhichObjectIsEdited((prev) => {
            return { ...prev, customer: true };
          });
          setCustomer((prev) => {
            return { ...prev, [key]: value };
          });
          break;
        case "business":
          setWhichObjectIsEdited((prev) => {
            return { ...prev, business: true };
          });
          setBusiness((prev) => {
            return { ...prev, [key]: value };
          });
          break;
      }
    };
  };

  const renderDateOfBirth = (date) => {
    const dateObj = new Date(date);
    return (
      dateObj.getFullYear() + "-" + dateObj.getMonth() + "-" + dateObj.getDate()
    );
  };

  // Update Business
  useEffect(() => {
    if (isEdit === "update")
      updateBusiness(
        { ...business },
        { ...coverage },
        { ...customer },
        { ...whichObjectIsEdited }
      );
  }, [isEdit]);

  useEffect(() => {
    console.log(business, " business");
    console.log(customer, "customer");
    console.log(currentFromData, " currentFormData");
  });

  const handleAddContacts = () => {
    setAdditionalContacts((prev) => {
      return [
        ...prev,
        {
          customer_street: "",
          customer_street_2: "",
          customer_city: "",
          customer_state: "",
          customer_zip: "",
        },
      ];
    });
  };

  // handle Additional Contact
  const handleAdditionalContact =
    (index) =>
    ({ target: { name, value } }) => {
      console.log(name, value, "namevalue");
      setAdditionalContacts((prev) => {
        const obj = prev[index];
        obj[name] = value;
        const updatedArr = prev.filter((c, i) => {
          return i !== index;
        });
        updatedArr[index] = { ...obj };
        return updatedArr;
      });
    };

  const handleDeleteAdditionalContact = (index) => {
    setAdditionalContacts((prev) => {
      return prev.filter((ac, i) => {
        return i !== index;
      });
    });
  };

  useEffect(() => {
    console.log(additionalContacts, " additionalContacts");
  });

  return (
    <div className="general-detail-fields-business">
      <h4 style={{ marginTop: 50, fontSize: 18, fontWeight: 700 }}>
        Business Owner
      </h4>
      <div style={{ width: "92%", margin: "50px auto 50px auto" }}>
        {/* Row Two */}
        <Row justify="space-between">
          <Col span={5} lg={5} sm={24}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 2.5,
              }}
            >
              <label htmlFor="customer_first_name">First Name</label>
              <Input
                id="1"
                name="customer_first_name"
                value={customer?.customer_first_name}
                onChange={(e) => handleChange(e, "customer")}
                placeholder="First Name"
              />
            </div>
          </Col>
          {/** Last Name */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="customer_last_name">Last Name</label>
              <Input
                id="1"
                name="customer_last_name"
                value={customer?.customer_last_name}
                onChange={(e) => handleChange(e, "customer")}
                placeholder="Last Name"
              />
            </div>
          </Col>
          {/** Date of Birth */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="business_DBA">Date of Birth</label>
              <Input
                id="1"
                name="business_EIN"
                value={renderDateOfBirth(customer?.customer_dob)}
                onChange={(e) => handleChange(e, "customer")}
                placeholder="Date Of Birth"
              />
            </div>
          </Col>

          {/** Cell Phone Number  */}
          <Col span={0} lg={3} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="business_phone">Cell Phone Number</label>
              <Input
                id="1"
                name="business_phone"
                value={business?.business_phone}
                onChange={(e) => handleChange(e, "customer")}
                placeholder="Cell Phone Number"
              />
            </div>
          </Col>

          {/** Email Address */}
          <Col span={5} lg={5} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="business_email">Email Address</label>
              <Input
                id="1"
                name="business_email"
                value={business?.business_email}
                onChange={(e) => handleChange(e, "customer")}
                placeholder="Email Address"
              />
            </div>
          </Col>
        </Row>

        {/* Row Two */}

        <Row justify="space-between">
          {/** Address */}
          <Col span={5} lg={5} sm={24}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 2.5,
              }}
            >
              <label htmlFor="customer_street">Address</label>
              <Input
                id="1"
                name="customer_street"
                value={customer?.customer_street}
                onChange={(e) => handleChange(e, "customer")}
                placeholder="Address"
              />
            </div>
          </Col>
          {/** Address Line 2 */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="business_DBA">Address Line 2</label>
              <Input
                id="1"
                name="customer_street_2"
                value={customer?.customer_street_2}
                onChange={(e) => handleChange(e, "customer")}
                placeholder="Address 2"
              />
            </div>
          </Col>
          {/** City */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="customer_city">City</label>
              <Input
                id="1"
                name="customer_city"
                value={customer?.customer_city}
                onChange={(e) => handleChange(e, "customer")}
                placeholder="City"
              />
            </div>
          </Col>

          {/** State */}
          <Col span={5} lg={4} sm={24}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 2.5,
              }}
            >
              <label htmlFor="lease_vehicle">State</label>
              <Select
                style={{ height: "35.72px", borderRadius: 10 }}
                name="customer_state"
                value={customer?.customer_state}
                onSelect={handleSelect("customer_state", "customer")}
                placeholder="State"
                defaultValue="Massachusetts"
              >
                {STATES.map((state) => {
                  return <Option value={state}>{state}</Option>;
                })}
              </Select>
            </div>
          </Col>

          {/** Zip Code */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="customer_zip">Zip Code</label>
              <Input
                id="1"
                name="customer_zip"
                value={customer?.customer_zip}
                onChange={(e) => handleChange(e, "customer")}
                placeholder="Zip Code"
              />
            </div>
          </Col>
        </Row>
      </div>

      {/** Company address with add Contact */}
      <div style={{ display: "flex", columnGap: 20 }}>
        <h4 style={{ fontSize: 18, fontWeight: 700 }}>Additional Contacts</h4>
        <p
          style={{ color: "#0360CC", cursor: "pointer" }}
          onClick={handleAddContacts}
        >
          <Button>+ Add Contacts</Button>
        </p>
      </div>

      {/* 💡Implement Array to hold primary contacts because these are multiples. */}
      {additionalContacts.map((contacts, index) => {
        const {
          customer_street,
          customer_street_2,
          customer_city,
          customer_state,
          customer_zip,
        } = contacts;

        return (
          <div
            style={{
              width: "92%",
              margin: "50px auto 50px auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Row Two */}
            <Row justify="space-between">
              {/** Address */}
              <Col span={5} lg={5} sm={24}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 2.5,
                  }}
                >
                  <label htmlFor="customer_street">Address</label>
                  <Input
                    id="1"
                    name="customer_street"
                    value={customer_street}
                    onChange={handleAdditionalContact(index)}
                    placeholder="Address"
                  />
                </div>
              </Col>
              {/** Address Line 2 */}
              <Col span={5} lg={4} sm={24}>
                <div style={{ flexGrow: 2 }}>
                  <label htmlFor="business_DBA">Address Line 2</label>
                  <Input
                    id="1"
                    name="customer_street_2"
                    value={customer_street_2}
                    onChange={handleAdditionalContact(index)}
                    placeholder="Address 2"
                  />
                </div>
              </Col>
              {/** City */}
              <Col span={5} lg={4} sm={24}>
                <div style={{ flexGrow: 2 }}>
                  <label htmlFor="customer_city">City</label>
                  <Input
                    id="1"
                    name="customer_city"
                    value={customer_city}
                    onChange={handleAdditionalContact(index)}
                    placeholder="City"
                  />
                </div>
              </Col>

              {/** State */}
              <Col span={5} lg={4} sm={24}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 2.5,
                  }}
                >
                  <label htmlFor="lease_vehicle">State</label>
                  <Select
                    style={{ height: "35.72px", borderRadius: 10 }}
                    name="customer_state"
                    value={customer_state}
                    onSelect={(value) =>
                      handleAdditionalContact(index)({
                        target: { name: "customer_state", value: value },
                      })
                    }
                    placeholder="State"
                    defaultValue="Massachusetts"
                  >
                    {STATES.map((state) => {
                      return <Option value={state}>{state}</Option>;
                    })}
                  </Select>
                </div>
              </Col>

              {/** Zip Code */}
              <Col span={5} lg={4} sm={24}>
                <div style={{ flexGrow: 2 }}>
                  <label htmlFor="customer_zip">Zip Code</label>
                  <Input
                    id="1"
                    name="customer_zip"
                    value={customer_zip}
                    onChange={handleAdditionalContact(index)}
                    placeholder="Zip Code"
                  />
                </div>
              </Col>
            </Row>
            {index > 0 && (
              <AiOutlineDelete
                onClick={handleDeleteAdditionalContact}
                style={{
                  marginLeft: 10,
                  fontSize: 25,
                  color: "red",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default PrimaryContactListCard;
