import React, { useContext, useState, useEffect } from "react";
import { Col, Row, Input, Select } from "antd";
import { CffFormContext } from "../../contexts/cffDataContext";
// USA STATES
import STATES from "../../utils/US-STATES";

  /** Business Type is Entity Type*/
const AdditionalCompanyListCard = ({
  isEdit,
  setIsEdit,
  businessObj,
  coverageObj,
  driver,
  customerObj,
}) => {
  const [business, setBusiness] = useState({});
  const [customer, setCustomer] = useState({});
  const [coverage, setCoverage] = useState({});
  const [whichObjectIsEdited, setWhichObjectIsEdited] = useState({
    business: false,
    coverage: false,
  });

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
      case "customer":
        setWhichObjectIsEdited((prev) => {
          return { ...prev, customer: true };
        });
        setCustomer((prev) => {
          return { ...prev, [name]: value };
        });
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

  // Update Business
  useEffect(() => {
    if (isEdit === "update") {
      updateBusiness(
        { ...business },
        { ...customer },
        { ...whichObjectIsEdited }
      );
    }
  }, [isEdit]);

  return (
    <div className="general-detail-fields-business">
      <h4 style={{ fontSize: 18, fontWeight: 700 }}>Information</h4>
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
              <label htmlFor="business_name">Company Legal Name</label>
              <Input
                id="1"
                name="business_name"
                value={business?.business_name}
                onChange={(e) => handleChange(e, "business")}
                placeholder="Company Legal Name"
              />
            </div>
          </Col>
          {/** DBA (If applicable) */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="business_DBA">DBA (If applicable)</label>
              <Input
                id="1"
                name="business_DBA"
                value={business?.business_DBA}
                onChange={(e) => handleChange(e, "business")}
                placeholder="DBA (If applicable)"
              />
            </div>
          </Col>
          {/** EIN (Optional) */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="business_DBA">EIN (Optional)</label>
              <Input
                id="1"
                name="business_EIN"
                value={business?.business_EIN}
                onChange={(e) => handleChange(e, "business")}
                placeholder="EIN (Optional)"
              />
            </div>
          </Col>

          {/** DOT Number */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="us_dot_number">DOT Number</label>
              <Input
                id="1"
                name="us_dot_number"
                value={business?.us_dot_number}
                onChange={(e) => handleChange(e, "business")}
                placeholder="DOT Number"
              />
            </div>
          </Col>

          {/** MC Number */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="us_dot_number">MC Number</label>
              <Input
                id="1"
                name="business_MC"
                value={business?.business_MC}
                onChange={(e) => handleChange(e, "business")}
                placeholder="MC Number"
              />
            </div>
          </Col>
        </Row>

        <Row style={{ columnGap: 40 }}>
          {/** Number of years in business */}
          <Col span={5} lg={4} sm={24}>
            <div style={{ flexGrow: 2 }}>
              <label htmlFor="years_in_business">
                Number of years in business
              </label>
              <Input
                id="1"
                name="years_in_business"
                value={business?.years_in_business}
                onChange={(e) => handleChange(e, "business")}
                placeholder="Number of years in business"
              />
            </div>
          </Col>

          {/** How is your business structured? */}
          <Col span={5} lg={6} sm={24}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 2.5,
              }}
            >
              <label htmlFor="lease_vehicle">
                How is your business structured?
              </label>
              <Select
                style={{ height: "35.72px", borderRadius: 10 }}
                name="entity_type"
                value={business?.entity_type}
                onSelect={handleSelect("entity_type", "business")}
                placeholder="Business Type"
              >
                <option style={{ height: "" }} value="Copration">
                  Copration
                </option>
                <option value="Individual">Individual</option>
                <option value="LLC">LLC</option>
                <option value="Municipality">Municipality</option>
                <option value="Partnership">Partnership</option>
                <option value="Other">Other</option>
              </Select>
            </div>
          </Col>
        </Row>
      </div>

      <h4 style={{ fontSize: 18, fontWeight: 700 }}>Company Address</h4>
      <div style={{ width: "92%", margin: "50px auto 50px auto" }}>
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
                {
                  STATES.map(state => {
                    return (<Option style={{ height: "" }} value={state}>
                      {state}
                    </Option>)
                  })
                }
                {/*<option style={{ height: "" }} value="Copration">*/}
                {/*  Copration*/}
                {/*</option>*/}
                {/*<option value="Individual">Individual</option>*/}
                {/*<option value="LLC">LLC</option>*/}
                {/*<option value="Municipality">Municipality</option>*/}
                {/*<option value="Partnership">Partnership</option>*/}
                {/*<option value="Other">Other</option>*/}
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
    </div>
  );
};
export default AdditionalCompanyListCard;
