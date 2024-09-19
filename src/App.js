import React, { useState, useRef, useEffect } from "react";
import { Layout, Form, Input, Button, Steps, Avatar, message } from "antd";
import { UserOutlined, BellOutlined, SettingOutlined } from "@ant-design/icons";
import "./App.css";
import { throttle } from "lodash";
import CampaignSetting from "./components/CampaignSetting";
import AdGroupSetting from "./components/AdGroupSetting";
import AdSetting from "./components/AdSetting";
import Summary from "./components/Summary";

const { Header, Content, Sider } = Layout;
const { Step } = Steps;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const campaignRef = useRef(null);
  const adGroupRef = useRef(null);
  const adSettingRef = useRef(null);
  const summaryRef = useRef(null);

  // const steps = [
  //   { title: "Campaign setting", ref: campaignRef },
  //   { title: "Ad group setting", ref: adGroupRef },
  //   { title: "Ad setting", ref: adSettingRef },
  //   { title: "Summary", ref: summaryRef },
  // ];

  const steps = [
    {
      title: "Campaign setting",
      ref: campaignRef,
      description: ["Campaign name", "Campaign schedule", "Campaign budget"],
    },
    {
      title: "Ad group setting",
      ref: adGroupRef,
      description: [
        "Ad group name",
        "Ad image",
        "Device",
        "Gender",
        "Age",
        "Location",
        "Audience",
      ],
    },
    {
      title: "Ad setting",
      ref: adSettingRef,
      description: [
        "Ad name",
        "Ad schedule",
        "Ad budget",
        "Ad image",
        "Publisher list",
        "Preview",
        "Placement",
        "Ad creation",
      ],
    },
    { title: "Summary", ref: summaryRef, description: [] },
  ];

  useEffect(() => {
    const headerHeight = 64;

    const handleScroll = throttle(() => {
      steps.forEach((step, index) => {
        const element = step.ref.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top < window.innerHeight - headerHeight &&
            rect.bottom > headerHeight
          ) {
            setCurrentStep(index);
          }
        }
      });
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [steps]);

  const checkField = () => {
    form
      .validateFields()
      .then(() => {
        message.success("All steps completed!");
      })
      .catch(() => {
        message.error("Please complete the required fields.");
      });
  };

  const handleStepChange = (step) => {
    const section = steps[step].ref.current;
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setCurrentStep(step);
    }
  };

  return (
    <Layout className="container">
      <Header className="header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Microsoft Virtual Ads
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input.Search
              placeholder="Search"
              style={{ width: 200, marginRight: "16px" }}
            />
            <BellOutlined style={{ fontSize: "20px", marginRight: "24px" }} />
            <SettingOutlined
              style={{ fontSize: "20px", marginRight: "24px" }}
            />
            <Avatar icon={<UserOutlined />} />
            <span style={{ marginLeft: "8px" }}>abc@microsoft.com</span>
          </div>
        </div>
      </Header>
      <Sider width={200} className="sider">
        <Steps
          direction="vertical"
          current={currentStep}
          onChange={handleStepChange}
        >
          {steps.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={
                step.description.length > 0 ? (
                  <ul>
                    {step.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                ) : null
              }
              icon={
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor:
                      currentStep >= index ? "#1890ff" : "#bfbfbf",
                    borderRadius: "50%",
                  }}
                />
              }
            />
          ))}
        </Steps>
      </Sider>
      <Layout className="content-layout">
        <Content style={{ padding: "24px", minHeight: "100vh" }}>
          <Form form={form} layout="vertical">
            <div ref={campaignRef} className="section">
              <CampaignSetting />
            </div>
            <div ref={adGroupRef} className="section">
              <AdGroupSetting />
            </div>
            <div ref={adSettingRef} className="section">
              <AdSetting />
            </div>
            <div ref={summaryRef} className="section">
              <Summary />
            </div>
            <Form.Item style={{ marginTop: "24px" }}>
              <Button type="primary" onClick={checkField}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
