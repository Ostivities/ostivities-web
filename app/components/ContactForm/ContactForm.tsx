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
import { useRegisterGuest } from "@/app/hooks/guest/guest.hook";
import { dateFormat, timeFormat } from "@/app/utils/helper";
import { IGuestData, ITicketDetails } from "@/app/utils/interface";
import { useTimer } from "@/app/hooks/countdown";
import TimerModal from "@/app/components/OstivitiesModal/TimerModal";

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
  onSubmit?: (values: any) => void;
  onExternalFinishTrigger?: (trigger: () => void) => void;
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

const ContactForm = ({
  ticketDetails,
  onSubmit,
  onExternalFinishTrigger,
}: InfoNeeded) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const params = useParams<{ event: string }>();
  const { registerGuest } = useRegisterGuest();
  const { getUserEventByUniqueKey } = useGetUserEventByUniqueKey(params?.event);
  const eventDetails = getUserEventByUniqueKey?.data?.data?.data;

  // console.log(ticketDetails, "ticketDetails from contact page");

  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [counter, setCounter] = useState(0);
  const [attendeesInformation, setAttendeesInformation] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      confirmEmail: string;
    }[]
  >([]);
  const [additionalFields, setAdditionalFields] = useState<
    { id: number; question: string; answer: string }[]
  >([]);
  // console.log(attendeesInformation);

  // Function to handle attendee information updates
  const handleInputChange = (
    value: string,
    attendeeId: number,
    field: "firstName" | "lastName" | "attendeeEmail" | "confirmAttendeeEmail"
  ) => {
    setAttendeesInformation((prevInfo) => {
      const updatedInfo = [...prevInfo];

      // Map 'attendeeEmail' and 'confirmAttendeeEmail' to 'email' and 'confirmEmail'
      const stateFieldMap: Record<string, "email" | "confirmEmail"> = {
        attendeeEmail: "email",
        confirmAttendeeEmail: "confirmEmail",
      };

      // Determine the actual field name in the state
      const actualField = stateFieldMap[field] || field;

      // Find index based on attendee ID; if not found, add a new attendee
      let attendeeIndex = updatedInfo.findIndex(
        (attendee) => attendee.id === attendeeId
      );

      if (attendeeIndex === -1) {
        // If attendee doesn't exist, add a new entry with default values
        updatedInfo.push({
          id: attendeeId,
          firstName: "",
          lastName: "",
          email: "",
          confirmEmail: "",
        });
        attendeeIndex = updatedInfo.length - 1;
      }

      // Update the specified field for this attendee
      updatedInfo[attendeeIndex] = {
        ...updatedInfo[attendeeIndex],
        [actualField]: value,
      };

      return updatedInfo;
    });
  };

  const handleFirstNameChange = (ticketIndex: number, firstName: string) => {
    setAttendeesInformation(
      attendeesInformation.map((field) =>
        field.id === ticketIndex ? { ...field, firstName } : field
      )
    );
  };

  const onFinish = (values: Inputs) => {
    // Do any additional handling if needed
    if (onSubmit) {
      const {firstName, lastName, } = values;
      console.log(values, "values from contact page");
      onSubmit(values);
    }
  };

  // Bind `onFinish` to an external trigger
  // useEffect(() => {
  //   if (onExternalFinishTrigger) {
  //     onExternalFinishTrigger(() => form.submit());
  //   }
  // }, [onExternalFinishTrigger]);

  const validateForm = async () => {
    try {
      await form.validateFields();
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
    }
  };
  let ticketCounter = 0;

  const { minutes, remainingSeconds, timer } = useTimer();

  // useEffect(() => {
  //   if (minutes === 0 && remainingSeconds === 0) {
  //     setModal(true);
  //   }
  // }, [minutes, remainingSeconds]);

  return (
    <section className="flex gap-12">
      {/* Scrollable content container */}
      <section className="flex-1 pr-1 pl-3 pb-4 scrollable-content overflow-y-auto scroll-smooth h-full">
        <div className="bg-OWANBE_NOTIFICATION text-s font-BricolageGrotesqueRegular px-4 py-2 border-[0.5px] border-OWANBE_PRY rounded-[0.625rem] w-[570px]">
          We have reserved your tickets, please complete checkout within{" "}
          <span className="text-OWANBE_PRY text-s font-BricolageGrotesqueRegular">
            {timer}
          </span>
          minutes to secure your tickets.
        </div>

        {/* <div className="flex-center justify-between">
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
        </div> */}
        <div className="pr-full mt-12">
          <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueMedium my-5 custom-font-size">
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
                      First Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please provide your first name",
                    },
                  ]}
                  style={{}}
                  // className=""
                >
                  <Input placeholder="Enter First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span>
                      Last Name <span style={{ color: "red" }}>*</span>
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
                  Email Address <span style={{ color: "red" }}>*</span>
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
                  Confirm Email <span style={{ color: "red" }}>*</span>
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
                  Phone Number <span style={{ color: "red" }}>*</span>
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
            {ticketDetails?.some(
              (ticket) =>
                ticket?.additionalInformation &&
                ticket?.additionalInformation?.length > 0
            ) && (
              <h3 className="text-OWANBE_PRY text-md font-BricolageGrotesqueBold my-2 custom-font-size">
                Additional Information
              </h3>
            )}
            {/* {ticketDetails?.map((ticketDetail, ticketIndex) => {
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
                          {infoDetails?.question}{" "}
                          {infoDetails?.is_compulsory ? (
                            <span style={{ color: "red" }}>*</span>
                          ) : null}
                        </span>
                      }
                      name={`additionalField${ticketIndex}-${infoIndex}`} // Unique name to avoid conflicts
                      rules={
                        infoDetails?.is_compulsory
                          ? [
                              {
                                required: true,
                                message: "This question is required",
                              },
                            ]
                          : []
                      }
                      validateTrigger={["onChange", "onBlur"]} // Validate on change and blur
                    >
                      <Input type="text" placeholder="Enter your answer" />
                    </Form.Item>
                  );
                }
              );
            })} */}
            <Form.List name="additional_information">
              {(fields, { add, remove }) => (
                <>
                  {additionalFields.map(({ id, question }) => (
                    <div key={id}>
                      <Form.Item
                        name={[id, "question"]}
                        initialValue={question}
                        hidden
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        key={id}
                        label={
                          <span>
                            {question} <span style={{ color: "red" }}>*</span>
                          </span>
                        }
                        name={[id, "answer"]}
                        rules={[
                          {
                            required: true,
                            message: "Please provide an answer",
                          },
                        ]}
                      >
                        <Input placeholder="Enter your answer" />
                      </Form.Item>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
            <br />
            {ticketDetails?.map((ticketDetail, ticketIndex) => {
              return (
                ticketDetail?.ticketEntity === TICKET_ENTITY.COLLECTIVE && (
                  <div key={ticketIndex}>
                    {[...Array(ticketDetail?.groupSize)]?.map((_, index) => {
                      ticketCounter++; // Increment ticketCounter globally
                      const attendeeId = ticketCounter;

                      return (
                        <div key={index}>
                          <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueBold my-4 custom-font-size mt-4">
                            Ticket {ticketCounter} - Collective of{" "}
                            {ticketDetail?.groupSize} -{" "}
                            {ticketDetail?.ticketName}
                          </h3>
                          <Row gutter={16} className="mb-6">
                            <Col span={12}>
                              <Form.Item
                                name={[attendeeId, "firstName"]}
                                label={
                                  <span>
                                    Attendee First Name{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </span>
                                }
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please provide attendee first name",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Enter Attendee First Name"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e.target.value,
                                      attendeeId,
                                      "firstName"
                                    )
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name={[attendeeId, "lastName"]}
                                label={
                                  <span>
                                    Attendee Last Name{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </span>
                                }
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please provide attendee last name",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Enter Attendee Last Name"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e.target.value,
                                      attendeeId,
                                      "lastName"
                                    )
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row gutter={16} className="mb-12">
                            <Col span={12}>
                              <Form.Item
                                name={[attendeeId, "attendeeEmail"]}
                                label={
                                  <span>
                                    Attendee Email Address{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </span>
                                }
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
                                  onChange={(e) =>
                                    handleInputChange(
                                      e.target.value,
                                      attendeeId,
                                      "attendeeEmail"
                                    )
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                name={[attendeeId, "confirmAttendeeEmail"]}
                                label={
                                  <span>
                                    Confirm Attendee Email{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </span>
                                }
                                rules={[
                                  {
                                    required: true,
                                    message: "Please confirm attendee email",
                                  },
                                  ({ getFieldValue }) => ({
                                    validator(_, value) {
                                      const emailValue = getFieldValue([
                                        attendeeId,
                                        "attendeeEmail",
                                      ]); // Get the value of the email field
                                      if (!value || emailValue === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject(
                                        new Error("Emails do not match!")
                                      );
                                    },
                                  }),
                                ]}
                              >
                                <Input
                                  type="email"
                                  placeholder="Confirm Attendee Email Address"
                                  onChange={(e) =>
                                    handleInputChange(
                                      e.target.value,
                                      attendeeId,
                                      "confirmAttendeeEmail"
                                    )
                                  }
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      );
                    })}
                  </div>
                )
              );
            })}{" "}
          </Form>
        </div>
        {modal && <TimerModal />}
      </section>
    </section>
  );
};

export default ContactForm;
