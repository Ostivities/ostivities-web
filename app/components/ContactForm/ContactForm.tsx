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
  useEffect,
  useState,
} from "react";
import "@/app/globals.css";
import "@/app/scroll.css";
import { Heading5 } from "@/app/components/typography/Typography";
import { TICKET_ENTITY } from "@/app/utils/enums";
import { useGetUserEventByUniqueKey } from "@/app/hooks/event/event.hook";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { ITicketDetails } from "@/app/utils/interface";

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
  onSubmit?:  () => void;
}

const ContactForm = (ticketDetails: InfoNeeded) => {
  const router = useRouter();
  const params = useParams<{ event: string }>();
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
  const eventDetails = getUserEventByUniqueKey?.data?.data?.data;

  console.log(ticketDetails, "ticketDetails from contact page");

  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  // useEffect(() => {
  //   if (formRef) {
  //     formRef.current = form;
  //   }
  // }, [formRef]);

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
  let ticketCounter = 0;

  return (
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
                    label={
                      <span>
                        First Name <span style={{ color: 'red' }}>*</span>
                      </span>
                    }
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your first name",
                    },
                  ]}
                  style={{
                    
                  }}
                  // className=""
                >
                  <Input placeholder="Enter First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span>
                      Last Name <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
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
              label={
                <span>
                  Email Address <span style={{ color: 'red' }}>*</span>
                </span>
              }
              name="email"
              rules={[{ required: true, message: "Please provide your email" }]}
            >
              <Input type="email" placeholder="Enter Email Address" />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Confirm Email <span style={{ color: 'red' }}>*</span>
                </span>
              }
              name="confirmEmail"
              dependencies={["email"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your email!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("email") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Emails do not match!"));
                  },
                }),
              ]}
            >
              <Input type="email" placeholder="Confirm Email Address" />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Phone Number <span style={{ color: 'red' }}>*</span>
                </span>
              }
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
            <br />

            {ticketDetails?.ticketDetails?.some(
              (ticket) =>
                ticket?.additionalInformation &&
                ticket?.additionalInformation?.length > 0
            ) && (
              <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-2 custom-font-size">
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
                      label={
                        <span>
                          {infoDetails?.question} {infoDetails?.is_compulsory === true ? <span style={{ color: 'red' }}>*</span> : null }
                        </span>
                      }
    
                      name={`additionalField${ticketIndex}-${infoIndex}`} // Unique name to avoid conflicts
                      rules={
                        infoDetails?.is_compulsory === true
                          ? [
                              {
                                required: true,
                                message: "This question is required",
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

            <br />

            {ticketDetails?.ticketDetails?.map((ticketDetail, ticketIndex) => {
              return (
                ticketDetail?.ticketEntity === TICKET_ENTITY.COLLECTIVE && (
                  <>
                    {/* Loop through the groupSize to create the required number of forms */}
                    {[...Array(ticketDetail?.groupSize)].map((_, index) => {
                      ticketCounter++; // Increment the counter for each ticket

                      return (
                        <div key={index}>
                          <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueBold my-4 custom-font-size mt-4">
                            Ticket {ticketCounter} - Collective of{" "}
                            {ticketDetail?.groupSize} -{" "}
                            {ticketDetail?.ticketName}
                          </h3>

                          <Form
                            form={form}
                            onValuesChange={validateForm}
                            onFinish={onFinish}
                            className="form-spacing my-1"
                          >
                            <Row gutter={16} className="mb-6">
                              <Col span={12}>
                                <Form.Item
                                  layout="vertical"
                                  className="my-4"
                                  label={
                                    <span>
                                      Attendee First Name <span style={{ color: 'red' }}>*</span>
                                    </span>
                                  }
                                  name={`AttendeefirstName-${ticketCounter}`} // Unique name for each form
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
                                  className="my-4"
                                  label={
                                    <span>
                                      Attendee Last Name <span style={{ color: 'red' }}>*</span>
                                    </span>
                                  }
                                  name={`AttendeelastName-${ticketCounter}`} // Unique name for each form
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

                            <Row gutter={16} className="mb-12">
                              <Col span={12}>
                                <Form.Item
                                  className="my-4"
                                  label={
                                    <span>
                                      Attendee Email Address <span style={{ color: 'red' }}>*</span>
                                    </span>
                                  }
                                  name={`AttendeEmail-${ticketCounter}`}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please provide attendee email",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="email"
                                    placeholder="Enter Attendee Email Address"
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  className="my-4"
                                  label={
                                    <span>
                                      Confirm Attendee Email <span style={{ color: 'red' }}>*</span>
                                    </span>
                                  }
                                  name={`ConfirmAttendeeEmail-${ticketCounter}`}
                                  dependencies={[`AttendeEmail-${ticketCounter}`]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please confirm your email!",
                                    },
                                    ({ getFieldValue }) => ({
                                      validator(_, value) {
                                        if (!value || getFieldValue(`AttendeEmail-${ticketCounter}`) === value) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Emails do not match!"));
                                      },
                                    }),
                                  ]}
                    
                                >
                                  <Input
                                    type="email"
                                    placeholder="Confirm Attendee Email Address"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      );
                    })}
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
