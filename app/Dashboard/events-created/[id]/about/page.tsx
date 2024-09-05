"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import LocationSearch from "@/app/components/LocationSearch";
import EmailEditor from "@/app/components/QuillEditor/EmailEditor";
import { Heading5, Label,Paragraph } from "@/app/components/typography/Typography";
import useComponentDisabled from "@/app/hooks/utils/utils.hooks";
import {
  AFRICAN_TIME_ZONES,
  EVENT_FREQUENCIES,
  EVENT_TYPES,
  STATES_IN_NIGERIA,
} from "@/app/utils/data";
import { EVENT_INFO } from "@/app/utils/enums";
import { IFormInput } from "@/app/utils/interface";
import {
  DeleteOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkOutlined,
  QuestionCircleOutlined,
  TwitterOutlined,
  UploadOutlined,
  XOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface FieldType {}

const AboutEvent = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useComponentDisabled();
  const { Option } = Select;
  const [showRadio, setShowRadio] = useState(false);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    return values;
  };

  const [editorContent, setEditorContent] = useState("");
  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };


  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
  } = useForm<IFormInput>({
    mode: "all",  // Use your preferred validation mode
    defaultValues: {
      exhibitionspace: false,
      spaceType: '',  // Initializing as an empty string
      spaceAvailable: undefined,
      spaceFee: undefined,
    },
  });

  const watchEventInfo = watch("eventInfo");

  useEffect(() => {
    const subscription: any = watch(() => {
      return;
    });
    return () => subscription.unsubscribe();
  }, [watch]);


  const onSubmit: SubmitHandler<IFormInput> = (data: any) => {
    console.log(data, "data");
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

        <div className="grid grid-cols-2 gap-x-4">
        <div className="flex flex-col space-y-4 pr-6">

            <Controller
                    name="eventName"
                    control={control}
                    render={({ field }) => (
                      <Space direction="vertical" size={"small"}>
                        <Label
                          content="Event Name"
                          className=""
                          htmlFor="eventName"
                        />
                        <Input {...field} placeholder="Enter Event Name" /> 
                      </Space>
                    )}
                  />

        <Paragraph
            className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
            content={"Event Details"}
            styles={{ fontWeight: "bold !important" }}
          />
     <div className="mb-9 pb-16 w-full" style={{ marginBottom: "20px", marginTop: "10px" }}>
            <EmailEditor
              initialValue="<p>Enter event details!</p>"
              onChange={handleEditorChange}
             />
          </div>

<Controller
  name="vendorregistration"
  control={control}
  render={({ field }) => (
    <Form.Item
      style={{ marginBottom: '1px' }}
    >
      <Space align="center">
        <Checkbox
          {...field}
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
        >
                              <span style={{ fontFamily: 'Bricolage Grotesque Light' }}>
                              Vendors registration{" "} 
                                <span className="optional-text">
                                  (allows users to register as vendors for your event)
                                  {" "}
      <a 
        href="https://ostivities.tawk.help/article/how-vendor-management-works" // Replace with your actual URL
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ marginLeft: '8px' }}
      >
        <QuestionCircleOutlined style={{ fontSize: '16px', color: '#858990' }} />
      </a>
    </span>
                              </span>
        </Checkbox>
      </Space>
    </Form.Item>
  )}
/>

<Controller
  name="exhibitionspace"
  control={control}
  render={({ field }) => (
    <Checkbox
      {...field}
      checked={field.value as boolean} // Ensure exhibitionspace is boolean
      onChange={(e) => {
        field.onChange(e.target.checked);
        setShowRadio(e.target.checked); // Toggle radio buttons visibility
      }}
    >
      <span style={{ fontFamily: 'Bricolage Grotesque Light' }}>
      Exhibition Space Booking{" "}
      <span className="optional-text">
        (allows vendors to book exhibition space at your event)
      </span>
      {" "}
      <a 
        href="https://ostivities.tawk.help/article/how-exhibition-space-booking-works" // Replace with your actual URL
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ marginLeft: '8px' }}
      >
        <QuestionCircleOutlined style={{ fontSize: '16px', color: '#858990' }} />
      </a>
    </span>
        </Checkbox>
  )}
/>

{showRadio && (
  <Controller
    name="spaceType"
    control={control}
    render={({ field }) => (
      <Radio.Group
        {...field}
        onChange={(e) => field.onChange(e.target.value as string)} // Ensure value is string
        value={field.value}
      >
        <Radio value="paid">Paid Space</Radio>
        <Radio value="free">Free Space</Radio>
      </Radio.Group>
    )}
  />
)}

{showRadio && watch('spaceType') === 'paid' && (
  <Space direction="horizontal" size="large">
    <Form.Item  label={<span style={{ fontFamily: 'Bricolage Grotesque Light' }}>Space Available</span>}
    >
      <Controller
        name="spaceAvailable"
        control={control}
        render={({ field }) => (
          <Input {...field} placeholder="Enter number of spaces" type="number" />
        )}
      />
    </Form.Item>
    <Form.Item  label={<span style={{ fontFamily: 'Bricolage Grotesque Light' }}>Space Fee</span>}
    >
      <Controller
        name="spaceFee"
        control={control}
        render={({ field }) => (
          <InputNumber 
          {...field} 
          placeholder="Enter space fee" 
          style={{ width: '80%' }}
          min={0}
          formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value?.replace(/\₦\s?|(,*)/g, '') as any}
          />
        )}
      />
    </Form.Item>
  </Space>
)}


<Controller
  name="eventState"
  control={control}
  render={({ field }) => (
    <Space
      direction="vertical"
      size={"small"}
      className="w-full"
      style={{ marginTop: '16px' }} // Adjust the value as needed
    >
      <Label
        content="Event State"
        className=""
        htmlFor="eventState"
      />
      <Select
        placeholder="Select State"
        {...field}
        style={{ width: "100%" }}
      >
        {STATES_IN_NIGERIA.map((_i) => (
          <Option value={_i.state} key={_i.state}>
            {_i.state}
          </Option>
        ))}
      </Select>
    </Space>
  )}
/>


<Controller
  name="eventAddress"
  control={control}
  render={({ field }) => (
    <Space direction="vertical" size={"small"} style={{ width: '100%' }}>
      <label htmlFor="eventAddress">Event Address</label>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Input 
          {...field} 
          placeholder="Enter Address" 
          style={{ flex: 1, minWidth: '200px', maxWidth: 'calc(100% - 128px)' }} 
        />
        <Popover
          content={content}
          title="Search for a Location"
          trigger="click"
          open={popoverVisible}
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
  )}
/>

    </div>
                <div className="flex flex-col space-y-4 pl-6">
                  <Controller
                    name="customURL"
                    control={control}
                    render={({ field }) => (
                      <Space direction="vertical" size="small">
                        <Label
                          content="Custom URL"
                          className=""
                          htmlFor="customURL"
                        />

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
                              width: "52%",
                              borderTopLeftRadius: "0px !important",
                              borderBottomLeftRadius: "0px !important",
                            }}
                            {...field}
                            placeholder="Enter your desired name"
                          />
                        </Space.Compact>
                      </Space>
                    )}
                  />

                  <Space direction="vertical" size="small">
                    <Controller
                      name="document"
                      control={control}
                      render={({ field }) => (
                        <Space direction="vertical" size="small">
                          <Label
                            content={
                              <span>
                                Upload Supporting Doc{" "}
                                <span className="optional-text">
                                  (optional)
                                </span>
                              </span>
                            }
                            htmlFor="document"
                          />

                          <Space.Compact className="w-full h-8">
                            <Input
                              style={{
                                width: "75%",
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
                                const file = info.fileList[0]; // Only take the first file
                                field.onChange(file ? [file] : []); // Override with the new file or empty array
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
                            *Supporting doc can be Wedding Card, Birthday Card
                            among many others. *Only JPEG, PNG & PDF Allowed and
                            file size should not be more than 10MB.
                          </span>
                          {Array.isArray(field.value) &&
                            field.value.length > 0 && (
                              <div className="font-BricolageGrotesqueLight text-xs text-gray-400">
                                Uploaded File:
                                <Space>
                                  <span>{field.value[0].name}</span>
                                  <DeleteOutlined
                                    style={{
                                      color: "#e20000",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => field.onChange([])} // Clear the uploaded file
                                  />
                                </Space>
                              </div>
                            )}
                        </Space>
                      )}
                    />
                    <Controller
                      name="eventType"
                      control={control}
                      render={({ field }) => (
                        <Space
                          direction="vertical"
                          size={"small"}
                          className="w-full"
                        >
                          <Label
                            content="Event Type"
                            className=""
                            htmlFor="eventType"
                          />
                          <Select
                            placeholder="Select Event Type"
                            {...field}
                            style={{ width: "100%" }}
                          >
                            {EVENT_TYPES.map((_i) => (
                              <Option value={_i.value} key={_i.label}>
                                {_i.label}
                              </Option>
                            ))}
                          </Select>
                        </Space>
                      )}
                    />
                  </Space>

                  <Controller
                    name="eventInfo"
                    control={control}
                    render={({ field }) => (
                      <Space
                        direction="vertical"
                        size={"small"}
                        className="w-full"
                      >
                        <Label
                          content="Event Info"
                          className=""
                          htmlFor="eventInfo"
                        />
                        <Radio.Group
                          {...field}
                          className="w-full font-BricolageGrotesqueRegular"
                        >
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
                      </Space>
                    )}
                  />

                  {watchEventInfo === EVENT_INFO.SINGLE_EVENT && (
                    <>
                      <Controller
                        name="timeZone"
                        control={control}
                        render={({ field }) => (
                          <Space
                            direction="vertical"
                            size={"small"}
                            className="w-full"
                          >
                            <Label
                              content="Time Zone"
                              className=""
                              htmlFor="timeZone"
                            />
                            <Select
                              placeholder="Select Time Zone"
                              {...field}
                              style={{ width: "100%" }}
                            >
                              {AFRICAN_TIME_ZONES.map((zone) => (
                                <Option value={zone.value} key={zone.value}>
                                  {zone.label}
                                </Option>
                              ))}
                            </Select>
                          </Space>
                        )}
                      />
                      <Space
                        direction="horizontal"
                        size="large"
                        className="w-full"
                      >
                        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '16px' }}>
  {/* Start Date & Time */}
  <div style={{ flex: '1 1 auto', minWidth: '150px' }}>
    <Label
      content="Start Date & Time"
      htmlFor="startDateAndTime"
    />
    <Controller
      name="startDateAndTime"
      control={control}
      render={({ field }) => (
        <DatePicker
          {...field}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: "100%", height: "33px" }}
        />
      )}
    />
  </div>

  {/* End Date & Time */}
  <div style={{ flex: '1 1 auto', minWidth: '150px' }}>
    <Label
      content="End Date & Time"
      htmlFor="endDateAndTime"
    />
    <Controller
      name="endDateAndTime"
      control={control}
      render={({ field }) => (
        <DatePicker
          {...field}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: "100%", height: "33px" }}
        />
      )}
    />
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
                            <Controller
                              name="websiteUrl" // Use a descriptive name (e.g., websiteUrl)
                              control={control}
                              render={({ field }) => (
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
                                    {...field}
                                    placeholder="Enter your website URL"
                                  />
                                </Space>
                              )}
                            />
                          </Col>

                          {/* Twitter Field */}
                          <Col xs={24} sm={12}>
                            <Controller
                              name="twitterUrl" // Use a descriptive name (e.g., twitterUrl)
                              control={control}
                              render={({ field }) => (
                                <Space
                                  direction="vertical"
                                  size="small"
                                  style={{ width: "100%" }}
                                >
                                  <Input
                                    prefix={<XOutlined />}
                                    style={{
                                      width: "100%",
                                      color: "#000000",
                                      marginTop: "8px", // Adjust spacing between label and field
                                    }}
                                    {...field}
                                    placeholder="Enter your Twitter/X URL"
                                  />
                                </Space>
                              )}
                            />
                          </Col>

                          {/* Facebook Field */}
                          <Col xs={24} sm={12}>
                            <Controller
                              name="facebookUrl" // Use a descriptive name (e.g., facebookUrl)
                              control={control}
                              render={({ field }) => (
                                <Space
                                  direction="vertical"
                                  size="small"
                                  style={{ width: "100%" }}
                                >
                                  <Input
                                    prefix={<FacebookFilled />}
                                    style={{
                                      width: "100%",
                                      color: "#000000",
                                      marginTop: "8px", // Adjust spacing between label and field
                                    }}
                                    {...field}
                                    placeholder="Enter your Facebook URL"
                                  />
                                </Space>
                              )}
                            />
                          </Col>

                          {/* Instagram Field */}
                          <Col xs={24} sm={12}>
                            <Controller
                              name="instagramUrl" // Use a descriptive name (e.g., instagramUrl)
                              control={control}
                              render={({ field }) => (
                                <Space
                                  direction="vertical"
                                  size="small"
                                  style={{ width: "100%" }}
                                >
                                  <Input
                                    prefix={<InstagramFilled />}
                                    style={{
                                      width: "100%",
                                      color: "#000000",
                                      marginTop: "8px", // Adjust spacing between label and field
                                    }}
                                    {...field}
                                    placeholder="Enter your Instagram URL"
                                  />
                                </Space>
                              )}
                            />
                          </Col>

                          {/* ... Add similar Controllers for other social media fields ... */}
                        </Row>
                      </Space>
                    </>
                  )}

                  {watchEventInfo === EVENT_INFO.RECURRING_EVENT && (
                    <>
                      <Space
                        direction="horizontal"
                        size="large"
                        className="w-full"
                      >
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div style={{ display: 'flex', gap: '16px' }}>
    {/* Time Zone */}
    <div style={{ flex: '1 1 300px', minWidth: '150px' }}>
      <Label 
        content="Time Zone" 
        htmlFor="timeZone"
      />
      <Controller
        name="timeZone"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select Time Zone"
            {...field}
            style={{ width: "100%", height: "33px" }}
          >
            {AFRICAN_TIME_ZONES.map((zone) => (
              <Option value={zone.value} key={zone.value}>
                {zone.label}
              </Option>
            ))}
          </Select>
        )}
      />
    </div>

    {/* Frequency */}
    <div style={{ flex: '1 1 300px', minWidth: '150px' }}>
      <Label content="Frequency" htmlFor="eventFrequency" />
      <Controller
        name="eventFrequency"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select Event Frequency"
            {...field}
            style={{ width: "100%", height: "33px" }}
          >
            {EVENT_FREQUENCIES.map((frequency) => (
              <Option
                value={frequency.value}
                key={frequency.value}
              >
                {frequency.label}
              </Option>
            ))}
          </Select>
        )}
      />
    </div>
  </div>

  <div style={{ display: 'flex', gap: '16px' }}>
    {/* Start Date & Time */}
    <div style={{ flex: '1 1 353px', minWidth: '150px' }}>
      <Label
        content="Start Date & Time"
        htmlFor="startDateAndTime"
      />
      <Controller
        name="startDateAndTime"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: "100%", height: "33px" }}
          />
        )}
      />
    </div>

    {/* End Date & Time */}
    <div style={{ flex: '1 1 353px', minWidth: '150px' }}>
      <Label
        content="End Date & Time"
        htmlFor="endDateAndTime"
      />
      <Controller
        name="endDateAndTime"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            style={{ width: "100%", height: "33px" }}
          />
        )}
      />
    </div>
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
                            <Controller
                              name="websiteUrl" // Use a descriptive name (e.g., websiteUrl)
                              control={control}
                              render={({ field }) => (
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
                                    {...field}
                                    placeholder="Enter your website URL"
                                  />
                                </Space>
                              )}
                            />
                          </Col>

                          {/* Twitter Field */}
                          <Col xs={24} sm={12}>
                            <Controller
                              name="twitterUrl" // Use a descriptive name (e.g., twitterUrl)
                              control={control}
                              render={({ field }) => (
                                <Space
                                  direction="vertical"
                                  size="small"
                                  style={{ width: "100%" }}
                                >
                                  <Input
                                    prefix={<XOutlined />}
                                    style={{
                                      width: "100%",
                                      color: "#000000",
                                      marginTop: "8px", // Adjust spacing between label and field
                                    }}
                                    {...field}
                                    placeholder="Enter your Twitter/X URL"
                                  />
                                </Space>
                              )}
                            />
                          </Col>

                          {/* Facebook Field */}
                          <Col xs={24} sm={12}>
                            <Controller
                              name="facebookUrl" // Use a descriptive name (e.g., facebookUrl)
                              control={control}
                              render={({ field }) => (
                                <Space
                                  direction="vertical"
                                  size="small"
                                  style={{ width: "100%" }}
                                >
                                  <Input
                                    prefix={<FacebookFilled />}
                                    style={{
                                      width: "100%",
                                      color: "#000000",
                                      marginTop: "8px", // Adjust spacing between label and field
                                    }}
                                    {...field}
                                    placeholder="Enter your Facebook URL"
                                  />
                                </Space>
                              )}
                            />
                          </Col>

                          {/* Instagram Field */}
                          <Col xs={24} sm={12}>
                            <Controller
                              name="instagramUrl" // Use a descriptive name (e.g., instagramUrl)
                              control={control}
                              render={({ field }) => (
                                <Space
                                  direction="vertical"
                                  size="small"
                                  style={{ width: "100%" }}
                                >
                                  <Input
                                    prefix={<InstagramFilled />}
                                    style={{
                                      width: "100%",
                                      color: "#000000",
                                      marginTop: "8px", // Adjust spacing between label and field
                                    }}
                                    {...field}
                                    placeholder="Enter your Instagram URL"
                                  />
                                </Space>
                              )}
                            />
                          </Col>

                          {/* ... Add similar Controllers for other social media fields ... */}
                        </Row>
                      </Space>
                    </>
                  )}
                </div>
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
                marginTop: "60px", // Add top margin to the button
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
                marginTop: "60px", // Add top margin to the button
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

