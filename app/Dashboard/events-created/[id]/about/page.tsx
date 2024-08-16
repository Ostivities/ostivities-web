"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import LocationSearch from "@/app/components/LocationSearch";
import { Heading5, Label } from "@/app/components/typography/Typography";
import useComponentDisabled from "@/app/hooks/utils/utils.hooks";
import {
  AFRICAN_TIME_ZONES,
  EVENT_FREQUENCIES,
  EVENT_TYPES,
  STATES_IN_NIGERIA,
} from "@/app/utils/data";
import { EVENT_INFO } from "@/app/utils/enums";
import {
  FacebookFilled,
  InstagramFilled,
  LinkOutlined,
  TwitterOutlined,
  UploadOutlined,
  XOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import React, { useEffect, useRef, useState } from "react";

interface FieldType {}

const AboutEvent = () => {
  const [form] = Form.useForm();
  const watchEventInfo = Form.useWatch("eventInfo", form);
  const [componentDisabled, setComponentDisabled] = useComponentDisabled();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    return values;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };


  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleSelectLocation = (address: string) => {
    setValue("eventAddress", address); // Update the form field value
    setPopoverVisible(false); // Close the popover
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const content = (
    <div style={{ padding: 10 }} ref={popoverRef}>
      <LocationSearch onSelectLocation={handleSelectLocation} />
    </div>
  );

  return (
    <EventDetailsComponent>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        form={form}
        disabled={componentDisabled}
      >
        <Space direction="vertical">
          <Heading5 className="pb-8" content={"Event Details"} />
        </Space>

        <div className="grid grid-cols-2 gap-x-8">
          <Space direction="vertical" size={"small"}>
            <Form.Item
              name={"eventName"}
              label={
                <>
                  <Label
                    content="Event Name"
                    className=""
                    htmlFor="eventName"
                  />
                </>
              }
              rules={[{ required: false, message: "Please input your email" }]}
              className="pr-6"
            >
              <Input
                type="text"
                placeholder="Enter your event name"
                className="placeholder:font-BricolageGrotesqueRegular"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name={"eventDetails"}
              label={
                <>
                  <Label
                    content="Event Details"
                    className=""
                    htmlFor="eventDetails"
                  />
                </>
              }
              rules={[{ required: false, message: "Please enter your evet details" }]}
              className="pr-6"
            >
              <Input.TextArea
                placeholder="Enter Event Details"
                style={{
                  minHeight: "220px",
                  maxHeight: "220px",
                  paddingTop: "10px",
                }}
                className="py-3"
              />
            </Form.Item>

            <Form.Item
              name={"eventState"}
              label={
                <>
                  <Label
                    content="Event State"
                    className=""
                    htmlFor="eventState"
                  />
                </>
              }
              rules={[{ required: false, message: "Please ente your email" }]}
              className="pr-6"
            >
              <Select placeholder="Select State" style={{ width: "100%" }}>
                {STATES_IN_NIGERIA.map((_i) => (
                  <Select.Option value={_i.state} key={_i.state}>
                    {_i.state}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
  name={"eventAddress"}
  label={
    <>
      <Label
        content="Event Address"
        className=""
        htmlFor="eventAddress"
      />
    </>
  }
  rules={[{ required: false, message: "Please input your email" }]}
  className="pr-6"
>
  <Space direction="vertical" size={"small"} style={{ width: '100%' }}>
    
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Input 
        placeholder="Enter Address" 
        style={{ flex: 1, minWidth: '200px', maxWidth: 'calc(100% - 128px)' }} 
      />
      <Popover
        content={content} // Replace 'content' with your actual Popover content
        title="Search for a Location"
        trigger="click"
        open={popoverVisible} // Ensure you manage 'popoverVisible' state
      >
        <Button
          type="default"
          style={{ borderRadius: '5px', minWidth: '120px' }}
          onClick={() => setPopoverVisible(!popoverVisible)}
        >
          Select on Map
        </Button>
      </Popover>
    </div>
  </Space>
</Form.Item>

          </Space>

          <Space direction="vertical" size={"small"}>
            <Form.Item
              name={"CustomURL"}
              label={
                <>
                  <Label
                    content="Custom URL"
                    className=""
                    htmlFor="CustomURL"
                  />
                </>
              }
              rules={[{ required: false, message: "Please input your email" }]}
              className="pr-6"
            >
              <Space.Compact className="w-full">
                <Input
                  style={{
                    width: "48%",
                    borderTopRightRadius: "0px !important",
                    borderBottomRightRadius: "0px !important",
                    color: "#000000",
                  }}
                  defaultValue="https://ostivities.com/discover/"
                  value="https://ostivities.com/discover/"
                  disabled
                />
                <Input
                  style={{
                    width: "100%",
                    borderTopLeftRadius: "0px !important",
                    borderBottomLeftRadius: "0px !important",
                  }}
                  placeholder="Enter your desired url name"
                />
              </Space.Compact>
            </Form.Item>

            <Form.Item
              name={"document"}
              label={
                <>
                  <Label
                    content={
                      <span>
                        Supporting Doc{" "}
                        <span className="optional-text">(optional)</span>
                      </span>
                    }
                    htmlFor="document"
                  />
                </>
              }
              rules={[{ required: false, message: "Please input your email" }]}
              className="pr-6"
            >
              <Space direction="vertical" size="small">
                <Space.Compact className="w-full h-8">
                  <Input
                    style={{
                      width: "90%",
                      borderTopRightRadius: "0px !important",
                      borderBottomRightRadius: "0px !important",
                    }}
                    placeholder="Enter file name (optional)"
                  />
                  <Upload
                    showUploadList={false}
                    beforeUpload={() => false}
                    className="upload-button"
                    onChange={(info) => {
                      const file = info.fileList[0];
                      return file;
                    }}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      className="custom-upload-button"
                    >
                      Click to Upload
                    </Button>
                  </Upload>
                </Space.Compact>
                <span className="font-BricolageGrotesqueLight text-OWANBE_PRY text-xs font-light">
                  *Supporting doc can be Wedding Card, Birthday Card among many
                  others. *Only JPEG, PNG & PDF Allowed and file size should not
                  be more than 10MB.
                </span>
              </Space>
            </Form.Item>

            <Form.Item
              name={"eventType"}
              label={
                <>
                  <Label
                    content="Event Type"
                    className=""
                    htmlFor="eventType"
                  />
                </>
              }
              rules={[{ required: false, message: "Please input your email" }]}
              className="pr-6"
            >
              <Select placeholder="Select Event Type" style={{ width: "100%" }}>
                {EVENT_TYPES.map((_i) => (
                  <Select.Option value={_i.value} key={_i.label}>
                    {_i.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={"eventInfo"}
              label={
                <Label content="Event Info" className="" htmlFor="eventInfo" />
              }
              rules={[{ required: false, message: "Please input your email" }]}
              className="pr-6"
            >
              <Radio.Group className="w-full font-BricolageGrotesqueRegular">
                <Radio
                  value={EVENT_INFO.SINGLE_EVENT}
                  className="w-1/2 font-BricolageGrotesqueRegular"
                >
                  Single Event
                </Radio>
                <Radio
                  value={EVENT_INFO.RECURRING_EVENT}
                  className="font-BricolageGrotesqueRegular"
                >
                  Recurring Event
                </Radio>
              </Radio.Group>
            </Form.Item>

            {watchEventInfo === EVENT_INFO.SINGLE_EVENT && (
              <Form.Item>
                <Form.Item className="w-full">
                  <Label content="Time Zone" className="" htmlFor="timeZone" />
                  <Select
                    placeholder="Select Time Zone"
                    style={{ width: "100%" }}
                  >
                    {AFRICAN_TIME_ZONES.map((zone) => (
                      <Select.Option value={zone.value} key={zone.value}>
                        {zone.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Space direction="horizontal" size="large" className="w-full">
                <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '16px' }}>
  {/* Start Date & Time */}
  <Form.Item style={{ flex: '1 1 363px', minWidth: '150px' }}>
    <Label
      content="Start Date & Time"
      htmlFor="startDateAndTime"
    />
    <DatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      style={{ width: "100%", height: "33px" }}
    />
  </Form.Item>

  {/* End Date & Time */}
  <Form.Item style={{ flex: '1 1 363px', minWidth: '150px' }}>
    <Label content="End Date & Time" htmlFor="endDateAndTime" />
    <DatePicker
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      style={{ width: "100%", height: "33px" }}
    />
  </Form.Item>
</div>
                </Space>

                <Space
                  direction="vertical"
                  size="small"
                  style={{ marginBottom: "4px" }}
                >
                  <label
                    htmlFor="socialdetails"
                    className=""
                    style={{
                      marginBottom: "4px",
                      fontSize: "14.5px",
                      fontFamily: "BricolageGrotesqueregular",
                    }}
                  >
                    Social Media Details{" "}
                    <span style={{ color: "#e20000" }}>(optional)</span>
                  </label>

                  <Row gutter={[16, 8]}>
                    {/* Website Link Field */}
                    <Col xs={24} sm={12}>
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Input
                          prefix={<LinkOutlined />}
                          style={{
                            width: "100%",
                            color: "#000000",
                            marginTop: "8px", // Adjust spacing between label and field
                          }}
                          placeholder="Enter your website URL"
                        />
                      </Space>
                    </Col>

                    {/* Twitter Field */}
                    <Col xs={24} sm={12}>
                      <Form.Item style={{ width: "100%" }}>
                        <Input
                          prefix={<XOutlined />}
                          style={{
                            width: "100%",
                            color: "#000000",
                            marginTop: "8px", // Adjust spacing between label and field
                          }}
                          placeholder="Enter your Twitter/X URL"
                        />
                      </Form.Item>
                    </Col>

                    {/* Facebook Field */}
                    <Col xs={24} sm={12}>
                      <Form.Item style={{ width: "100%" }}>
                        <Input
                          prefix={<FacebookFilled />}
                          style={{
                            width: "100%",
                            color: "#000000",
                            marginTop: "8px", // Adjust spacing between label and field
                          }}
                          placeholder="Enter your Facebook URL"
                        />
                      </Form.Item>
                    </Col>

                    {/* Instagram Field */}
                    <Col xs={24} sm={12}>
                      <Form.Item style={{ width: "100%" }}>
                        <Input
                          prefix={<InstagramFilled />}
                          style={{
                            width: "100%",
                            color: "#000000",
                            marginTop: "8px", // Adjust spacing between label and field
                          }}
                          placeholder="Enter your Instagram URL"
                        />
                      </Form.Item>
                    </Col>

                    {/* ... Add similar Controllers for other social media fields ... */}
                  </Row>
                </Space>
              </Form.Item>
            )}

            {watchEventInfo === EVENT_INFO.RECURRING_EVENT && (
              <Form.Item>
                <Space direction="horizontal" size="large" className="w-full">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div style={{ display: 'flex', gap: '16px' }}>
    {/* Time Zone */}
    <Form.Item style={{ flex: '1 1 300px', minWidth: '150px' }}>
      <Label content="Time Zone" htmlFor="timeZone" />
      <Select
        placeholder="Select Time Zone"
        style={{ width: "100%", height: "33px" }}
      >
        {AFRICAN_TIME_ZONES.map((zone) => (
          <Select.Option value={zone.value} key={zone.value}>
            {zone.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>

    {/* Frequency */}
    <Form.Item style={{ flex: '1 1 300px', minWidth: '150px' }}>
      <Label content="Frequency" htmlFor="eventFrequency" />
      <Select
        placeholder="Select Event Frequency"
        style={{ width: "100%", height: "33px" }}
      >
        {EVENT_FREQUENCIES.map((frequency) => (
          <Select.Option
            value={frequency.value}
            key={frequency.value}
          >
            {frequency.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  </div>

  <div style={{ display: 'flex', gap: '16px' }}>
    {/* Start Date & Time */}
    <Form.Item style={{ flex: '1 1 363px', minWidth: '150px' }}>
      <Label
        content="Start Date & Time"
        htmlFor="startDateAndTime"
      />
      <DatePicker
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        style={{ width: "100%", height: "33px" }}
      />
    </Form.Item>

    {/* End Date & Time */}
    <Form.Item style={{ flex: '1 1 363px', minWidth: '150px' }}>
      <Label content="End Date & Time" htmlFor="endDateAndTime" />
      <DatePicker
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        style={{ width: "100%", height: "33px" }}
      />
    </Form.Item>
  </div>
</div>

                </Space>

                <Space
                  direction="vertical"
                  size="small"
                  style={{ marginBottom: "4px" }}
                >
                  <label
                    htmlFor="socialdetails"
                    className=""
                    style={{
                      marginBottom: "4px",
                      fontSize: "14.5px",
                      fontFamily: "BricolageGrotesqueregular",
                    }}
                  >
                    Social Media Details{" "}
                    <span style={{ color: "#e20000" }}>(optional)</span>
                  </label>

                  <Row gutter={[16, 8]}>
                    {/* Website Link Field */}
                    <Col xs={24} sm={12}>
                      <Form.Item style={{ width: "100%" }}>
                        <Input
                          prefix={<LinkOutlined />}
                          style={{
                            width: "100%",
                            color: "#000000",
                            marginTop: "8px", // Adjust spacing between label and field
                          }}
                          placeholder="Enter your website URL"
                        />
                      </Form.Item>
                    </Col>

                    {/* Twitter Field */}
                    <Col xs={24} sm={12}>
                      <Form.Item style={{ width: "100%" }}>
                        <Input
                          prefix={<XOutlined />}
                          style={{
                            width: "100%",
                            color: "#000000",
                            marginTop: "8px", // Adjust spacing between label and field
                          }}
                          placeholder="Enter your Twitter/X URL"
                        />
                      </Form.Item>
                    </Col>

                    {/* Facebook Field */}
                    <Col xs={24} sm={12}>
                      <Form.Item style={{ width: "100%" }}>
                        <Input
                          prefix={<FacebookFilled />}
                          style={{
                            width: "100%",
                            color: "#000000",
                            marginTop: "8px", // Adjust spacing between label and field
                          }}
                          placeholder="Enter your Facebook URL"
                        />
                      </Form.Item>
                    </Col>

                    {/* Instagram Field */}
                    <Col xs={24} sm={12}>
                      <Form.Item style={{ width: "100%" }}>
                        <Input
                          prefix={<InstagramFilled />}
                          style={{
                            width: "100%",
                            color: "#000000",
                            marginTop: "8px", // Adjust spacing between label and field
                          }}
                          placeholder="Enter your Instagram URL"
                        />
                      </Form.Item>
                    </Col>

                    {/* ... Add similar Controllers for other social media fields ... */}
                  </Row>
                </Space>
              </Form.Item>
            )}
          </Space>
        </div>

        <Space
          direction="horizontal"
          size={"small"}
          align="center"
          style={{ justifyContent: "center", width: "100%" }}
        >
          {componentDisabled === true ? (
            <Button
              type="default"
              htmlType="button"
              size={"large"}
              disabled={false}
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-64"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
                marginTop: "40px", // Add top margin to the button
              }}
              onClick={() => {
                setComponentDisabled(false);
              }}
            >
              Update
            </Button>
          ) : (
            <Button
              type="default"
              htmlType="submit"
              size={"large"}
              disabled={false}
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-64"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
                marginTop: "40px", // Add top margin to the button
              }}
              onClick={() => {
                setComponentDisabled(true);
              }}
            >
              Save Changes
            </Button>
          )}
        </Space>
      </Form>
    </EventDetailsComponent>
  );
};

export default AboutEvent;
function setValue(arg0: string, address: string) {
  throw new Error("Function not implemented.");
}

