"use client";

import DashboardLayout from "@/app/components/DashboardLayout/DashboardLayout";
import Summary from "@/app/components/Discovery/Summary";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Form, Input, Select, Row, Col } from "antd";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import "@/app/globals.css";
import "@/app/scroll.css";
import { Heading5 } from "@/app/components/typography/Typography";
import { TICKET_ENTITY } from "@/app/utils/enums";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import { dateFormat, timeFormat } from "@/app/utils/helper";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  phoneNumber: string;
  additionalField1: string;
  additionalField2: string;
  additionalField3: string;
}

interface InfoNeeded {
  ticketDetails?: {
    ticketName: string;
    ticketId: string;
    ticketPrice: number;
    ticketFee: number;
    ticketNumber: number;
    groupSize: number;
    subTotal: number;
    ticketEntity: string;
    additionalInformation?: {
      question: string;
      is_compulsory: boolean;
    }[];
  }[];
}

// interface InfoNeeded {
//   ticketName: string;
//   ticketId: string;
//   ticketPrice: number;
//   ticketFee: number;
//   ticketNumber: number;
//   subTotal: number;
//   ticketEntity: string;
//   additionalInformation?: {
//     question: string;
//     is_compulsory: boolean;
//   }[];
// }
// [];

const ContactForm = (ticketDetails: InfoNeeded) => {
  const router = useRouter();
  const params = useParams<{ event: string }>();
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
  const eventDetails = getUserEventByUniqueKey?.data?.data?.data;

  const title = (
    <div className="flex-center gap-2">
      <Image
        src="/icons/back-arrow.svg"
        alt=""
        height={25}
        width={25}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <h1 style={{ fontSize: "24px" }}>Contact Information</h1>
    </div>
  );
  console.log(ticketDetails, "ticketDetails from contact page");

  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const onFinish = (values: Inputs) => {
    console.log(values);
  };

  const validateForm = async () => {
    try {
      await form.validateFields();
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
    }
  };

  return (
    // <DashboardLayout title={title} isLoggedIn>
    <section className="flex gap-12">
      {/* Scrollable content container */}
      <section className="flex-1 pr-1 pl-3 pb-4 scrollable-content">
        <div className="flex-center justify-between">
          <div className="flex-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
              <Image src="/icons/calendar.svg" alt="" height={25} width={25} />
            </div>
            <div>
              <h3 className="text-sm" style={{ fontWeight: 600 }}>
                Date
              </h3>
              <span>{dateFormat(eventDetails?.startDate)}</span>
            </div>
          </div>
          <div className="flex-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-OWANBE_PRY/10 flex-center justify-center">
              <Image src="/icons/time.svg" alt="" height={25} width={25} />
            </div>
            <div>
              <h3 className="text-sm" style={{ fontWeight: 600 }}>
                Time
              </h3>
              <span>
                {timeFormat(eventDetails?.startDate)} -{" "}
                {timeFormat(eventDetails?.endDate)} {eventDetails?.timeZone}
              </span>
            </div>
          </div>
        </div>
        <div className="pr-full mt-16">
          <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueMedium my-8 custom-font-size">
            Please fill out the form below with your information so we can send
            you your ticket.
          </h3>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="form-spacing"
            onValuesChange={validateForm}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your first name",
                    },
                  ]}
                >
                  <Input placeholder="Enter First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your last name",
                    },
                  ]}
                >
                  <Input placeholder="Enter Last Name" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[{ required: true, message: "Please provide your email" }]}
            >
              <Input type="email" placeholder="Enter Email Address" />
            </Form.Item>
            <Form.Item
              label="Confirm Email"
              name="confirmEmail"
              rules={[{ required: true, message: "Please confirm your email" }]}
            >
              <Input type="email" placeholder="Confirm Email Address" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please provide your phone number" },
              ]}
            >
              <Input
                addonBefore={
                  <Select defaultValue="234">
                    {Array.from({ length: 1 }, (_, index) => (
                      <Select.Option key={index} value={`23${index + 4}`}>
                        +23{index + 4}
                      </Select.Option>
                    ))}
                  </Select>
                }
                placeholder="Enter Phone Number"
              />
            </Form.Item>
            {ticketDetails?.ticketDetails &&
              ticketDetails?.ticketDetails?.length > 0 && (
                <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-4 custom-font-size">
                  Additional Information
                </h3>
              )}

            {ticketDetails?.ticketDetails?.map((ticketDetail, ticketIndex) => {
              return ticketDetail?.additionalInformation?.map(
                (
                  infoDetails: {
                    question: string | number | ReactNode;
                    is_compulsory: boolean;
                  },
                  infoIndex: Key | null | undefined
                ) => {
                  return (
                    <Form.Item
                      key={`${ticketIndex}-${infoIndex}`} // Unique key combining ticketIndex and infoIndex
                      label={infoDetails?.question}
                      name={`additionalField${ticketIndex}-${infoIndex}`} // Unique name to avoid conflicts
                      rules={
                        infoDetails?.is_compulsory
                          ? [
                              {
                                required: true,
                                message: "Please provide answers",
                              },
                            ]
                          : []
                      }
                    >
                      <Input type="text" placeholder="Enter your answer" />{" "}
                      {/* Use type="text" instead of type="name" */}
                    </Form.Item>
                  );
                }
              );
            })}

            {/* <Form.Item
                  label="Information 1"
                  name="name"
                  rules={[{ required: true, message: 'Please provide answers' }]}
                >
                  <Input type="name" placeholder="Enter" />
            </Form.Item> */}
            {/* <Form.Item
              label="Information 2"
              name="name"
              rules={[{ required: true, message: "Please provide answers" }]}
            >
              <Input type="name" placeholder="Enter" />
            </Form.Item> */}

            <br />

            {ticketDetails?.ticketDetails?.map((ticketDetail, ticketIndex) => {
              return (
                ticketDetail?.ticketEntity === TICKET_ENTITY.COLLECTIVE && (
                  <>
                    {/* Loop through the groupSize to create the required number of forms */}
                    {[...Array(ticketDetail?.groupSize)].map((_, index) => (
                      <div key={index}>
                        <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueBold my-4 custom-font-size">
                          Ticket {index + 1} - Collective of{" "}
                          {ticketDetail?.groupSize} - {ticketDetail?.ticketName}
                        </h3>

                        <Form
                          form={form}
                          onValuesChange={validateForm}
                          onFinish={onFinish}
                        >
                          <Row gutter={16}>
                            <Col span={12}>
                              <Form.Item
                                layout="vertical"
                                className="form-spacing"
                                label="Attendee First Name"
                                name={`AttendeefirstName-${index}`} // Unique name for each form
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please provide attendee first name",
                                  },
                                ]}
                              >
                                <Input placeholder="Enter Attendee First Name" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                label="Attendee Last Name"
                                name={`AttendeelastName-${index}`} // Unique name for each form
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please provide attendee last name",
                                  },
                                ]}
                              >
                                <Input placeholder="Enter Attendee Last Name" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    ))}
                  </>
                )
              );
            })}
          </Form>
        </div>
      </section>
    </section>
    // </DashboardLayout>
  );
};

export default ContactForm;
