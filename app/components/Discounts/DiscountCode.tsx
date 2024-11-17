import { useDiscount } from "@/app/contexts/discount-context/DiscountContext";
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  GetProps,
  Input,
  InputNumber,
  Select,
  Space,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading5, Label, Paragraph } from "../typography/Typography"; // Ensure Label component is correctly imported
import { useCreateDiscount } from "@/app/hooks/discount/discount.hook";
import { DISCOUNT_TYPE, USAGE_LIMIT } from "@/app/utils/enums";
import { useGetEventTickets } from "@/app/hooks/ticket/ticket.hook";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import {
  IDiscountData,
  IDiscountCreate,
  ITicketDetails,
} from "@/app/utils/interface";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface FieldType { }

interface DisabledTime {
  disabledHours: () => number[];
  disabledMinutes: () => number[];
  disabledSeconds: () => number[];
}

const DiscountCode = (): JSX.Element => {
  const { toggleDiscount } = useDiscount();
  const [form] = Form.useForm();
  const [ticketApplicable, setTicketApplicable] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { createDiscount } = useCreateDiscount();
  const { profile } = useProfile();
  const { getTickets } = useGetEventTickets(params?.id);
  const ticketData = getTickets?.data?.data?.data;
  // console.log(ticketData, "ticketData");
  // console.log(selectedTickets, "selectedTickets");
  // console.log(ticketApplicable, "ticketApplicable")

  dayjs.extend(customParseFormat);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const startDate = dayjs(startDateValue); // Replace `startDateValue` with your actual start date

    // Disable dates before today and before the `startDate`
    return (
      current &&
      (current < dayjs().startOf("day") || current < startDate.startOf("day"))
    );
  };

  const disabledTime = (current: dayjs.Dayjs | null): Partial<DisabledTime> => {
    const startDate = dayjs(startDateValue); // Your specified start date

    // Disable past times only if the selected date is the start date
    if (current && current.isSame(startDate, "day")) {
      return {
        disabledHours: () =>
          Array.from({ length: startDate.hour() }, (_, i) => i),
        disabledMinutes: () =>
          Array.from({ length: startDate.minute() }, (_, i) => i),
        disabledSeconds: () =>
          Array.from({ length: startDate.second() }, (_, i) => i),
      };
    }
    return {};
  };

  useEffect(() => {
    if (ticketApplicable === "All Tickets") {
      console.log("effect");
      // Set selected tickets to all ticket IDs
      setSelectedTickets(ticketData.map((ticket: ITicketDetails) => ticket.id));
    }
  }, [ticketApplicable, ticketData]);

  const onFinish: FormProps<IDiscountData>["onFinish"] = async (values) => {
    // return console.log(values, "values");
    const { ticketApplicable, ...rest } = values;

    const response = await createDiscount.mutateAsync({
      ...rest,
      event: params?.id,
      eventId: params?.id,
      user: profile?.data?.data?.data?.id,
    });

    if (response.status === 201) {
      router.push(`/discover/events-created/${params?.id}/tickets/discounts`);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };

  const handleTicketApplicableChange = (value: string) => {
    setTicketApplicable(value);
  };

  const handleDiscountTypeChange = (value: string) => {
    setDiscountType(value);
  };
  const handleTicketTypeChange = (value: string[]) => {
    setSelectedTickets(value);
  };

  return (
    <Form<IDiscountData>
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      className="w-full flex flex-col space-y-6"
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Heading5 className="" content={"Create Discount"} />
          <Paragraph
            className="text-OWANBE_PRY text-sm font-normal font-BricolageGrotesqueRegular"
            content={
              "Generate discount codes and implement automatic discounts."
            }
            styles={{ fontWeight: "normal !important" }}
          />
          <br />

          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label={<Label content="Discount code" />} // Correct usage of Label component
              name="discountCode"
              rules={[
                { required: true, message: "Please input the discount code!" },
              ]}
            >
              <Input placeholder="Enter discount code" />
            </Form.Item>

            <Form.Item
              label={<Label content="Discount Type" />} // Correct usage of Label component
              name="discountType"
              rules={[
                { required: true, message: "Please select the discount type!" },
              ]}
            >
              <Select
                placeholder="Select discount type"
                onChange={handleDiscountTypeChange}
              >
                <Select.Option value={DISCOUNT_TYPE.PERCENTAGE}>
                  Percentage Discount
                </Select.Option>
                <Select.Option value={DISCOUNT_TYPE.FIXED}>
                  Fixed Value Discount
                </Select.Option>
              </Select>
            </Form.Item>

            {discountType === DISCOUNT_TYPE.PERCENTAGE && (
              <Form.Item
                label={<Label content="Discount Value" />} // Correct usage of Label component
                name="discount_value"
                rules={[
                  {
                    required: true,
                    message: "Please input the discount value!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter discount value"
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value?.replace("%", "") as any}
                />
              </Form.Item>
            )}

            {discountType === DISCOUNT_TYPE.FIXED && (
              <Form.Item
                label={<Label content="Discount Value" />} // Correct usage of Label component
                name="discount_value"
                rules={[
                  {
                    required: true,
                    message: "Please input the discount value!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Enter discount value"
                  style={{ width: "100%" }}
                  min={0}
                  formatter={(value) =>
                    `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\₦\s?|(,*)/g, "") as any}
                />
              </Form.Item>
            )}

            <Form.Item
              label={<Label content="Ticket Applicable" />} // Correct usage of Label component
              name="ticketApplicable"
              rules={[
                {
                  required: true,
                  message: "Please select the ticket applicable!",
                },
              ]}
            >
              <Select
                placeholder="Select ticket applicable"
                onChange={handleTicketApplicableChange}
              >
                <Select.Option value="All Tickets">
                  All Tickets In The Current Event
                </Select.Option>
                <Select.Option value="Specific Ticket Types">
                  Specific Ticket Types
                </Select.Option>
              </Select>
            </Form.Item>

            {ticketApplicable === "All Tickets" && (
              <Form.Item
                style={{ display: "none" }} // Optionally hide the field
                label={<Label content="All Tickets" />}
                name="ticket"
                initialValue={ticketData?.map(
                  (ticket: ITicketDetails) => ticket.id
                )} // Automatically set the initial value to all ticket IDs
              >
                <Select
                  mode="multiple"
                  placeholder="Select ticket"
                  value={ticketData?.map((ticket: ITicketDetails) => ticket.id)} // Automatically select all tickets
                  disabled // Disable input when "All Tickets" is selected
                >
                  {ticketData?.map((ticket: ITicketDetails) => (
                    <Select.Option key={ticket.id} value={ticket.id}>
                      {ticket.ticketName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            {ticketApplicable === "Specific Ticket Types" && (
              <Form.Item
                label={<Label content="Select Ticket" />} // Correct usage of Label component
                name="ticket"
                rules={[
                  { required: true, message: "Please select the ticket!" },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select ticket"
                  onChange={handleTicketTypeChange}
                >
                  {/* Map through your created tickets here */}
                  {ticketData?.map((ticket: ITicketDetails) => (
                    <Select.Option key={ticket.id} value={ticket.id}>
                      {ticket.ticketName}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </div>
        </Space>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Heading5 content="Usage Limit" />
          <div className="grid grid-cols-2 gap-x-8">
            <Form.Item
              label={<Label content="Start Date & Time" />} // Correct usage of Label component
              name="startDateAndTime"
              rules={[
                {
                  required: true,
                  message: "Please input the start date and time!",
                },
              ]}
            >
              <DatePicker
                showTime={{ format: "h:mm:ss A" }} // Enables 12-hour time picker with AM/PM
                format="YYYY-MM-DD h:mm:ss A" // Displays date and time in 12-hour format
                style={{ width: "100%", height: "33px" }}
                onChange={(date) => {
                  // Ensure the displayed and stored value is in 12-hour format
                  form.setFieldsValue({ startDateAndTime: date });
                  setStartDateValue(date?.format("YYYY-MM-DD h:mm:ss A"));
                }}
                disabledDate={disabledDate}
              />
            </Form.Item>

            <Form.Item
              label={<Label content="End Date & Time" />} // Correct usage of Label component
              name="endDateAndTime"
              rules={[
                {
                  required: true,
                  message: "Please input the end date and time!",
                },
              ]}
            >
              <DatePicker
                showTime={{ format: "h:mm:ss A" }} // Enables 12-hour format in the time picker
                format="YYYY-MM-DD h:mm:ss A" // Ensures the input value matches the 12-hour format
                style={{ width: "100%", height: "33px" }}
                disabledDate={disabledDate}
                disabledTime={disabledTime}
              />
            </Form.Item>

            <Form.Item
              label={<Label content="Usage Limit" />} // Correct usage of Label component
              name="usageLimit"
              rules={[
                { required: true, message: "Please select the usage limit!" },
              ]}
            >
              <Select placeholder="Select usage limit">
                <Select.Option value={USAGE_LIMIT.MULTIPLE}>
                  Unlimited
                </Select.Option>
                <Select.Option value={USAGE_LIMIT.ONCE}>
                  Useable Once
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Space>
      </Space>
      <br />

      <Space
        direction="horizontal"
        size="large"
        style={{
          width: "100%",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        className="pt-5"
      >
        <Form.Item>
          <Button
            type="default"
            htmlType="button"
            size="large"
            className="font-BricolageGrotesqueSemiBold continue cursor-pointer font-bold w-48 rounded-2xl"
            style={{
              borderRadius: "16px",
              fontFamily: "BricolageGrotesqueMedium",
            }}
            onClick={() =>
              router.push(
                `/discover/events-created/${params?.id}/tickets/discounts`
              )
            }
          >
            Cancel
          </Button>
        </Form.Item>
        <Form.Item>
          {ticketData?.length === 0 ? (
            <Button
              type="default"
              htmlType="button"
              size="large"
              disabled
              style={{
                backgroundColor: "#E20000",
                color: "#fff",
              }}
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
            >
              Create Discount
            </Button>
          ) : (
            <Button
              type="default"
              htmlType="submit"
              size="large"
              className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
              loading={createDiscount.isPending}
            >
              Create Discount
            </Button>
          )}
        </Form.Item>
      </Space>
    </Form>
  );
};

export default DiscountCode;
