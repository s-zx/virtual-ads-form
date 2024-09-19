import React, { useState } from "react";
import { Form, Upload, Button, Select } from "antd";
const { Option } = Select;

const AdSetting = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const checkPreviewVisibility = (values) => {
    if (
      values.adImage &&
      values.publisherList &&
      values.publisherList.length > 0
    ) {
      setIsPreviewVisible(true);
    } else {
      setIsPreviewVisible(false);
    }
  };

  return (
    <div>
      <h2>Ad Setting</h2>
      <Form
        layout="vertical"
        onValuesChange={(_, values) => checkPreviewVisibility(values)}
      >
        <div className="ad-setting-container">
          <div className="left-column">
            <Form.Item
              name="adImage"
              label="Ad Image"
              rules={[
                { required: true, message: "Please select an ad image!" },
              ]}
              className="section-form"
            >
              <Upload>
                <Button>Select Image</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="publisherList"
              label="Publisher list"
              rules={[{ required: true, message: "Please select publishers!" }]}
              className="section-form"
            >
              <Select mode="multiple" placeholder="Select publishers">
                <Option value="publisher1">Publisher 1</Option>
                <Option value="publisher2">Publisher 2</Option>
                <Option value="publisher3">Publisher 3</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Ad placement" className="section-form">
              <Select defaultValue="full">
                <Option value="full">Full platform</Option>
                <Option value="filter">Filter by category</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="right-column">
            {isPreviewVisible && (
              <div className="preview-section">
                <h3>Preview</h3>
                <p>Here you can preview the selected ad settings and images.</p>
              </div>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AdSetting;
