import React from "react";
import { useLocation } from "react-router-dom";
import { Input, Button, message } from "antd";
import { AiOutlineSearch, AiOutlineLink } from "react-icons/ai";

const HeadingSearchSection = () => {
  const location = useLocation();

  const currentPath = window.location.href;
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = () => {
    messageApi.open({
      type: "success",
      content: "Link Copied",
    });
  };

  const handleGenerateLink = () => {
    navigator.clipboard.writeText(currentPath);
    successMessage();
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: "flex", columnGap: 10, height: 39 }}>
        <Input
          prefix={<AiOutlineSearch />}
          style={{ borderRadius: 5, height: "100%" }}
          placeholder="Search"
        />

        <Button
          danger
          style={{
            borderRadius: 5,
            height: "100%",
            borderColor: "#A20010",
            color: "#A20010",
            fontWeight: 600,
          }}
        >
          View Customer Form
        </Button>

        <Button
          type="primary"
          style={{ background: "#A20010", height: "100%", borderRadius: 5 }}
          icon={
            <AiOutlineLink style={{ marginRight: 10, fontSize: "1.2rem" }} />
          }
          onClick={handleGenerateLink}
        >
          Generate Link
        </Button>
      </div>
    </>
  );
};

export default HeadingSearchSection;
