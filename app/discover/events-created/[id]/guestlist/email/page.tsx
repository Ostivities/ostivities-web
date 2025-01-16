"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import EmailEditor from "@/app/components/QuillEditor/EmailEditor";
import { Heading5 } from "@/app/components/typography/Typography";
import {
  Button,
  Form,
  Input,
  message,
  Select,
  Space,
  Upload,
  UploadProps,
  UploadFile,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AsyncSelect from "react-select/async";
import React, { useEffect, useState } from "react";
import PreviewEmail from "@/app/components/OstivitiesModal/GuestMailPreviewModal";
import { useCookies } from "react-cookie";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";
import {
  useGetEventGuests,
  useGetTicketGuests,
  useGetGuestInfo,
} from "@/app/hooks/guest/guest.hook";
import { useGetUserEvent, useUpdateEvent } from "@/app/hooks/event/event.hook";
import { useSendBulkEmail } from "@/app/hooks/bulkemail/bulkemail.hook";
import { useParams } from "next/navigation";
import axios from "axios";
import { IGuestData, ITicketDetails } from "@/app/utils/interface";

const preset: any = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
const cloud_name: any = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloud_api: any = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;
const discovery_url: any = process.env.NEXT_PUBLIC_EVENT_DISCOVERY_URL;
const event_email_attachment_image: any =
  process.env.NEXT_PUBLIC_OSTIVITIES_EVENT_EMAIL_ATTACHMENT_IMAGE;

const EventsGuestListEmail = () => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState<string>("");
  const [recipientType, setRecipientType] = useState<string>("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loader, setLoader] = useState(false);
  const [editorError, setEditorError] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState<string>("");
  const [emailAttachment, setEmailAttachment] = useState<
    { name: string; content: string; url: string }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [guestName, setGuestName] = useState<string>("Guest Name");
  const [eventName, setEventName] = useState<string>("Awesome Event");
  const [cookies, setCookie, removeCookie] = useCookies(["event_id"]);
  const { updateEvent } = useUpdateEvent();
  const { sendBulkEmail } = useSendBulkEmail();
  const params = useParams<{ id: string }>();
  const { getTickets } = useGetEventTickets(params?.id);
  const { getTicketGuests } = useGetTicketGuests(selectedTicket);
  const { getEventGuests } = useGetEventGuests(params?.id, 1, 10, searchText);
  const { getUserEvent } = useGetUserEvent(params?.id);
  const [recipientsDataTicket, setRecipientsDataTicket] = useState<
    {
      name: string;
      email: string;
    }[]
  >([]);
  const ticketData = getTickets?.data?.data?.data;
  const eventDetails = getUserEvent?.data?.data?.data;
  // const { getGuestInfo } = useGetGuestInfo(eventDetails?.unique_key, )
  const ticketGuests = getTicketGuests?.data?.data?.data;
  const allGuestsData = getEventGuests?.data?.data?.data?.guests;
  const totalGuests = getEventGuests?.data?.data?.data?.total;
  const senderEmail = Form.useWatch("sender_email", form);
  const recipientsApplicableForm = Form.useWatch("recipientsApplicable", form);
  const rep = Form.useWatch("recipients", form);
  //

  //
  // Update eventName when eventDetails is available
  useEffect(() => {
    if (eventDetails && eventDetails?.eventName) {
      setEventName(eventDetails?.eventName);
    }
  }, [eventDetails]);

  useEffect(() => {
    if (senderEmail) {
      form.setFieldsValue({
        reply_to: senderEmail,
      });
    }
  }, [senderEmail]);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const props: UploadProps = {
    name: "image",
    maxCount: 1,
    action: `${cloud_api}/${cloud_name}/auto/upload`,
    beforeUpload: (file, fileList) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", event_email_attachment_image);
      formData.append("upload_preset", preset);
    },
    async customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", event_email_attachment_image);
      formData.append("upload_preset", preset);
      setLoader(true);
      try {
        const response = await axios.post(
          `${cloud_api}/${cloud_name}/auto/upload`,
          formData
        );
        //
        if (response.status === 200) {
          const name = response?.data?.display_name;
          const content = response?.data?.resource_type;
          const urlString: string | any =
            response?.data?.secure_url || response?.data?.url;
          // setValue("eventDocument", urlString);
          setAttachmentUrl(urlString);
          setEmailAttachment([
            ...emailAttachment,
            { name, content, url: urlString },
          ]);
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
        // setValue("eventDocument", urlString);
      } else if (info.file.status === "error") {
      }
    },
    showUploadList: true,
    fileList,
  };

  const fetchOptions = async (inputValue: string) => {
    // Filter or fetch options based on inputValue
    const filteredGuests = allGuestsData
      ?.filter((guest: IGuestData) =>
        guest?.personal_information?.firstName
          .toLowerCase()
          .startsWith(inputValue.toLowerCase())
      )
      .map((guest: IGuestData) => ({
        value: guest?.id,
        label: guest?.personal_information?.firstName,
      }));
    return filteredGuests;
  };

  const handleSelectChange = (selectedOptions: any) => {
    // Extract the selected values
    const selectedValues = selectedOptions?.map(
      (option: { value: string }) => option.value
    );
    const selected = allGuestsData
      ?.filter((guest: any) => selectedValues?.includes(guest?.id))
      ?.map((guest: IGuestData) => {
        return {
          name: `${guest?.personal_information?.firstName}`,
          email: guest?.personal_information?.email,
        };
      });
    setRecipientsDataTicket(selected);
  };

  const onFinish = async (values: any) => {
    if (recipientsApplicableForm === "ticket") {
      const { attachments, recipientsApplicable, recipients, ...rest } =
        values;
      const recipientsTicketData =
        ticketGuests &&
        ticketGuests?.map((guest: IGuestData) => {
          return {
            name: `${guest?.personal_information?.firstName}`,
            email: guest?.personal_information?.email,
          };
        });
      if (editorContent === "" || editorContent === "<p><br></p>") {
        setEditorError("Please provide event details!"); // Set error state
        return; // Prevent form submission if no content
      } else {
        setEditorError(""); // Clear error if content is valid
      }

      const response = await sendBulkEmail.mutateAsync({
        ...rest,
        email_attachment: emailAttachment,
        message: editorContent,
        recipients: recipientsTicketData,
        event_id: params?.id,
        sender_name: eventDetails?.user?.firstName,
      });

      if (response.status === 200) {
        form.resetFields();
        //
      }

      //
    } else if (recipientsApplicableForm === "selected") {
      const { attachments, recipientsApplicable, recipients, ...rest } =
        values;

      if (editorContent === "" || editorContent === "<p><br></p>") {
        setEditorError("Please provide event details!"); // Set error state
        return; // Prevent form submission if no content
      } else {
        setEditorError(""); // Clear error if content is valid
      }

      const response = await sendBulkEmail.mutateAsync({
        ...rest,
        email_attachment: emailAttachment,
        message: editorContent,
        recipients: recipientsDataTicket,
        event_id: params?.id,
        sender_name: eventDetails?.user?.firstName,
      });

      if (response.status === 200) {
        form.resetFields();
        //
      }
    } else {
      const { attachments, recipientsApplicable, ...rest } = values;
      if (editorContent === "" || editorContent === "<p><br></p>") {
        setEditorError("Please provide event details!"); // Set error state
        return; // Prevent form submission if no content
      } else {
        setEditorError(""); // Clear error if content is valid
      }

      const response = await sendBulkEmail.mutateAsync({
        ...rest,
        email_attachment: emailAttachment,
        message: editorContent,
        event_id: params?.id,
        sender_name: eventDetails?.user?.firstName,
      });

      if (response.status === 200) {
        form.resetFields();
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo;
  };

  const handleRecipientTypeChange = (value: string) => {
    setRecipientType(value);
    setSelectedTickets([]); // Reset selections when recipient type changes
    setSelectedAttendees([]);
  };

  const handleTicketTypeChange = (value: string) => {
    setSelectedTicket(value);
  };

  const handleAttendeeSearch = (value: string) => {
    setSearchText(value);
  };

  const handleFileChange = ({
    fileList: newFileList,
  }: {
    fileList: UploadFile[];
  }) => {
    setFileList(newFileList);
    const lastFile = newFileList[newFileList.length - 1];
    if (lastFile && lastFile.status === "done") {
      message.success("File uploaded successfully!", 2);
    }
    if (newFileList.length < fileList.length) {
      message.success("File removed successfully.", 2);
    }
  };

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"large"}>
        <Space direction="horizontal" align="start">
          <Heading5 content={"Email Guestlist"} />
        </Space>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col space-y-6 w-full pb-4 mb-6"
          form={form}
        >
          <div className="grid grid-cols-2 gap-x-12">
            {/* <Form.Item
              label="Sender Name"
              name="sender_name"
              rules={[
                { required: true, message: "Please input your sender name!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter sender name" />
            </Form.Item> */}

            <Form.Item
              label="Sender Email"
              name="sender_email"
              rules={[
                { required: true, message: "Please input your reply email!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter reply email" />
            </Form.Item>

            <Form.Item
              label="Email Subject"
              name="subject"
              rules={[
                { required: true, message: "Please input email subject!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter email subject" />
            </Form.Item>

            <Form.Item
              label="Reply To"
              name="reply_to"
              rules={[
                { required: true, message: "Please input your reply email!" },
              ]}
              style={{ display: "none" }}
            >
              <Input
                style={{ display: "hidden" }}
                value={senderEmail}
                placeholder="Enter reply email"
              />
            </Form.Item>

            <Form.Item
              label="Recipients"
              name="recipientsApplicable"
              rules={[
                { required: true, message: "Please select recipient type!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Select
                placeholder="Select recipient type"
                onChange={handleRecipientTypeChange}
              >
                <Select.Option value="all">All attendees</Select.Option>
                <Select.Option value="ticket">
                  Guestlist by ticket
                </Select.Option>
                <Select.Option value="selected">
                  Selected attendees
                </Select.Option>
              </Select>
            </Form.Item>

            {recipientType === "all" && (
              <Form.Item
                label="Guest Name"
                name="recipients"
                style={{ display: "none" }}
                initialValue={allGuestsData?.map((guest: IGuestData) => {
                  return {
                    name: `${guest?.personal_information?.firstName}`,
                    email: guest?.personal_information?.email,
                  };
                })}
              >
                <Select
                  mode="multiple"
                  placeholder="Select guest name"
                  value={allGuestsData?.map((guest: IGuestData) => {
                    return {
                      name: `${guest?.personal_information?.firstName}`,
                      email: guest?.personal_information?.email,
                    };
                  })}
                >
                  {allGuestsData?.map((guest: IGuestData) => (
                    <Select.Option key={guest?.id} value={guest?.guestName}>
                      {guest?.personal_information?.firstName}{" "}
                      {guest?.personal_information?.lastName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            {recipientType === "ticket" && (
              <Form.Item
                label="Select Tickets"
                name="recipients"
                style={{ marginBottom: "8px" }}
              >
                <Select
                  // mode="multiple"
                  placeholder="Select tickets"
                  onChange={handleTicketTypeChange}
                >
                  {ticketData?.map((ticket: ITicketDetails) => (
                    <Select.Option key={ticket?.id} value={ticket?.id}>
                      {ticket?.ticketName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            {recipientType === "selected" && (
              <Form.Item
                label="Select Attendees"
                name="recipients"
                style={{ marginBottom: "8px" }}
              >
                <AsyncSelect
                  cacheOptions
                  loadOptions={fetchOptions}
                  defaultOptions={allGuestsData?.map((guest: IGuestData) => ({
                    value: guest.id,
                    label: `${guest?.personal_information?.firstName} ${guest?.personal_information?.lastName}` ,
                  }))}
                  isMulti
                  placeholder="Select tickets"
                  isClearable
                  onChange={handleSelectChange}
                />
              </Form.Item>
            )}

            <Form.Item
              label="Attachments"
              name="attachments"
              style={{ marginBottom: "8px" }}
            >
              <Upload
                {...props}
                // fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={(file) => {
                  handleFileUpload(file);
                }}
                itemRender={(originNode) => (
                  <div
                    className="ant-upload-list-item"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {originNode}
                  </div>
                )}
              >
                <Button
                  disabled={loader}
                  loading={loader}
                  icon={<UploadOutlined />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="mb-3 pb-12 w-full">
            <EmailEditor initialValue="<p></p>" onChange={handleEditorChange} />
          </div>
          <div className="text-base md:text-lg" style={{ color: "red" }}>
            {editorError}
          </div>
          <br />
          <div className="flex flex-row justify-center space-x-4 mt-8">
            <Button
              type="default"
              size={"large"}
              htmlType="button"
              className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold equal-width-button"
              onClick={showModal} // Open modal on click
            >
              Preview
            </Button>
            <Button
              type="primary"
              size={"large"}
              loading={sendBulkEmail?.isPending}
              htmlType="submit"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              // onClick={() => message.success("Email sent successfully")}
            >
              Send Email
            </Button>
          </div>
        </Form>

        {/* Modal Component */}
        {isModalOpen && (
          <PreviewEmail
            open={isModalOpen}
            onCancel={handleCancel}
            onClose={handleCancel}
            onOk={handleCancel}
            messageContent={editorContent} // Pass the email content from the editor
            guestName={guestName} // Pass the guest name
            eventName={eventName} // Pass the event name
            hostEmail={eventDetails?.user?.email}
          />
        )}
      </Space>
    </EventDetailsComponent>
  );
};

export default EventsGuestListEmail;
