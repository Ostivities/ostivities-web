"use client";
import EventPageAppearance from "@/app/components/forms/create-events/EventPageAppearance";
import LocationSearch from "@/app/components/LocationSearch";
import AddTicketModal from "@/app/components/OstivitiesModal/AddTicket";
import EventTicketTable from "@/app/components/Tables/EventTicket";
import {
  Heading5,
  Label,
  Paragraph,
} from "@/app/components/typography/Typography";
import { useFormContext } from "@/app/contexts/form-context/FormContext";
import "@/app/globals.css";
import {
  AFRICAN_TIME_ZONES,
  EVENT_FREQUENCIES,
  EVENT_TYPES,
  STATES_IN_NIGERIA,
  stepOne,
} from "@/app/utils/data";
import { ACCOUNT_TYPE, EVENT_INFO, EXHIBITION_SPACE } from "@/app/utils/enums";
import { IFormInput } from "@/app/utils/interface";
import Ticket from "@/public/Ticket.svg";
import {
  DeleteOutlined,
  FacebookFilled,
  InstagramFilled,
  LinkOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  XOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Upload,
  UploadProps,
  UploadFile,
  GetProps,
  message,
} from "antd";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useProfile } from "../../../hooks/auth/auth.hook";
import { useCreateEvent } from "../../../hooks/event/event.hook";
import EmailEditor from "../../QuillEditor/EmailEditor";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;


const preset: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloud_name: any = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_api: any = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const discovery_url: any = process.env.NEXT_PUBLIC_EVENT_DISCOVERY_URL;
const event_supporting_docs: any = process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_SUPPORTING_DOCS;


function Details(): JSX.Element {
  const router = useRouter();
  const [formStep, setFormStep] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { profile } = useProfile();
  const { createEvent } = useCreateEvent();
  const [cookies, setCookie] = useCookies([
    "event_id",
    "form_stage",
    "stage_one",
    "stage_two",
    "stage_three",
  ]);
  const [showRadio, setShowRadio] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };

  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;

  const accountType = profile?.data?.data?.data?.accountType;

  const { Option } = Select;

  const userName =
    accountType === ACCOUNT_TYPE.PERSONAL
      ? profile?.data?.data?.data?.firstName
      : profile?.data?.data?.data?.businessName || "";

  const { handleSubmit, control, setValue, watch, trigger, reset } =
    useForm<IFormInput>({
      mode: "all", // Use your preferred validation mode
    });

  const watchEventInfo = watch("eventInfo");
  // const watchExhibitionSpace = watch("exhibitionspace")
  // console.log(watchExhibitionSpace, "watchExhibitionSpace")

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day');
  };

  useEffect(() => {
    const subscription: any = watch(() => {
      return;
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // const handleUploadChange =

  const props: UploadProps = {
    name: "image",
    maxCount: 1,
    action: `${cloud_api}/${cloud_name}/auto/upload`,
    beforeUpload: (file, fileList) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", event_supporting_docs);
      formData.append("upload_preset", preset);
    },
    async customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", event_supporting_docs);
      formData.append("upload_preset", preset);
      setLoader(true);
      try {
        const response = await axios.post(
          `${cloud_api}/${cloud_name}/auto/upload`,
          formData
        );
        console.log(response, "fileupload");
        if (response.status === 201) {
          const urlString: string | any =
            response?.data?.secure_url || response?.data?.url;
          setValue("eventDocument", urlString);
        }
        setLoader(false);
      } catch (error) {
        // console.error(error);
        setLoader(false);
      }
    },
    async onChange(info) {
      setFileList(info.fileList);
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        const urlString =
          info.file.response?.secure_url || info.file.response?.url;
        setValue("eventDocument", urlString);
      } else if (info.file.status === "error") {
      }
    },
    showUploadList: false,
    fileList,
  };
  console.log(fileList);

  useEffect(() => {
    const storedFiles = localStorage.getItem("uploadedFiles");
    if (storedFiles) {
      setFileList(JSON.parse(storedFiles));
    }
  }, []);
  
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        const fileContent = e.target.result as string;
        const newFile = {
          uid: Date.now().toString(), // Generate a unique id based on timestamp
          name: file.name,
          content: fileContent,
          type: file.type,
          size: file.size,
        };
        const updatedFileList = [...fileList, newFile];
        setFileList(updatedFileList);
        localStorage.setItem("uploadedFiles", JSON.stringify(updatedFileList));
      }
    };
    reader.readAsDataURL(file);
  };
  
  
  const handleDeleteFile = (fileUid: string) => {
    const updatedFileList = fileList.filter((item) => item.uid !== fileUid);
    setFileList(updatedFileList);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFileList));
  };


  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const {
      exhibitionspace,
      twitterUrl,
      eventDocumentName,
      instagramUrl,
      facebookUrl,
      websiteUrl,
      eventDocument,
      eventURL,
      ...rest
    } = data;
    // console.log(data?.eventDocument);
    
    try {
      if(!facebookUrl?.startsWith("https://") || !instagramUrl?.startsWith("https://") || !websiteUrl?.startsWith("https://") ){
        return Modal.error({
          title: "Invalid URL",
          content: "Please ensure all Social Media URLs start with 'https://'",
        });
      }
      const response = await createEvent.mutateAsync({
        ...rest,
        supportingDocument: {
          fileName: data.eventDocumentName || "",
          fileUrl: data.eventDocument,
        },
        eventURL: `${discovery_url}${eventURL}`,
        eventDetails: editorContent,
        socials: [
          { name: "twitter", url: twitterUrl },
          { name: "facebook", url: facebookUrl },
          { name: "instagram", url: instagramUrl },
          { name: "website", url: websiteUrl },
        ],
      });

      // return console.log(response)
      if (response.status === 201) {
        setCookie("event_id", response?.data?.data?.id);
        reset();
        setCookie("form_stage", 2);
        setCookie("stage_one", "finish");
        setCookie("stage_two", "process");
        setCookie("stage_three", "wait");
        router.push(
          `/Dashboard/create-events/${response?.data?.data?.id}/event_appearance`
        );
      }
    } catch (error) {
      return error;
    }
  };

  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleSelectLocation = (address: string) => {
    setValue("address", address); // Update the form field value
    setPopoverVisible(false); // Close the popover
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const content = (
    <div style={{ padding: 10 }} ref={popoverRef}>
      <LocationSearch onSelectLocation={handleSelectLocation} />
    </div>
  );

  return (
    <Fragment>
      <AddTicketModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => setIsModalOpen(false)}
      />
      <div className="flex flex-row justify-between">
        <Space direction="vertical">
          <Heading5
            className=""
            content={
              formStep === 1
                ? `Hello, ${userName}`
                : formStep === 2
                ? "Event Page Appearance"
                : "Event Ticket"
            }
          />
          <Paragraph
            className="text-OWANBE_PRY text-md font-normal font-BricolageGrotesqueMedium"
            content={
              formStep === 1
                ? "Welcome! Ready to create your next event?"
                : formStep === 2
                ? "Upload your event image here by clicking the camera icon (File size should not be more than 10MB)."
                : "For free events, Ostivities is free. For paid events, we charge a percentage-based transaction fee on ticket sales."
            }
            styles={{ fontWeight: "normal !important" }}
          />
        </Space>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-16 pb-5"
      >
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
            <div
              className="mb-9 pb-16 w-full"
              style={{ marginBottom: "20px", marginTop: "10px" }}
            >
              <EmailEditor
                initialValue="<p>Enter event details!</p>"
                onChange={handleEditorChange}
              />
            </div>

            <Controller
              name="vendor_registration"
              control={control}
              render={({ field }) => (
                <Form.Item style={{ marginBottom: "1px" }}>
                  <Space align="center">
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    >
                      <span
                        style={{
                          fontFamily: "Bricolage Grotesque Light",
                        }}
                      >
                        Vendors registration{" "}
                        <span className="optional-text">
                          (allows users to register as vendors for your event){" "}
                          <a
                            href="https://ostivities.tawk.help/article/how-vendor-management-works" // Replace with your actual URL
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginLeft: "8px" }}
                          >
                            <QuestionCircleOutlined
                              style={{
                                fontSize: "16px",
                                color: "#858990",
                              }}
                            />
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
                  <span style={{ fontFamily: "Bricolage Grotesque Light" }}>
                    Exhibition Space Booking{" "}
                    <span className="optional-text">
                      (allows vendors to book exhibition space at your event)
                    </span>{" "}
                    <a
                      href="https://ostivities.tawk.help/article/how-exhibition-space-booking-works" // Replace with your actual URL
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: "8px" }}
                    >
                      <QuestionCircleOutlined
                        style={{ fontSize: "16px", color: "#858990" }}
                      />
                    </a>
                  </span>
                </Checkbox>
              )}
            />

            {showRadio && (
              <Controller
                name="exhibition_space_booking"
                control={control}
                render={({ field }) => (
                  <Radio.Group
                    {...field}
                    onChange={(e) => field.onChange(e.target.value as string)} // Ensure value is string
                    value={field.value}
                  >
                    <Radio value={EXHIBITION_SPACE.PAID}>Paid Space</Radio>
                    <Radio value={EXHIBITION_SPACE.FREE}>Free Space</Radio>
                  </Radio.Group>
                )}
              />
            )}

            {showRadio && watch("exhibition_space_booking") === EXHIBITION_SPACE.PAID && (
              <Space direction="horizontal" size="large">
                <Form.Item
                  label={
                    <span style={{ fontFamily: "Bricolage Grotesque Light" }}>
                      Space Available
                    </span>
                  }
                >
                  <Controller
                    name="space_available"
                    control={control}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        placeholder="Enter number of spaces"
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span style={{ fontFamily: "Bricolage Grotesque Light" }}>
                      Space Fee
                    </span>
                  }
                >
                  <Controller
                    name="space_fee"
                    control={control}
                    render={({ field }) => (
                      <InputNumber
                        {...field}
                        placeholder="Enter space fee"
                        style={{ width: "80%" }}
                        min={0}
                        formatter={(value) =>
                          `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) =>
                          value?.replace(/\₦\s?|(,*)/g, "") as any
                        }
                      />
                    )}
                  />
                </Form.Item>
              </Space>
            )}

            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Space
                  direction="vertical"
                  size={"small"}
                  className="w-full"
                  style={{ marginTop: "16px" }} // Adjust the value as needed
                >
                  <Label content="Event State" className="" htmlFor="state" />
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
              name="address"
              control={control}
              render={({ field }) => (
                <Space
                  direction="vertical"
                  size={"small"}
                  style={{ width: "100%" }}
                >
                  <label htmlFor="address">Event Address</label>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Input
                      {...field}
                      placeholder="Enter Address"
                      style={{
                        flex: 1,
                        minWidth: "200px",
                        maxWidth: "calc(100% - 128px)",
                      }}
                    />
                    <Popover
                      content={content}
                      title="Search for a Location"
                      trigger="click"
                      open={popoverVisible}
                    >
                      <Button
                        type="default"
                        style={{ borderRadius: "5px", minWidth: "120px" }}
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
              name="eventURL"
              control={control}
              render={({ field }) => (
                <Space direction="vertical" size="small">
                  <Label content="Event URL" className="" htmlFor="eventURL" />

                  <Space.Compact className="w-full">
                    <Input
                      style={{
                        width: "48%",
                        borderTopRightRadius: "0px !important",
                        borderBottomRightRadius: "0px !important",
                        color: "#000000",
                      }}
                      defaultValue={discovery_url}
                      value={discovery_url}
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
                name="eventDocument"
                control={control}
                render={({ field }) => (
                  <Space direction="vertical" size="small">
                    <Label
                      content={
                        <span>
                          Upload Supporting Doc{" "}
                          <span className="optional-text">(optional)</span>
                        </span>
                      }
                      htmlFor="supportingDocument"
                    />

<Space.Compact className="w-full h-8">
                      <Input
                        name="eventDocumentName"
                        style={{
                          width: "75%",
                          borderTopRightRadius: "0px !important",
                          borderBottomRightRadius: "0px !important",
                        }}
                        placeholder="Enter file name (optional)"
                      />
                      <Upload className="upload-button" {...props}
                      beforeUpload={(file) => {
                        handleFileUpload(file);
                        return false; // Prevent automatic upload
                      }}>
                        <Button
                          icon={<UploadOutlined />}
                          className="custom-upload-button"
                          loading={loader}
                        >
                          Click to Upload
                        </Button>
                      </Upload>
                    </Space.Compact>
                    <span className="font-BricolageGrotesqueLight text-OWANBE_PRY text-xs font-light">
                      *Supporting doc can be Wedding Card, Birthday Card among
                      many others. *Only JPEG, PNG & PDF Allowed and file size
                      should not be more than 10MB.
                    </span>
                    {fileList.length > 0 && (
                      <div className="font-BricolageGrotesqueLight text-xs text-gray-400">
                        Uploaded Files: {" "}
                        <Space>
                          {fileList.map((file) => (
                            <Space key={file.uid}>
                              <span>{file.name}</span>
                              <DeleteOutlined
                                style={{
                                  color: "#e20000",
                                  cursor: "pointer",
                                  marginLeft: "8px",
                                }}
                                onClick={() => handleDeleteFile(file.uid)}
                              />
                            </Space>
                          ))}
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
                  <Space direction="vertical" size={"small"} className="w-full">
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
                <Space direction="vertical" size={"small"} className="w-full">
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
                <Space direction="horizontal" size="large" className="w-full">
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: "16px",
                    }}
                  >
                    {/* Start Date & Time */}
                    <div style={{ flex: "1 1 auto", minWidth: "150px" }}>
                      <Label content="Start Date & Time" htmlFor="startDate" />
                      <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: "100%", height: "33px" }}
                            disabledDate={disabledDate}
                          />
                        )}
                      />
                    </div>

                    {/* End Date & Time */}
                    <div style={{ flex: "1 1 auto", minWidth: "150px" }}>
                      <Label content="End Date & Time" htmlFor="endDate" />
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            style={{ width: "100%", height: "33px" }}
                            disabledDate={disabledDate}
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
                <Space direction="horizontal" size="large" className="w-full">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "16px" }}>
                      {/* Time Zone */}
                      <div style={{ flex: "1 1 300px", minWidth: "150px" }}>
                        <Label content="Time Zone" htmlFor="timeZone" />
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
                      <div style={{ flex: "1 1 300px", minWidth: "150px" }}>
                        <Label content="Frequency" htmlFor="frequency" />
                        <Controller
                          name="frequency"
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

                    <div style={{ display: "flex", gap: "16px" }}>
                      {/* Start Date & Time */}
                      <div style={{ flex: "1 1 353px", minWidth: "150px" }}>
                        <Label
                          content="Start Date & Time"
                          htmlFor="startDate"
                        />
                        <Controller
                          name="startDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              showTime
                              format="YYYY-MM-DD HH:mm:ss"
                              style={{ width: "100%", height: "33px" }}
                              disabledDate={disabledDate}
                            />
                          )}
                        />
                      </div>

                      {/* End Date & Time */}
                      <div style={{ flex: "1 1 353px", minWidth: "150px" }}>
                        <Label content="End Date & Time" htmlFor="endDate" />
                        <Controller
                          name="endDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              showTime
                              format="YYYY-MM-DD HH:mm:ss"
                              style={{ width: "100%", height: "33px" }}
                              disabledDate={disabledDate}
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
                  </Row>
                </Space>
              </>
            )}
          </div>
        </div>

        <Space className="flex flex-row justify-center space-x-4">
          <Button
            type="default"
            size={"large"}
            className="font-BricolageGrotesqueSemiBold  continue cursor-pointer font-bold equal-width-button"
            onClick={() => router.push("/Dashboard")}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
            // onClick={nextStep}
            loading={createEvent.isPending}
          >
            {createEvent.isPending ? "Please wait..." : " Save & Continue"}
          </Button>
        </Space>
      </form>
    </Fragment>
  );
}

export default Details;
