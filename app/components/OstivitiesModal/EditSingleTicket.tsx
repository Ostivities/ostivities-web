import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import {
  useUpdateTicket,
  useGetSingleTicket,
} from "@/app/hooks/ticket/ticket.hook";
import {
  CloseOutlined,
  CloseSquareOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { TICKET_STOCK, TICKET_TYPE } from "@/app/utils/enums";
import { ITicketUpdate, ITicketData } from "@/app/utils/interface";
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
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";

const { Option } = Select;

interface SingleTicketProps {
  onCancel?: () => void; // Optional function with no parameters and no return value
  onOk?: any; // Optional function with no parameters and no return value
  id: string; // Optional object with properties of type ITicketData
}

const EditSingleTicket: React.FC<SingleTicketProps> = ({
  onCancel,
  onOk,
  id,
}) => {
  const [form] = Form.useForm();
  const [cookies, setCookie, removeCookie] = useCookies([
    "ticket_id",
    "profileData",
  ]);
  const { updateTicket } = useUpdateTicket();
  const { profile } = useProfile();
  const { getSingleTicket } = useGetSingleTicket(id);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const [additionalFields, setAdditionalFields] = useState<
    { id: number; is_compulsory: boolean; question: string }[]
  >([]);
  const [showAdditionalField, setShowAdditionalField] =
    useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0); // Counter for unique keys
  const ticketDetails = getSingleTicket?.data?.data?.data;
  const [editorContent, setEditorContent] = useState(
    ticketDetails?.ticketDescription
  );
  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };
  

  const ticketStock: string = Form.useWatch("ticketStock", form);
  const ticketType: string = Form.useWatch("ticketType", form);
  const guestAsChargeBearer = Form.useWatch("guestAsChargeBearer", form);
  const ticketQty = Form.useWatch("ticketQty", form);

  

  useEffect(() => {
    if (ticketStock === TICKET_STOCK.UNLIMITED) {
      form.setFieldsValue({ ticketStock: TICKET_STOCK.UNLIMITED });
      form.setFieldsValue({ ticketQty: null });
    } else {
      form.setFieldsValue({ ticketStock: TICKET_STOCK.LIMITED });
    }
  }, [ticketStock]);

  useEffect(() => {
    if (guestAsChargeBearer === true) {
      form.setFieldsValue({ guestAsChargeBearer: true });
    } else {
      form.setFieldsValue({ guestAsChargeBearer: false });
    }
  }, [guestAsChargeBearer]);

  useEffect(() => {
    if (ticketType === TICKET_TYPE.FREE) {
      form.setFieldsValue({ ticketPrice: null });
    }
  }, [ticketType]);

  useEffect(() => {
    if (showAdditionalField === false) {
      setAdditionalFields([]);
    }
  }, [showAdditionalField]);

  

  useEffect(() => {
    if (ticketDetails) {
      form.setFieldsValue({
        ticketType: ticketDetails?.ticketType,
        ticketName: ticketDetails?.ticketName,
        ticketQty: ticketDetails?.ticketQty,
        ticketPrice: ticketDetails?.ticketPrice,
        purchaseLimit: ticketDetails?.purchaseLimit,
        ticketStock: ticketDetails?.ticketStock,
        guestAsChargeBearer: ticketDetails?.guestAsChargeBearer,
      });
    }

    if (ticketDetails?.ticketQuestions?.length > 0) {
      setAdditionalFields(
        ticketDetails?.ticketQuestions?.map(
          (
            question: { is_compulsory: boolean; question: string },
            index: any
          ) => ({
            id: index,
            question: question?.question,
            is_compulsory: question?.is_compulsory,
          })
        )
      );
      form.setFieldsValue({
        ticketQuestions: ticketDetails?.ticketQuestions.map(
          (question: { question: any }) => ({
            question: question?.question,
          })
        ),
      });
      setShowAdditionalField(true);
    }
  }, [ticketDetails]);

  // useEffect(() => {
  //     if (ticketDetails?.ticketQuestions) {
  //       form.setFieldsValue({
  //         question: ticketDetails?.ticketQuestions.map(
  //           (question: { question: any; }) => ({
  //             question: question?.question,
  //           })
  //         ),
  //       })
  //     }
  // }, [ticketDetails]);

  const onFinish: FormProps<ITicketData>["onFinish"] = async (values) => {
    const { ticketQuestions, guestAsChargeBearer, ...rest } = values;
    // 

    if (
      // @ts-ignore
      ticketQuestions?.length > 0 &&
      additionalFields?.length > 0 &&
      ticketQuestions?.length === additionalFields.length &&
      showAdditionalField === true
    ) {
      const reducedTicketQuestions = additionalFields?.map(
        (questionObj: {
          id: number;
          is_compulsory: boolean;
          question: string;
        }) => {
          const { question, is_compulsory } = questionObj;
          
          return { question, is_compulsory };
        }
      );
      // 

      const payload: ITicketUpdate = {
        id: ticketDetails?.id,
        ...rest,
        ticketQuestions: reducedTicketQuestions,
        ticketDescription: editorContent,
        event: params?.id,
        ticketEntity: "SINGLE",
        user: cookies?.profileData?.id,
        guestAsChargeBearer: guestAsChargeBearer,
      };
      // 

      // make api call here

      if (payload) {
        const response = await updateTicket.mutateAsync(payload);
        if (response.status === 200) {
          
          // form.resetFields();
          // linkRef.current?.click();
          if (pathname.startsWith("/discover/create-events")) {
            router.push(
              `/discover/create-events/${params?.id}/tickets_created`
            );
          }
          onOk();
        }
      }
    } else {
      const payload: ITicketUpdate = {
        id: ticketDetails?.id,
        ...rest,
        ticketDescription: editorContent,
        event: params?.id,
        ticketEntity: "SINGLE",
        user: cookies?.profileData?.id,
        guestAsChargeBearer: guestAsChargeBearer,
        ticketQuestions: [],
      };
      if (payload) {
        const response = await updateTicket.mutateAsync(payload);
        if (response.status === 200) {
          
          // form.resetFields();
          // linkRef.current?.click();
          if (pathname.startsWith("/discover/create-events")) {
            router.push(
              `/discover/create-events/${params?.id}/tickets_created`
            );
          }
          onOk();
        }
      }
    }
  };

  const onFinishFailed: FormProps<ITicketData>["onFinishFailed"] = (
    errorInfo
  ) => {
    // 
    return errorInfo;
  };

  const addAdditionalField = () => {
    setAdditionalFields([
      ...additionalFields,
      { id: counter, is_compulsory: false, question: "" },
    ]);
    setCounter(counter + 1); // Increment the counter for the next key
  };

  const removeAdditionalField = (id: number) => {
    setAdditionalFields(additionalFields.filter((field) => field.id !== id));
  };

  const handleCompulsoryChange = (id: number, checked: boolean) => {
    setAdditionalFields(
      additionalFields.map((field) =>
        field.id === id ? { ...field, is_compulsory: checked } : field
      )
    );
  };

  const handleQuestionChange = (id: number, question: string) => {
    setAdditionalFields(
      additionalFields.map((field) =>
        field.id === id ? { ...field, question } : field
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

  // 

  return (
    <Form<ITicketData>
      name="basic"
      initialValues={{
        remember: true,
        guestAsChargeBearer: guestAsChargeBearer,
      }}
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
            message: "Please input your ticket stock", // Validation for required input
          },
          {
            validator: (_, value) => {
              if (
                ticketStock === TICKET_STOCK.LIMITED &&
                value < ticketDetails?.ticket_sold
              ) {
                return Promise.reject(
                  new Error("Ticket quantity cannot be less than tickets sold")
                );
              }
              return Promise.resolve(); // No error
            },
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
        <Select placeholder="Select purchase limit">
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
          <Option value={6}>6</Option>
        </Select>
      </Form.Item>

      <Paragraph
        className="text-OWANBE_DARK text-sm font-normal font-BricolageGrotesqueRegular"
        content={"Ticket description"}
        styles={{ fontWeight: "bold !important" }}
      />
      <div
        className="mb-9 pb-10 w-full"
        style={{ marginBottom: "20px", marginTop: "10px" }}
      >
        {getSingleTicket.isSuccess === true && (
          <EmailEditor
            initialValue={`${ticketDetails?.ticketDescription}`}
            onChange={handleEditorChange}
          />
        )}
      </div>

      <Form.Item
        style={{
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Form.Item<ITicketData>
          name="guestAsChargeBearer"
          valuePropName="checked"
          noStyle
        >
          <Checkbox
            defaultChecked={ticketDetails?.guestAsChargeBearer}
            style={{ marginRight: "10px" }}
          >
            Transfer charge fees to guest
          </Checkbox>
        </Form.Item>
        <Form.Item noStyle>
          <Checkbox
            checked={showAdditionalField}
            onChange={(e) => setShowAdditionalField(e.target.checked)}
          >
            Enable additional information
          </Checkbox>
        </Form.Item>
      </Form.Item>

      {showAdditionalField && (
        <Form.Item<ITicketData>
          style={{ marginBottom: "24px" }}
          rules={[
            {
              validator: async (_, ticketQuestions) => {
                if (
                  showAdditionalField &&
                  additionalFields.length === 0 &&
                  (!ticketQuestions || ticketQuestions.length === 0)
                ) {
                  return Promise.reject(
                    new Error("Please add additional information")
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Form.List name="ticketQuestions" rules={[]}>
            {(fields, { add }) => (
              <>
                {additionalFields.map(({ id, is_compulsory, question }) => (
                  <div key={id} style={{ marginBottom: "16px" }}>
                    <Form.Item
                      name={[id, "question"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter additional information",
                        },
                      ]}
                      style={{ marginBottom: "8px" }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Input
                          placeholder="Enter additional information"
                          style={{ flex: 1 }}
                          onChange={(e) =>
                            handleQuestionChange(id, e.target.value)
                          }
                          value={question}
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
                      name="is_compulsory"
                      style={{ marginBottom: "8px" }}
                    >
                      <Checkbox
                        checked={is_compulsory}
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
          disabled={updateTicket.isPending}
          loading={updateTicket.isPending}
          htmlType="submit"
          className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
          style={{ width: "150px" }}
        >
          {updateTicket.isPending ? "Please Wait" : "Update Ticket"}
        </Button>
      </div>
    </Form>
  );
};

export default EditSingleTicket;
