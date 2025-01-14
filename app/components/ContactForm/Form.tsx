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

  // 

  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const [additionalFields, setAdditionalFields] = useState<
    { id: number; question: string; answer: string }[]
  >([]);

  const [attendeesInformation, setAttendeesInformation] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      groupSize?: number;
      confirmEmail: string;
    }[]
  >([]);
  

  useEffect(() => {
    // Create a counter to assign sequential IDs to each attendee
    let idCounter = 0;

    const initialAttendees =
      ticketDetails?.flatMap((ticketDetail) => {
        if (ticketDetail?.ticketEntity === TICKET_ENTITY.COLLECTIVE) {
          return Array.from({ length: ticketDetail.groupSize }, () => ({
            id: idCounter++, // Assign and increment ID for each attendee
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: "",
            groupSize: ticketDetail.groupSize,
          }));
        }
        return [];
      }) || [];

    setAttendeesInformation(initialAttendees);
  }, [ticketDetails]);

  useEffect(() => {
    let counter = 0;

    const initialAdditionalFields =
      ticketDetails?.flatMap((ticketDetail) => {
        if (
          ticketDetail?.additionalInformation &&
          ticketDetail?.additionalInformation.length > 0
        ) {
          return ticketDetail.additionalInformation.map((info) => ({
            id: counter++,
            question: info.question,
            answer: "",
          }));
        }
        return [];
      }) || [];

    setAdditionalFields(initialAdditionalFields);
  }, [ticketDetails]);
  // Function to handle attendee information updates
  const handleInputChange = (id: number, field: string, value: string) => {
    setAttendeesInformation((prevInfo) =>
      prevInfo.map((attendee: any) =>
        attendee.id === id ? { ...attendee, [field]: value } : attendee
      )
    );
  };
  const handleAll = (id: number, field: string, value: string) => {
    setAttendeesInformation(
      attendeesInformation.map((info: any) =>
        info.id === id ? { ...info, [field]: value } : field
      )
    );
  };
  // const handleInputChange = (
  //   value: string,
  //   attendeeId: number,
  //   field: "firstName" | "lastName" | "attendeeEmail" | "confirmAttendeeEmail"
  // ) => {
  //   setAttendeesInformation((prevInfo) => {
  //     const updatedInfo = [...prevInfo];

  //     // Map 'attendeeEmail' and 'confirmAttendeeEmail' to 'email' and 'confirmEmail'
  //     const stateFieldMap: Record<string, "email" | "confirmEmail"> = {
  //       attendeeEmail: "email",
  //       confirmAttendeeEmail: "confirmEmail",
  //     };

  //     // Determine the actual field name in the state
  //     const actualField = stateFieldMap[field] || field;

  //     // Find index based on attendee ID; if not found, add a new attendee
  //     let attendeeIndex = updatedInfo.findIndex(
  //       (attendee) => attendee.id === attendeeId
  //     );

  //     if (attendeeIndex === -1) {
  //       // If attendee doesn't exist, add a new entry with default values
  //       updatedInfo.push({
  //         id: attendeeId,
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         confirmEmail: "",
  //       });
  //       attendeeIndex = updatedInfo.length - 1;
  //     }

  //     // Update the specified field for this attendee
  //     updatedInfo[attendeeIndex] = {
  //       ...updatedInfo[attendeeIndex],
  //       [actualField]: value,
  //     };

  //     return updatedInfo;
  //   });
  // };

  const handleFirstNameChange = (id: number, firstName: string) => {
    
    setAttendeesInformation(
      attendeesInformation.map((field) =>
        field.id === id ? { ...field, firstName } : field
      )
    );
  };

  // useEffect(() => {
  //   if (formRef) {
  //     formRef.current = form;
  //   }
  // }, [formRef]);

  // const onFinish = (values: IGuestData) => {
  //   
  // };

  const onFinish = (values: IGuestData) => {
    // Do any additional handling if needed
    if (onSubmit) {
      const { attendees_information, additional_information, ...rest } = values;

      // Check if attendees_information exists and has items
      const attendees = attendees_information?.length
        ? attendees_information.map((attendee: any) => {
            const { id, ...attendeeData } = attendee;
            return attendeeData;
          })
        : [];

      // Check if additional_information exists and has items
      const additionalFields = additional_information?.length
        ? additional_information.map((field: any) => {
            const { id, ...fieldData } = field;
            return fieldData;
          })
        : [];

      // Define payload with conditional attendees_information and additional_information
      const payload = {
        ...rest,
        attendees_information: attendees,
        additional_information: additionalFields,
      };

      // Log values for debugging
      

      // Call onSubmit with the payload
      onSubmit(payload);
    }
  };

  // Bind `onFinish` to an external trigger
  useEffect(() => {
    if (onExternalFinishTrigger) {
      onExternalFinishTrigger(() => form.submit());
    }
  }, [onExternalFinishTrigger]);

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

  useEffect(() => {
    if (minutes === 0 && remainingSeconds === 0) {
      setModal(true);
    }
  }, [minutes, remainingSeconds]);

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
            {attendeesInformation.map(({ id, groupSize }) => (
              <div key={id}>
                <h3 className="text-OWANBE_FADE text-md font-BricolageGrotesqueBold my-4 custom-font-size mt-4">
                  Ticket {id + 1} - Collective of {groupSize} -{" "}
                  {ticketDetails
                    ?.filter(
                      (ticket) =>
                        ticket?.ticketEntity === TICKET_ENTITY.COLLECTIVE
                    )
                    ?.map((ticket) => ticket?.ticketName)}
                </h3>
                <Row gutter={16} className="mb-6">
                  <Col span={12}>
                    <Form.Item
                      name={[id, "firstName"]}
                      label={
                        <span>
                          Attendee First Name{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please provide attendee first name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Attendee First Name"
                        // onChange={(e) =>
                        //   handleFirstNameChange(id, e.target.value)
                        // }
                        onChange={(e) =>
                          handleInputChange(id, "firstName", e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[id, "lastName"]}
                      label={
                        <span>
                          Attendee Last Name{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Please provide attendee last name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Attendee Last Name"
                        onChange={(e) =>
                          handleInputChange(id, "lastName", e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} className="mb-12">
                  <Col span={12}>
                    <Form.Item
                      name={[id, "email"]}
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
                          handleInputChange(id, "email", e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name={[id, "confirmEmail"]}
                      label={
                        <span>
                          Confirm Attendee Email{" "}
                          <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please confirm attendee email",
                      //   },
                      //   ({ getFieldValue }) => ({
                      //     validator(_, value) {
                      //       const emailValue = getFieldValue([
                      //         id,
                      //         "email",
                      //       ]); // Get the value of the email field
                      //       if (!value || emailValue === value) {
                      //         return Promise.resolve();
                      //       }
                      //       return Promise.reject(new Error("Emails do not match!"));
                      //     },
                      //   }),
                      // ]}
                    >
                      <Input
                        type="email"
                        placeholder="Confirm Attendee Email Address"
                        onChange={(e) =>
                          handleInputChange(id, "confirmEmail", e.target.value)
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
          </Form>
        </div>
        {modal && <TimerModal />}
      </section>
    </section>
  );
};

export default ContactForm;
