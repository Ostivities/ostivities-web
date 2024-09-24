import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import { useCreateTicket } from "@/app/hooks/ticket/ticket.hook";
import {
  CloseOutlined,
  CloseSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { TICKET_STOCK, TICKET_TYPE } from "@/app/utils/enums";
import { ITicketCreate, ITicketData } from "@/app/utils/interface";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import EmailEditor from "../QuillEditor/EmailEditor";
import { usePathname } from 'next/navigation'
import { useCookies } from "react-cookie";

const { Option } = Select;

interface SingleTicketProps {
  onCancel?: () => void;  // Optional function with no parameters and no return value
  onOk?: () => void;      // Optional function with no parameters and no return value
}

const SingleTicket: React.FC<SingleTicketProps> = ({ onCancel, onOk, }) => {  
  const [form] = Form.useForm();
  const { createTicket } = useCreateTicket();
  const { profile } = useProfile();
  const params = useParams<{ id: string }>();
  const router = useRouter();
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
  const [cookies, setCookies] = useCookies(["ticket_id",]);

  const ticketStock: string = Form.useWatch("ticketStock", form);
  const ticketType: string = Form.useWatch("ticketType", form);
  const guestAsChargeBearer = Form.useWatch("guestAsChargeBearer", form);
  // console.log(guestAsChargeBearer, "guestAsChargeBearer")
   
  useEffect(() => {
    if (ticketStock === TICKET_STOCK.UNLIMITED) {
      form.setFieldsValue({ ticketStock: TICKET_STOCK.UNLIMITED });
    } else {
      form.setFieldsValue({ ticketStock: TICKET_STOCK.LIMITED });
    }
  }, [ticketStock]);

  // useEffect(() => {
  //   if(ticketType === TICKET_TYPE.FREE) {
  //     form.setFieldsValue({ ticketPrice: "Free" });
  //   }
  // }, [ticketType]);

  useEffect(() => {
    if (guestAsChargeBearer === true) {
      form.setFieldsValue({ guestAsChargeBearer: true });
    }
  }, [guestAsChargeBearer]);

  const onFinish: FormProps<ITicketData>["onFinish"] = async (values) => {
    const { ticketQuestions, ...rest } = values;
    console.log(values)

    if (
      // @ts-ignore
      ticketQuestions?.length > 0 &&
      additionalFields?.length > 0 &&
      ticketQuestions?.length === additionalFields.length &&
      showAdditionalField === true
    ) {
      const questionsArray = ticketQuestions;
      const combinedArray: {
        question: string;
        isCompulsory: boolean;
      }[] = questionsArray?.map(
        (
          questionObj: {
            question: string;
            isCompulsory: boolean;
          },
          index
        ) => {
          const { id, compulsory, ...rest } = additionalFields[index];
          return {
            ...questionObj,
            isCompulsory: compulsory,
            ...rest,
          };
        }
      );
      console.log("values")

      const payload: ITicketCreate = {
        ...rest,
        ticketQuestions: combinedArray,
        ticketDescription: editorContent,
        event: params?.id,
        ticketEntity: "SINGLE",
        user: profile?.data?.data?.data?.id,
      };
      console.log(payload, "kk");

      // make api call here

      if (payload) {
        const response = await createTicket.mutateAsync(payload);
        if (response.status === 201) {
          console.log(response);
          form.resetFields();
          // linkRef.current?.click();
          onOk && onOk()
          router.push(`/Dashboard/create-events/${params?.id}/tickets_created`);
        }
      }
    } else {

      const payload: ITicketCreate = {
        ...rest,
        ticketDescription: editorContent,
        event: params?.id,
        ticketEntity: "SINGLE",
        user: profile?.data?.data?.data?.id,
      };
      if (payload) {
        const response = await createTicket.mutateAsync(payload);
        if (response.status === 201) {
          console.log(response);
          form.resetFields();
          // linkRef.current?.click();
          onOk && onOk()
          router.push(`/Dashboard/create-events/${params?.id}/tickets_created`);
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

  const prefixSelector = (
    <Form.Item name="ticketStock" noStyle>
      <Select defaultValue={TICKET_STOCK.UNLIMITED}>
        <Option value={TICKET_STOCK.LIMITED}>Limited</Option>
        <Option value={TICKET_STOCK.UNLIMITED}>Unlimited</Option>
      </Select>
    </Form.Item>
  );

  // console.log(ticketStock, "ticketStock");

  return (
    <Form<ITicketData>
      name="basic"
      initialValues={{ remember: true, guestAsChargeBearer: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      form={form}
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
        rules={[
          {
            required: true,
            message: "Please input your ticket name!",
          },
        ]}
        style={{ marginBottom: "8px" }}
      >
        <Input placeholder="Enter ticket name" />
      </Form.Item>

      <Form.Item<ITicketData>
        label="Ticket stock"
        name="ticketQty"
        rules={[
          {
            required: ticketStock === TICKET_STOCK.LIMITED,
            message: "Please input your ticket stock",
          },
        ]}
        style={{ marginBottom: "8px" }}
      >
        <InputNumber
          addonBefore={prefixSelector}
          placeholder={
            ticketStock === TICKET_STOCK.UNLIMITED ? "∞" : "Enter ticket stock"
          }
          style={{ width: "100%" }}
          disabled={ticketStock === TICKET_STOCK.UNLIMITED}
        />
      </Form.Item>

      <Form.Item<ITicketData>
        label="Ticket price"
        name="ticketPrice"
        rules={[
          {
            required: ticketType === TICKET_TYPE.PAID,
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
          disabled={ticketType === TICKET_TYPE.FREE}
        />
      </Form.Item>

      <Form.Item<ITicketData>
        label="Purchase limit"
        name="purchaseLimit"
        rules={[
          {
            required: ticketStock === TICKET_STOCK.LIMITED,
            message: "Please input your purchase limit",
          },
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
      </Form.Item><br /><br /><br />

      <Form.Item
  style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "20px" }}
>
  <Form.Item<ITicketData> name="guestAsChargeBearer" valuePropName="checked" noStyle>
    <Checkbox style={{ marginRight: "10px" }}>
      Transfer charge fees to guest
    </Checkbox>
  </Form.Item>
  <Form.Item noStyle>
    <Checkbox onChange={(e) => setShowAdditionalField(e.target.checked)}>
      Enable additional information
    </Checkbox>
  </Form.Item>
</Form.Item>

      {showAdditionalField && (
        <Form.Item<ITicketData>
          style={{ marginBottom: "24px" }}
          rules={[
            {
              required: showAdditionalField === true,
            },
          ]}
        >
          <Form.List name="ticketQuestions" rules={[]}>
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
          // onClick={() => {
          //   form.validateFields().then(values => {
          //     onFinish(values);
          //     setInterval(() => {
          //       onOk && onOk();
          //     }, 2000)
          //   }).catch(errorInfo => {
          //     onFinishFailed(errorInfo);
          //   });
          // }}
          className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
        >
          Add Ticket
        </Button>
      </div>
    </Form>
  );
};

export default SingleTicket;
