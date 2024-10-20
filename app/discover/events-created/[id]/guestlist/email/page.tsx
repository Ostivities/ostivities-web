"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import EmailEditor from "@/app/components/QuillEditor/EmailEditor";
import { Heading5 } from "@/app/components/typography/Typography";
import { Button, Form, Input, message, Select, Space, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import PreviewEmail from "@/app/components/OstivitiesModal/GuestMailPreviewModal";
import { useCookies } from "react-cookie";
import { useGetUserEvent, useUpdateEvent } from "@/app/hooks/event/event.hook";
import { useParams } from "next/navigation";

const EventsGuestListEmail = () => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState<string>("Your dynamic message here");
  const [recipientType, setRecipientType] = useState<string>("all");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [guestName, setGuestName] = useState<string>("Guest Name");
  const [eventName, setEventName] = useState<string>("Awesome Event");
  const [cookies, setCookie, removeCookie] = useCookies(["event_id"]);
  const { updateEvent } = useUpdateEvent();
  const params = useParams<{ id: string }>();
  const { getUserEvent } = useGetUserEvent(params?.id);
  console.log(getUserEvent, "getUserEvent");
  const eventDetails = getUserEvent?.data?.data?.data;

  // Update eventName when eventDetails is available
  useEffect(() => {
    if (eventDetails && eventDetails.eventName) {
      setEventName(eventDetails.eventName);
    }
  }, [eventDetails]);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const onFinish = (values: any) => {
    return values;
  };

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo;
  };

  const handleRecipientTypeChange = (value: string) => {
    setRecipientType(value);
    setSelectedTickets([]); // Reset selections when recipient type changes
    setSelectedAttendees([]);
  };

  const handleTicketTypeChange = (value: string[]) => {
    setSelectedTickets(value);
  };

  const handleAttendeeSearch = (value: string) => {
    // Simulate fetching attendees based on search value
  };

  const handleSelectAttendee = (value: string) => {
    setSelectedAttendees([...selectedAttendees, value]);
  };

  const handleFileChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
    const lastFile = newFileList[newFileList.length - 1];
    if (lastFile && lastFile.status === "done") {
      message.success("File uploaded successfully!", 2);
    }
    if (newFileList.length < fileList.length) {
      message.success("File removed successfully.", 2);
    }
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
            <Form.Item
              label="Sender Name"
              name="senderName"
              rules={[{ required: true, message: "Please input your sender name!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter sender name" />
            </Form.Item>

            <Form.Item
              label="Reply To"
              name="replyTo"
              rules={[{ required: true, message: "Please input your reply email!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter reply email" />
            </Form.Item>

            <Form.Item
              label="Recipients"
              name="recipients"
              rules={[{ required: true, message: "Please select recipient type!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Select placeholder="Select recipient type" onChange={handleRecipientTypeChange}>
                <Select.Option value="all">All attendees</Select.Option>
                <Select.Option value="ticket">Guestlist by ticket</Select.Option>
                <Select.Option value="selected">Selected attendees</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Email Subject"
              name="subject"
              rules={[{ required: true, message: "Please input email subject!" }]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter email subject" />
            </Form.Item>
          </div>

          {recipientType === "ticket" && (
            <Form.Item label="Select Tickets" name="selectedTickets" style={{ marginBottom: "8px" }}>
              <Select mode="multiple" placeholder="Select tickets" onChange={handleTicketTypeChange}>
                <Select.Option value="ticketType1">Ticket Type 1</Select.Option>
                <Select.Option value="ticketType2">Ticket Type 2</Select.Option>
                <Select.Option value="ticketType3">Ticket Type 3</Select.Option>
              </Select>
            </Form.Item>
          )}

          {recipientType === "selected" && (
            <Form.Item label="Select Attendees" name="selectedAttendees" style={{ marginBottom: "8px" }}>
              <Input.Search
                placeholder="Search and select attendees"
                onSearch={handleAttendeeSearch}
                enterButton
                allowClear
                style={{ width: "100%" }}
              />
              <Space direction="vertical" style={{ marginTop: "8px" }}>
                {selectedAttendees.map((attendee) => (
                  <Space key={attendee}>
                    {attendee}
                    <Button
                      type="text"
                      size="small"
                      onClick={() =>
                        setSelectedAttendees(selectedAttendees.filter((item) => item !== attendee))
                      }
                    >
                      Remove
                    </Button>
                  </Space>
                ))}
              </Space>
            </Form.Item>
          )}

          <Form.Item label="Attachments" name="attachments" style={{ marginBottom: "8px" }}>
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
              itemRender={(originNode) => (
                <div className="ant-upload-list-item" style={{ display: 'flex', alignItems: 'center' }}>
                  {originNode}
                </div>
              )}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <div className="mb-4 pb-12 w-full">
            <EmailEditor initialValue="<p>Write your email here!</p>" onChange={handleEditorChange} />
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
              htmlType="button"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              onClick={() => message.success('Guestlist email has been initiated successfully')}
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
          />
        )}
      </Space>
    </EventDetailsComponent>
  );
};

export default EventsGuestListEmail
