import { Form, Input, Upload, Button } from "antd";
const AdGroupSetting = () => (
  <div>
    <h2>Ad Group Setting</h2>
    <Form.Item
      name="adGroupName"
      label="Ad group name"
      rules={[{ required: true, message: "Please enter an ad group name!" }]}
      className="section-form"
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="adImage"
      label="Ad Image"
      rules={[{ required: true, message: "Please select an image!" }]}
      className="section-form"
    >
      <Upload>
        <Button>Select Options</Button>
      </Upload>
    </Form.Item>
  </div>
);

export default AdGroupSetting;
