"use client";
import EventDetailsComponent from "@/app/components/EventDetails/EventDetails";
import EmailEditor from "@/app/components/QuillEditor/EmailEditor";
import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { Button, Form, FormProps, Input, message, Select, Space, Upload, UploadFile } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";

interface FieldType {}

const EventsGuestListEmail = () => {
  const [form] = Form.useForm();
  const [editorContent, setEditorContent] = useState("");
  const [recipientType, setRecipientType] = useState<string>("all");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    return values;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    return errorInfo;
  };

  const handleRecipientTypeChange = (value: string) => {
    setRecipientType(value);
    // Reset selections when recipient type changes
    setSelectedTickets([]);
    setSelectedAttendees([]);
  };

  const handleTicketTypeChange = (value: string[]) => {
    setSelectedTickets(value);
  };

  const handleAttendeeSearch = (value: string) => {
    // Simulate fetching attendees based on search value
    // Replace with actual fetching logic
    // For example: fetchAttendees(value).then(data => setAttendees(data));
  };

  const handleSelectAttendee = (value: string) => {
    setSelectedAttendees([...selectedAttendees, value]);
  };

  const handleFileChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);

    // Check if a file was added
    const lastFile = newFileList[newFileList.length - 1];
    if (lastFile && lastFile.status === 'done') {
      message.success('File uploaded successfully!', 2); // 2 seconds duration
    }

    // Check if a file was removed
    if (newFileList.length < fileList.length) {
      message.success('File removed successfully.', 2); // 2 seconds duration
    }
  };

  return (
    <EventDetailsComponent>
      <Space direction="vertical" size={"large"}>
        <Space direction="horizontal" align="start">
          <Heading5 className="" content={"Email Guestlist"} />
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
            <Form.Item<FieldType>
              label="Sender Name"
              name="senderName"
              rules={[
                { required: true, message: "Please input your sender name!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter sender name" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Reply To"
              name="replyTo"
              rules={[
                { required: true, message: "Please input your reply email!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter reply email" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Recipients"
              name="recipients"
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
                <Select.Option value="ticket">Guestlist by ticket</Select.Option>
                <Select.Option value="selected">Selected attendees</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item<FieldType>
              label="Email Subject"
              name="subject"
              rules={[
                { required: true, message: "Please input email subject!" },
              ]}
              style={{ marginBottom: "8px" }}
            >
              <Input placeholder="Enter email subject" />
            </Form.Item>
          </div>

          {recipientType === "ticket" && (
            <Form.Item<FieldType>
              label="Select Tickets"
              name="selectedTickets"
              style={{ marginBottom: "8px" }}
            >
              <Select
                mode="multiple"
                placeholder="Select tickets"
                onChange={handleTicketTypeChange}
              >
                {/* Replace with dynamic data */}
                <Select.Option value="ticketType1">Ticket Type 1</Select.Option>
                <Select.Option value="ticketType2">Ticket Type 2</Select.Option>
                <Select.Option value="ticketType3">Ticket Type 3</Select.Option>
              </Select>
            </Form.Item>
          )}

          {recipientType === "selected" && (
            <Form.Item<FieldType>
              label="Select Attendees"
              name="selectedAttendees"
              style={{ marginBottom: "8px" }}
            >
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
                        setSelectedAttendees(
                          selectedAttendees.filter((item) => item !== attendee)
                        )
                      }
                    >
                      Remove
                    </Button>
                  </Space>
                ))}
              </Space>
            </Form.Item>
          )}

          <Form.Item<FieldType>
            label="Attachments"
            name="attachments"
            style={{ marginBottom: "8px" }}
          >
            <Upload
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false} // Prevent automatic upload
              itemRender={(originNode) => (
                <div className="ant-upload-list-item" 
                style={{ display: 'flex', alignItems: '' }}>
                  {originNode}
                </div>
              )}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <div className="mb-4 pb-12 w-full">
            <EmailEditor
              initialValue="<p>Write your email here!</p>"
              onChange={handleEditorChange}
            />
          </div>

          <div className="pt-3 flex flex-row">
            <div className="flex flex-row items-center space-x-6 w-1/2">
              <Paragraph
                className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
                content={"Enter Email Address to send test Message"}
                styles={{ fontWeight: "normal !important" }}
              />
              <Input
                placeholder="Enter address"
                type="email"
                style={{ width: "50%" }}
              />
            </div>
            <div className="">
              <Button
                type={"primary"}
                size="middle"
                className={`font-BricolageGrotesqueSemiBold continue font-bold w-32 rounded-2xl`}
                style={{
                  borderRadius: "16px",
                  fontFamily: "BricolageGrotesqueMedium",
                }}
                onClick={() => message.success('Test email has been sent successfully')}
              >
                Send test
              </Button>
            </div>
          </div>

          <div className="mx-auto pt-8 pb-8">
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
      </Space>
    </EventDetailsComponent>
  );
};

export default EventsGuestListEmail;
