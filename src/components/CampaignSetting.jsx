import { Form, Input, DatePicker } from "antd";

const CampaignSetting = () => (
  <div>
    <h2>Campaign Setting</h2>
    <Form.Item
      name="campaignName"
      label="Campaign name"
      rules={[{ required: true, message: "Please enter a campaign name!" }]}
      className="section-form"
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="campaignSchedule"
      label="Campaign schedule"
      rules={[{ required: true }]}
      className="section-form"
    >
      <DatePicker.RangePicker />
    </Form.Item>
    <Form.Item
      name="campaignBudget"
      label="Campaign budget"
      rules={[{ required: true, message: "Please enter a budget!" }]}
      className="section-form"
    >
      <Input type="number" />
    </Form.Item>
  </div>
);

export default CampaignSetting;
