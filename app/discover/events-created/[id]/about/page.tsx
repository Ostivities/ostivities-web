"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import LocationSearch from "@/app/components/LocationSearch";
import EmailEditor from "@/app/components/QuillEditor/EmailEditor";
import {
  Heading5,
  Label,
  Paragraph,
} from "@/app/components/typography/Typography";
import useComponentDisabled from "@/app/hooks/utils/utils.hooks";
import {
  AFRICAN_TIME_ZONES,
  EVENT_FREQUENCIES,
  EVENT_TYPES,
  STATES_IN_NIGERIA,
} from "@/app/utils/data";
import { EVENT_INFO, EXHIBITION_SPACE, ACCOUNT_TYPE } from "@/app/utils/enums";
import { IFormInput } from "@/app/utils/interface";
import { useProfile } from "@/app/hooks/auth/auth.hook";
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
  Modal,
  Select,
  UploadProps,
  Space,
  Upload,
  UploadFile,
} from "antd";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useGetUserEvent, useUpdateEvent } from "@/app/hooks/event/event.hook";
import { getUsernameFromUrl } from "@/app/utils/helper";
import dayjs from "dayjs";
import axios from "axios";
import useFetch from "@/app/components/forms/create-events/auth";
import { RangePickerProps } from "antd/es/date-picker";

interface FieldType {}

const preset: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloud_name: any = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_api: any = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const discovery_url: any = process.env.NEXT_PUBLIC_EVENT_DISCOVERY_URL;
const event_supporting_docs: any =
  process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_SUPPORTING_DOCS;

const AboutEvent = () => {
  const { isLoggedIn, loading } = useFetch();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Wait for loading to complete
      if (!isLoggedIn) {
        router.push("/login"); // Only redirect after loading completes
      }
    }
  }, [isLoggedIn, loading, router]);

  const params = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const { Option } = Select;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [eventUrl, setEventUrl] = useState("");
  const { getUserEvent } = useGetUserEvent(params?.id);
  const [showRadio, setShowRadio] = useState(false);
  const { updateEvent } = useUpdateEvent();
  const { profile } = useProfile();
  const [editorContent, setEditorContent] = useState("");
  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };
  const eventDetails = getUserEvent?.data?.data?.data;
  // console.log(eventDetails);
  const [vendorRegRadio, setVendorRegRadio] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    trigger,
    reset,
    getValues,
  } = useForm<IFormInput>({
    mode: "all",
  });

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
        if (response.status === 200) {
          const urlString: string | any =
            response?.data?.secure_url || response?.data?.url;
          setValue("eventDocument", urlString);
        }
        setLoader(false);
      } catch (error) {
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

  const handleDeleteFile = (fileUid: string) => {
    const updatedFileList = fileList.filter((item) => item.uid !== fileUid);
    setFileList(updatedFileList);
  };

  const watchEventInfo = watch("eventInfo");

  useEffect(() => {
    const subscription: any = watch(() => {
      return;
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const socialLinks = eventDetails?.socials;
    const twitterLink = socialLinks?.find(
      (link: any) => link?.name.toLowerCase() === "twitter"
    );
    const instagramLink = socialLinks?.find(
      (link: any) => link?.name.toLowerCase() === "instagram"
    );
    const websiteLink = socialLinks?.find(
      (link: any) => link?.name.toLowerCase() === "website"
    );
    const facebookLink = socialLinks?.find(
      (link: any) => link?.name.toLowerCase() === "facebook"
    );
    if (eventDetails) {
      setValue("eventName", eventDetails?.eventName);
      setValue("state", eventDetails?.state);
      setValue("address", eventDetails?.address);
      setValue(
        "eventURL",
        getUsernameFromUrl(eventDetails?.eventURL)
          .toLocaleLowerCase()
          .replace(/_/g, " ").replace(/\d+$/, "") 
      );
      setValue("eventDocumentName", eventDetails?.supportingDocument?.fileName);
      setValue("eventType", eventDetails?.eventType);
      setValue("eventInfo", eventDetails?.eventInfo);
      setValue("timeZone", eventDetails?.timeZone);
      setValue("websiteUrl", websiteLink?.url);
      setValue("twitterUrl", twitterLink?.url);
      setValue("facebookUrl", facebookLink?.url);
      setValue("instagramUrl", instagramLink?.url);
      setVendorRegRadio(eventDetails?.vendor_registration);
      setValue("vendor_registration", eventDetails?.vendor_registration);
      setValue("startDate", dayjs(eventDetails?.startDate));
      setValue("endDate", dayjs(eventDetails?.endDate));
      setValue("frequency", eventDetails?.frequency);
    }
  }, [eventDetails, setValue]);

  useEffect(() => {
    if (eventDetails?.exhibition_space_booking) {
      setTimeout(() => {
        setShowRadio(true);
        setValue(
          "exhibition_space_booking",
          eventDetails?.exhibition_space_booking
        );
        setValue("space_available", eventDetails?.space_available);
        setValue("space_fee", eventDetails?.space_fee);
      }, 1000);
    }
  }, [eventDetails, setValue]);

  useEffect(() => {
    if (eventDetails) {
      setEditorContent(eventDetails?.eventDetails);
    }
  }, [eventDetails]);

  useEffect(() => {
    if (vendorRegRadio === false) {
      setShowRadio(false);
    }
  }, [vendorRegRadio]);

  const onSubmit: FormProps<IFormInput>["onFinish"] = async (data) => {
    // return console.log(data, "data");

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
    try {
      if (data.vendor_registration === false) {
        data.exhibitionspace = false;
        rest.exhibition_space_booking = EXHIBITION_SPACE.FREE;
        rest.space_available = 0;
        rest.space_fee = 0;
      }

      if (exhibitionspace === false) {
        rest.exhibition_space_booking = EXHIBITION_SPACE.FREE;
        rest.space_available = 0;
        rest.space_fee = 0;
      }

      if (
        (facebookUrl && !facebookUrl.startsWith("https://")) ||
        (instagramUrl && !instagramUrl.startsWith("https://")) ||
        (websiteUrl && !websiteUrl.startsWith("https://")) ||
        (twitterUrl && !twitterUrl.startsWith("https://"))
      ) {
        return Modal.error({
          title: "Invalid URL",
          content: "Please ensure all Social Media URLs start with 'https://'",
        });
      }

      const socials = [
        { name: "twitter", url: twitterUrl },
        { name: "facebook", url: facebookUrl },
        { name: "instagram", url: instagramUrl },
        { name: "website", url: websiteUrl },
      ].filter((social) => social.url);

      console.log(rest, "rest")
      const response = await updateEvent.mutateAsync({
        id: params?.id,
        ...rest,
        supportingDocument: {
          fileName: data.eventDocumentName || "",
          fileUrl: data.eventDocument,
        },
        eventDetails: editorContent,
        socials,
      });

      if (response.status === 200) {
        // reset();
        getUserEvent.refetch();
        // setLoader(false)
        setComponentDisabled(true);
      }
    } catch (error) {
      // setLoader(false)
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

  // useEffect(() => {
  //   if (eventUrl) {
  //     setValue("eventURL", eventUrl.toLocaleLowerCase().replace(/_/g, " ")); // Manually set eventURL field
  //   }
  // }, [eventUrl, setValue]);

  const content = (
    <div style={{ padding: 10 }} ref={popoverRef}>
      <LocationSearch onSelectLocation={handleSelectLocation} />
    </div>
  );

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf("day");
  };

  const accountType = profile?.data?.data?.data?.accountType;
  const userName =
  accountType === ACCOUNT_TYPE.PERSONAL
    ? profile?.data?.data?.data?.firstName
    : profile?.data?.data?.data?.businessName || "";

    const getGreeting = () => {
      const currentHour = new Date().getHours();
      let greeting;
      let icon;
    
      if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good Morning";
        icon = "☀️"; // Sun icon
      } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good Afternoon";
        icon = "🌞"; // Sun with face icon for afternoon
      } else {
        greeting = "Good Evening";
        icon = "🌜"; // Moon icon
      }
    
      return { greeting, icon };
    };
    
    // Call getGreeting to retrieve greeting and icon values
    const { greeting, icon } = getGreeting();
  
  return (
    <EventDetailsComponent>
      <form
        name="basic"
        autoComplete="off"
        className="flex flex-col space-y-8 pb-5"
      >
        <Space direction="vertical" size={"small"} style={{ width: "100%" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
          >
        <Heading5 className="" content={`${greeting} ${icon}, ${userName}`} /> 
        </div>
          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular mb-2"
            content={"Manage your event seamlessly from here."}
            styles={{ fontWeight: "normal !important" }}
          />
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
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    disabled={componentDisabled}
                    placeholder="Enter Event Name"
                  />
                </Space>
              )}
            />

            <Paragraph
              className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
              content={"Event Details"}
              styles={{ fontWeight: "bold !important" }} 
            />
            <div style={{  marginBottom: "35px", marginTop: "10px", position: "relative" }}>
              {componentDisabled && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255,255,255,0.5)",
                    zIndex: 10,
                    cursor: "not-allowed",
                  }}
                />
              )}
              {getUserEvent.isSuccess === true && (
                <EmailEditor
                  initialValue={`${eventDetails?.eventDetails}`}
                  onChange={handleEditorChange}
                />
              )}
            </div>

            {/* <Controller
              name="vendor_registration"
              control={control}
              render={({ field }) => (
                <Form.Item style={{ marginBottom: "1px" }}>
                  <Space align="center">
                    <Checkbox
                      {...field}
                      disabled={componentDisabled}
                      checked={vendorRegRadio}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setVendorRegRadio(e.target.checked);
                      }}
                    >
                      <span style={{ fontFamily: "Bricolage Grotesque Light" }}>
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
                              style={{ fontSize: "16px", color: "#858990" }}
                            />
                          </a>
                        </span>
                      </span>
                    </Checkbox>
                  </Space>
                </Form.Item>
              )}
            />

            {vendorRegRadio && (
              <Controller
                name="exhibitionspace"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    disabled={componentDisabled}
                    checked={showRadio} // Ensure exhibitionspace is boolean
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
            )}

            {vendorRegRadio && showRadio && (
              <Controller
                name="exhibition_space_booking"
                control={control}
                render={({ field }) => (
                  <Radio.Group
                    {...field}
                    disabled={componentDisabled}
                    onChange={(e) => field.onChange(e.target.value as string)} // Ensure value is string
                    value={field.value}
                  >
                    <Radio value={EXHIBITION_SPACE.PAID}>Paid Space</Radio>
                    <Radio value={EXHIBITION_SPACE.FREE}>Free Space</Radio>
                  </Radio.Group>
                )}
              />
            )}

            {vendorRegRadio && showRadio &&
              (watch("exhibition_space_booking") === EXHIBITION_SPACE.PAID ||
                watch("exhibition_space_booking") ===
                  EXHIBITION_SPACE.FREE) && (
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
                          style={{ width: "80%" }}
                          disabled={componentDisabled}
                          placeholder="Enter number of spaces"
                        />
                      )}
                    />
                  </Form.Item>

                  {watch("exhibition_space_booking") ===
                    EXHIBITION_SPACE.PAID && (
                    <Form.Item
                      label={
                        <span
                          style={{ fontFamily: "Bricolage Grotesque Light" }}
                        >
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
                            disabled={componentDisabled}
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
                  )}
                </Space>
              )} */}

            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Space
                  direction="vertical"
                  size={"small"}
                  className="w-full"
                  style={{ marginTop: "35px" }} // Adjust the value as needed
                >
                  <Label content="Event State" className="" htmlFor="state" />
                  <Select
                    disabled={componentDisabled}
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
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    <Input
                      {...field}
                      disabled={componentDisabled}
                      placeholder="Enter Address"
                      style={{
                        flex: 1,
                        minWidth: "200px",
                        maxWidth: "calc(100% - 128px)",
                      }}
                    />
                    <Popover
                      content={content}
                     
                      trigger="click"
                      open={popoverVisible}
                    >
                      <Button
                        type="default"
                        disabled={componentDisabled}
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
                      disabled={componentDisabled}
                      readOnly
                      {...field}
                      placeholder="your event url name will show here"
                      defaultValue={eventUrl}
                    />
                  </Space.Compact>
                </Space>
              )}
            />

            <Space direction="vertical" size="small">
              <Controller
                name="eventDocumentName"
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
                        // name="eventDocumentName"
                        {...field}
                        style={{
                          width: "75%",
                          borderTopRightRadius: "0px !important",
                          borderBottomRightRadius: "0px !important",
                        }}
                        disabled={componentDisabled}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="Enter file name (optional)"
                      />
                      <Upload
                        className="upload-button"
                        {...props}
                        beforeUpload={(file) => {
                          // handleFileUpload(file);
                          // return false; // Prevent automatic upload
                        }}
                      >
                        <Button
                          icon={<UploadOutlined />}
                          className="custom-upload-button"
                          loading={loader}
                          disabled={componentDisabled}
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
                        Uploaded Files:{" "}
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
                name="eventDocument"
                control={control}
                render={({ field }) => <input type="hidden" {...field} />}
              />
              <Controller
                name="eventType"
                control={control}
                rules={{ required: "Event Type is required!" }}
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
                      disabled={componentDisabled}
                    >
                      {EVENT_TYPES.map((_i) => (
                        <Option value={_i.value} key={_i.label}>
                          {_i.label}
                        </Option>
                      ))}
                    </Select>
                    {errors.eventType && (
                      <span style={{ color: "red" }}>
                        {errors.eventType.message}
                      </span>
                    )}
                  </Space>
                )}
              />
            </Space>

            {/* <Controller
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
                    disabled={componentDisabled}
                    className="w-full font-BricolageGrotesqueRegular"
                  >
                    <Radio
                      disabled={componentDisabled}
                      value={EVENT_INFO.SINGLE_EVENT}
                      className="w-1/2 font-BricolageGrotesqueRegular"
                    >
                      Single Event
                    </Radio>
                    <Radio
                      disabled={componentDisabled}
                      value={EVENT_INFO.RECURRING_EVENT}
                      className="font-BricolageGrotesqueRegular"
                    >
                      Recurring Event
                    </Radio>
                  </Radio.Group>
                </Space>
              )}
            />

            {watchEventInfo === EVENT_INFO.SINGLE_EVENT && ( */}
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
                        disabled={componentDisabled}
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
                    style={{ display: "flex", flexWrap: "nowrap", gap: "16px" }}
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
                            disabled={componentDisabled}
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
                            disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
            {/* )} */}

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
                              disabled={componentDisabled}
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
                        <Label content="Frequency" htmlFor="eventFrequency" />
                        <Controller
                          name="frequency"
                          control={control}
                          render={({ field }) => (
                            <Select
                              placeholder="Select Event Frequency"
                              {...field}
                              disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
                              disabled={componentDisabled}
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
          {componentDisabled === false ? (
            <Button
              type="default"
              htmlType="submit" // This will only trigger the submit when 'Save Changes' is clicked
              size={"large"}
              disabled={false}
              loading={updateEvent.isPending}
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-64"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
                marginTop: "25px",
              }}
              onClick={(e) => {
                e.preventDefault(); // Prevent form default submission behavior
                handleSubmit(onSubmit)();
              }}
            >
              Save Changes
            </Button>
          ) : (
            <Button
              type="default"
              htmlType="button" // No form submission, just a state change
              size={"large"}
              disabled={false}
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold w-64"
              style={{
                borderRadius: "20px",
                fontFamily: "BricolageGrotesqueMedium",
                marginTop: "25px",
              }}
              onClick={(e) => {
                e.preventDefault();
                setComponentDisabled(false);
              }}
            >
              Update
            </Button>
          )}
        </Space>
      </form>
    </EventDetailsComponent>
  );
};

export default AboutEvent;
