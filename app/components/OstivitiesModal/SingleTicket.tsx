import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { useCreateTicket } from "@/app/hooks/ticket/ticket.hook";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import {
  CloseOutlined,
  CloseSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { ITicketData } from "@/app/utils/interface";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
} from "antd";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import EmailEditor from "../QuillEditor/EmailEditor";
import { TICKET_TYPE, TICKET_STOCK } from "@/app/utils/enums";

const { Option } = Select;

interface FieldType {
  ticketType?: string;
  ticketName?: string;
  ticketStock?: string;
  ticketPrice?: number;
  purchaseLimit?: number;
  ticketDescription?: string;
  remember?: boolean;
  additionalInfo?: { info: string; compulsory: boolean }[];
}

const SingleTicket = ({ onCancel }: { onCancel?: () => void }): JSX.Element => {
  const { createTicket } = useCreateTicket();
  const { profile } = useProfile();
  const params = useParams<{ id: string }>();
  const [ticketType, setTicketType] = useState<string>("paid");
  const [ticketStockValue, setTicketStockValue] = useState<string>("");
  const [additionalFields, setAdditionalFields] = useState<
    { id: number; compulsory: boolean }[]
  >([]);
  const [showAdditionalField, setShowAdditionalField] =
    useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0); // Counter for unique keys
  const [editorContent, setEditorContent] = useState("");
  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };

  // const onFinish: FormProps<ITicketData>["onFinish"] = async (values) => {
  //   const { ticketQuestions, ...rest } = values;
  //   if (
  //     // @ts-ignore
  //     ticketQuestions?.length > 0 &&
  //     additionalFields?.length > 0 &&
  //     ticketQuestions?.length === additionalFields?.length
  //   ) {
  //     console.log(ticketQuestions);
  //     const questionsArray = ticketQuestions;
  //     const combinedArray = questionsArray?.map((questionObj, index) => {
  //       const { id, ...rest } = additionalFields[index];
  //       return {
  //         ...questionObj,
  //         ...rest,
  //       };
  //     });
  //     const payload = 
  //     console.log(combinedArray);
  //     console.log(values)


  //     // make api call here
  //   }
  // };

  const onFinish: FormProps<ITicketData>["onFinish"] = async (values) => {
    const { ticketQuestions, ...rest } = values;

    if (
      // @ts-ignore
      ticketQuestions.length > 0 &&
      additionalFields.length > 0 &&
      ticketQuestions?.length === additionalFields.length
    ) {
      console.log(ticketQuestions);
      const questionsArray = ticketQuestions;
      const combinedArray: {
        compulsory: boolean;
        question: string;
        isCompulsory: boolean;
      }[] = questionsArray?.map((questionObj, index) => {
        const { id, ...rest } = additionalFields[index];
        return {
          ...questionObj,
          ...rest,
        };
      });

      const payload: ITicketData = {
        ...rest,
        ticketQuestions: combinedArray,
        ticketDescription: editorContent,
        event: params?.id,
        ticketEntity: "SINGLE",
        user: profile?.data?.data?.data?.id
      };

      console.log(payload);

      // make api call here

      if(payload) {
        const response = await createTicket.mutateAsync(payload);
        if (response.status === 201) {
          console.log(response);
          // form.resetFields();
          // linkRef.current?.click();
          // router.push("/verify-account");
        }
      }
    }
  };

  const onFinishFailed: FormProps<ITicketData>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log(errorInfo);
    return errorInfo;
  };

  const addAdditionalField = () => {
    setAdditionalFields([
      ...additionalFields,
      { id: counter, compulsory: false },
    ]);
    setCounter(counter + 1); // Increment the counter for the next key
  };

  const removeAdditionalField = (id: number) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
  };

  const handleCompulsoryChange = (id: number, checked: boolean) => {
    setAdditionalFields(
      additionalFields.map((field) =>
        field.id === id ? { ...field, compulsory: checked } : field
      )
    );
  };
  console.log(params?.id);

  const prefixSelector = (
    <Select name="ticketStock" defaultValue={TICKET_STOCK.UNLIMITED}>
      <Option value={TICKET_STOCK.LIMITED}>Limited</Option>
      <Option value={TICKET_STOCK.UNLIMITED}>Unlimited</Option>
    </Select>
  );

  return (
    <Form<ITicketData>
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<ITicketData>
        label="Ticket type"
        name="ticketType"
        rules={[{ required: true, message: "Please select your ticket type!" }]}
        style={{ marginBottom: "8px" }}
      >
        <Select placeholder="Select ticket type">
          <Option value={TICKET_TYPE.FREE}>Free</Option>
          <Option value={TICKET_TYPE.PAID}>Paid</Option>
        </Select>
      </Form.Item>

      <Form.Item<ITicketData>
        label="Ticket name"
        name="ticketName"
        rules={[{ required: true, message: "Please input your ticket name!" }]}
        style={{ marginBottom: "8px" }}
      >
        <Input placeholder="Enter ticket name" />
      </Form.Item>

      <Form.Item<ITicketData>
        label="Ticket stock"
        name="ticketQty"
        rules={[{ required: true, message: "Please input your ticket stock!" }]}
        style={{ marginBottom: "8px" }}
      >
        <Input
          addonBefore={prefixSelector}

          placeholder={
            ticketStockValue === "unlimited" ? "∞" : "Enter ticket stock"
          }
          disabled={ticketStockValue === "unlimited"}
        />
      </Form.Item>

      <Form.Item<ITicketData>
        label="Ticket price"
        name="ticketPrice"
        rules={[
          {
            required: ticketType === "paid",
            message: "Please input your ticket price!",
          },
        ]}
        style={{ marginBottom: "8px" }}
      >
        <InputNumber
          placeholder="Enter ticket price"
          style={{ width: "100%" }}
          min={0}
          formatter={(value) =>
            `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value?.replace(/\₦\s?|(,*)/g, "") as any}
          disabled={ticketType === "free"}
        />
      </Form.Item>

      <Form.Item<ITicketData>
        label="Purchase limit"
        name="purchaseLimit"
        rules={[
          { required: true, message: "Please input your purchase limit!" },
        ]}
        style={{ marginBottom: "15px" }}
      >
        <InputNumber
          placeholder="Enter purchase limit"
          style={{ width: "100%" }}
          min={0}
        />
      </Form.Item>

      <Paragraph
        className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
        content={"Ticket description"}
        styles={{ fontWeight: "bold !important" }}
      />
      <Form.Item className="mb-3 pb-16 w-full mt-3">
        <EmailEditor
          initialValue="<p>Enter ticket description!</p>"
          onChange={handleEditorChange}
        />
      </Form.Item>

      <Form.Item<ITicketData>
        valuePropName="checked"
        style={{ marginBottom: "24px", display: "flex", alignItems: "center" }}
      >
        <Form.Item name= "guestAsChargeBearer">
          <Checkbox defaultChecked style={{ marginRight: "20px" }}>
            Transfer charge fees to guest
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={(e) => setShowAdditionalField(e.target.checked)}>
            Enable additional information
          </Checkbox>
        </Form.Item>
      </Form.Item>

      {showAdditionalField && (
        <Form.Item<ITicketData> style={{ marginBottom: "24px" }}>
          <Form.List name="ticketQuestions">
            {(fields, { add }) => (
              <>
                {additionalFields.map(({ id, compulsory }) => (
                  <div key={id} style={{ marginBottom: "16px" }}>
                    <Form.Item
                      name={[id, "question"]}
                      fieldKey={[id, "info"]}
                      rules={[
                        {
                          required: compulsory,
                          message: "Please enter additional information",
                        },
                      ]}
                      style={{ marginBottom: "8px" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Input
                          placeholder="Enter additional information"
                          style={{ flex: 1 }}
                        />
                        <Button
                          type="link"
                          icon={<CloseSquareOutlined />}
                          onClick={() => removeAdditionalField(id)}
                          style={{
                            color: "#e20000",
                            marginLeft: "8px", // Adjust margin to position icon beside input field
                          }}
                        />
                      </div>
                    </Form.Item>
                    <Form.Item
                      name="isCompulsory"
                      style={{ marginBottom: "8px" }}
                    >
                      <Checkbox
                        checked={compulsory}
                        onChange={(e) =>
                          handleCompulsoryChange(id, e.target.checked)
                        }
                      >
                        Make compulsory
                      </Checkbox>
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={addAdditionalField}
                    icon={<PlusOutlined />}
                  >
                    Add question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      )}

      <div className="flex flex-row items-center justify-center py-6 space-x-4">
        <Button
          type="default"
          size={"large"}
          className={`font-BricolageGrotesqueSemiBold button-styles sign-in cursor-pointer font-bold`}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size={"large"}
          htmlType="submit"
          className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
        >
          Add Ticket
        </Button>
      </div>
    </Form>
  );
};

export default SingleTicket;
