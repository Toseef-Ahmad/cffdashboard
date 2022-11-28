import React, { useContext, useState } from "react";
import { Tabs } from "antd";

import Business from "../components/Business";
import Vehicles from "../components/Vehicles";
import Drivers from "../components/Drivers";
import Coverage from "../components/Coverage";
import Documents from "../components/Documents";
import Agent from "../components/Agent";
import { MainSection } from "../styles/index";
import UploadDocument from "../components/UploadDocument";
import HeadingSearchSection from "./HeadingSearchSection";
import Button from "antd/es/button";
import { CffFormContext } from "../contexts/cffDataContext";
import ActivityModal from "./activity/ActivityModal";

const MainContent = ({
  onChangeTab,
  handleSectionHideAndShow,
  setTabActive,
  tabActive,
}) => {
  const { TabPane } = Tabs;
  React.useEffect(() => {
    console.log(tabActive);
  });

  const { currentFromData } = useContext(CffFormContext); // data according to the current selected user by email
  const { business, customer } = currentFromData || {};

  // activity
  const [openActivity, setOpenActivity] = useState(false);

  const { customer_first_name, customer_last_name } = customer || {
    customer_first_name: "",
    customer_last_name: "",
  };

  const renderContactName = () => {
    if (customer_first_name || customer_last_name) {
      return customer_first_name + " " + customer_last_name;
    } else {
      return "Contact Name";
    }
  };

  console.log(business, customer, " business", " customer");
  return (
    <div className="main-section">
      <MainSection>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{ display: "flex", alignItems: "flex-start", columnGap: 20 }}
          >
            <h4 style={{}} className="mainHeading">
              {renderContactName()}
            </h4>
            {/* <Button className="activeBtn">Convert To Active</Button> */}
          </div>
          <ActivityModal
            openActivity={openActivity}
            setOpenActivity={setOpenActivity}
          />
          <div style={{ display: "flex", columnGap: 10 }}>
            <svg
              onClick={() => setOpenActivity(true)}
              style={{ cursor: "pointer" }}
              width="40"
              height="39"
              viewBox="0 0 40 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="39" rx="5" fill="#BD0008" />
              <path
                d="M24.5004 32C24.4753 32 24.4504 31.9994 24.4253 31.9982C24.1344 31.9837 23.854 31.8848 23.6183 31.7135C23.3827 31.5423 23.202 31.3062 23.0983 31.034L16.3781 13.3933L12.8656 21.1207C12.7464 21.3829 12.5543 21.6052 12.3121 21.7612C12.0699 21.9171 11.788 22 11.5 22H7.5C7.10218 22 6.72064 21.842 6.43934 21.5607C6.15804 21.2794 6 20.8978 6 20.5C6 20.1022 6.15804 19.7206 6.43934 19.4393C6.72064 19.158 7.10218 19 7.5 19H10.5342L15.1344 8.87931C15.2569 8.60983 15.4564 8.38262 15.7077 8.22628C15.9591 8.06994 16.2511 7.99147 16.547 8.00074C16.8428 8.01001 17.1293 8.1066 17.3704 8.27837C17.6115 8.45014 17.7964 8.68939 17.9017 8.96601L24.6858 26.7742L28.1583 19.8292C28.2829 19.58 28.4744 19.3705 28.7114 19.224C28.9484 19.0776 29.2214 19 29.5 19H33.5C33.8978 19 34.2794 19.158 34.5607 19.4393C34.842 19.7206 35 20.1022 35 20.5C35 20.8978 34.842 21.2794 34.5607 21.5607C34.2794 21.842 33.8978 22 33.5 22H30.427L25.8417 31.1708C25.7171 31.4199 25.5256 31.6294 25.2888 31.7759C25.0519 31.9223 24.7789 31.9999 24.5004 32V32Z"
                fill="white"
              />
            </svg>
            <HeadingSearchSection />
          </div>
        </div>
        <div className="tabs">
          <Tabs
            defaultActiveKey={1 || tabActive}
            onChange={(key) => onChangeTab(key)}
          >
            <TabPane tab="Business" key="1">
              <Business />
            </TabPane>
            <TabPane tab="Vehicles/Trailers" key="2">
              <Vehicles />
            </TabPane>
            <TabPane tab="Drivers" key="3">
              <Drivers />
            </TabPane>
            <TabPane tab="Coverage" key="4">
              <Coverage />
            </TabPane>
            <TabPane
              tab={<span onClick={handleSectionHideAndShow}>Documents</span>}
              key="5"
            >
              {tabActive === true ? (
                <UploadDocument />
              ) : (
                <Documents setTabActive={setTabActive} />
              )}
            </TabPane>
            {/* <TabPane tab="Agent" key="6">
              <Agent />
            </TabPane> */}
          </Tabs>
        </div>
      </MainSection>
    </div>
  );
};

export default MainContent;
