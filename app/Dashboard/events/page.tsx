"use client";
import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { EVENT_INFO } from "@/app/utils/enums";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import React from "react";

function Events(): JSX.Element {
  const [form] = Form.useForm();
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 16 },
    },
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  return (
    <DashboardLayout title="Events Creation" tab={<></>}>
      <div className="w-5/6 mx-auto flex flex-col space-y-5 py-6">
        <Space direction="vertical">
          <Heading5 className="" content="Hello, Rose" />
          <Paragraph
            className="text-OWANBE_PRY text-xl font-normal font-BricolageGrotesqueRegular"
            content="Lets get started by creating your event "
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>

        <Form {...formItemLayout} style={{ maxWidth: "100%" }}>
          <Row justify="start" className="w-full">
            <Col span={12}>
              <>
                <Form.Item
                  label="Event Name"
                  name="eventName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your event name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={"eventDetails"}
                  label="Event Details"
                  style={{ height: "200px !important" }}
                >
                  <Input.TextArea style={{ height: "200px !important" }} />
                </Form.Item>

                <Form.Item
                  name="eventState"
                  label="Event State"
                  rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Event Address"
                  name="eventAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please input your event name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            </Col>
            <Col span={12}>
              <>
                <Form.Item label="Custom URL">
                  <Space.Compact>
                    <Form.Item
                      name="baseUrl"
                      rules={[
                        {
                          required: true,
                          message: "Please input your event name!",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          borderTopRightRadius: "0px !important",
                          borderBottomRightRadius: "0px !important",
                        }}
                        defaultValue="Ostivities.com/discover"
                        readOnly
                      />
                    </Form.Item>
                    <Form.Item
                      name="eventUrl"
                      rules={[
                        {
                          required: true,
                          message: "Please input your event name!",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          borderTopLeftRadius: "0px !important",
                          borderBottomLeftRadius: "0px !important",
                        }}
                        defaultValue=""
                        placeholder="enter desired name"
                      />
                    </Form.Item>
                  </Space.Compact>
                </Form.Item>

                <Form.Item
                  name="doc"
                  label="Supporting Doc"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="*Only JPEG, PNG & PDF Allowed & File size should not be more than 10MB "
                  style={{ width: "100% !important" }}
                >
                  <Upload
                    name="logo"
                    action="/upload.do"
                    listType="picture"
                    style={{ width: "100% !important" }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  name="eventState"
                  label="Event type"
                  rules={[{ required: true, message: "Please select gender!" }]}
                >
                  <Select placeholder="select your event type">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Event Address"
                  name="eventAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please input your event name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="eventInfo" label="Event Info">
                  {/* <Form.Item></Form.Item> */}

                  <Form.Item
                    name="donation"
                    rules={[
                      {
                        required: true,
                        message: "Please input donation amount!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={EVENT_INFO.SINGLE_EVENT}>
                        Single Event
                      </Radio>
                      <Radio value={EVENT_INFO.RECURRING_EVENT}>
                        Recurring Event
                      </Radio>
                    </Radio.Group>
                    <Space.Compact>
                      <Input
                        defaultValue="Xihu District, Hangzhou"
                        style={{
                          borderTopRightRadius: "0px !important",
                          borderBottomRightRadius: "0px !important",
                        }}
                      />
                      <Select
                        defaultValue="Zhejiang"
                        options={[]}
                        style={{
                          borderTopLeftRadius: "0px !important",
                          borderBottomLeftRadius: "0px !important",
                        }}
                      />
                    </Space.Compact>
                  </Form.Item>
                </Form.Item>
              </>
            </Col>
          </Row>
        </Form>
      </div>
    </DashboardLayout>
  );
}

export default Events;
