import { Heading5, Paragraph } from "@/app/components/typography/Typography";
import { useUpdateTicket, useGetSingleTicket } from "@/app/hooks/ticket/ticket.hook";
import { CloseSquareOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import EmailEditor from "../QuillEditor/EmailEditor";
import { ITicketCreate, ITicketData, ITicketUpdate } from "@/app/utils/interface";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useProfile } from "@/app/hooks/auth/auth.hook";
import { TICKET_STOCK, TICKET_TYPE } from "@/app/utils/enums";

const { Option } = Select;
interface CollectiveTicketProps {
  onCancel?: () => void;  // Optional function with no parameters and no return value
  onOk?: any;  
  id: string    
}

const EditCollectiveTicket: React.FC<CollectiveTicketProps> = ({ onCancel, onOk, id }) => {  
  const { updateTicket } = useUpdateTicket();
  const { profile } = useProfile();
  const params = useParams<{ id: string }>();
  const { TextArea } = Input;
  const router = useRouter();
  const [groupPrices, setGroupPrices] = useState<number | null>(null);
  // const [groupSize, setGroupSize] = useState<number | null>(null);
  const [pricePerTicket, setPricePerTicket] = useState<number | null>(null);
  const [ticketStockValue, setTicketStockValue] = useState<string>("limited"); // Default to "limited"
  const [additionalFields, setAdditionalFields] = useState<
    { id: number; is_compulsory: boolean, question: string }[]
  >([]);
  const [showAdditionalField, setShowAdditionalField] =
    useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0); // Counter for unique keys
  const [form] = Form.useForm(); // Initialize form instance
  const { getSingleTicket } = useGetSingleTicket(id);
  const ticketDetails = getSingleTicket?.data?.data?.data;
  const [editorContent, setEditorContent] = useState("" || ticketDetails?.ticketDescription);
  const handleEditorChange = (content: React.SetStateAction<string>) => {
    setEditorContent(content);
  };
  const pathname = usePathname()
  // console.log(pathname)
  const ticketStock: string = Form.useWatch("ticketStock", form);
  const ticketType: string = Form.useWatch("ticketType", form); // Watch ticketType changes
  const groupPrice: number = Form.useWatch("groupPrice", form);
  const groupSize: number = Form.useWatch("groupSize", form);
  const guestAsChargeBearer = Form.useWatch("guestAsChargeBearer", form);

  console.log(showAdditionalField, "showAdditionalField");


  console.log(ticketDetails, "ticketDetails");
  useEffect(() => {
    if (ticketDetails){
      form.setFieldsValue({
        ticketType: ticketDetails?.ticketType,
        ticketName: ticketDetails?.ticketName,
        ticketQty: ticketDetails?.ticketQty,
        groupPrice: ticketDetails?.groupPrice,
        groupSize: ticketDetails?.groupSize,
        ticketPrice: ticketDetails?.ticketPrice,
        purchaseLimit: ticketDetails?.purchaseLimit,
        guestAsChargeBearer: ticketDetails?.guestAsChargeBearer,
        ticketStock: ticketDetails?.ticketStock,
        ticketQuestions: ticketDetails?.ticketQuestions,
      });
    }

    if (ticketDetails?.ticketQuestions?.length > 0) {
      setAdditionalFields(
        ticketDetails?.ticketQuestions?.map((question: { is_compulsory: boolean; question: string; }, index: any) => ({
          id: index,
          question: question?.question,
          is_compulsory: question?.is_compulsory,
        }))
      );
      form.setFieldsValue({
        ticketQuestions: ticketDetails?.ticketQuestions.map(
          (question: { question: any; }) => ({
            question: question?.question,
          })
        ),
      });
      setShowAdditionalField(true);
    }

  }, [ticketDetails]);
  console.log(groupPrices, "groupPrices")

  const onFinish: FormProps<ITicketData>["onFinish"] = async (values) => {
    const { ticketQuestions, ticketType, ...rest } = values;
    // return console.log(values)
    if (
      // @ts-ignore
      ticketQuestions?.length > 0 &&
      additionalFields?.length > 0 &&
      ticketQuestions?.length === additionalFields.length &&
      showAdditionalField === true
    ) {
      const reducedTicketQuestions = additionalFields?.map(
        (questionObj: { id: number; is_compulsory: boolean; question: string }) => {
          const { question, is_compulsory } = questionObj;
          console.log(question, is_compulsory, "question, is_compulsory");
          return { question, is_compulsory };
        }
      );

      const payload: ITicketUpdate = {
        id: ticketDetails?.id,
        ...rest,
        ticketQuestions: reducedTicketQuestions,
        ticketDescription: editorContent,
        event: params?.id,
        ticketEntity: "COLLECTIVE",
        user: profile?.data?.data?.data?.id,
        // groupPrice: ticketType === TICKET_TYPE.FREE ? 0 : groupPrice,
        ticketType
      };
      // console.log(payload, "kk");

      // make api call here

      if (payload) {
        const response = await updateTicket.mutateAsync(payload);
        if (response.status === 200) {
          // console.log(response);
          form.resetFields();
          // linkRef.current?.click();
          if(pathname.startsWith("/Dashboard/create-events")) {
            router.push(`/Dashboard/create-events/${params?.id}/tickets_created`);
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
        ticketEntity: "COLLECTIVE",
        user: profile?.data?.data?.data?.id,
        // groupPrice: ticketType === TICKET_TYPE.FREE ? 0 : groupPrice,
        ticketType
      };
      if (payload) {
        const response = await updateTicket.mutateAsync(payload);
        if (response.status === 200) {
          // console.log(response);
          form.resetFields();
          // linkRef.current?.click();
          if(pathname.startsWith("/Dashboard/create-events")) {
            router.push(`/Dashboard/create-events/${params?.id}/tickets_created`);
          }
          onOk();
        }
      }
    }
  };

  const onFinishFailed: FormProps<ITicketData>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
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

  useEffect(() => {
    if (groupPrice !== null && groupSize !== null) {
      const price = (groupPrice / groupSize).toFixed(0);
      setPricePerTicket(parseFloat(price));
      const price_per_ticket = pricePerTicket
      if(price_per_ticket) {
        form.setFieldValue("ticketPrice", price_per_ticket)
      }
      // console.log(pricePerTicket)
    } else if( groupPrice === 0 && groupPrice === null) {
      form.setFieldValue('ticketPrice', "")
    }
    else {
      setPricePerTicket(null);
      form.setFieldValue('ticketPrice', "")
    }
  }, [groupPrice, groupSize, pricePerTicket]);

  useEffect(() => {
    if (guestAsChargeBearer === true) {
      form.setFieldsValue({ guestAsChargeBearer: true });
    }
  }, [guestAsChargeBearer]);

  useEffect(() => {
    if (ticketStock === TICKET_STOCK.UNLIMITED) {
      form.setFieldsValue({ ticketStock: TICKET_STOCK.UNLIMITED });
      form.setFieldsValue({ ticketQty: null });
    } else {
      form.setFieldsValue({ ticketStock: TICKET_STOCK.LIMITED });
    }
  }, [ticketStock]);

  useEffect(() => {
    if (ticketType === TICKET_TYPE.FREE) {
      form.setFieldsValue({ ticketPrice: null });
      form.setFieldsValue({ groupPrice: null })
      setGroupPrices(null)
    }
  }, [ticketType]);

  // const handleGroupPriceChange = (value: number | null) => {
  //   setGroupPrice(value);
  // };

  // const handleGroupSizeChange = (value: number) => {
  //   setGroupSize(value);
  // };



  const prefixSelector = (
    <Form.Item name="ticketStock" noStyle>
      <Select defaultValue={TICKET_STOCK.UNLIMITED}>
        <Option value={TICKET_STOCK.LIMITED}>Limited</Option>
        <Option value={TICKET_STOCK.UNLIMITED}>Unlimited</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form<ITicketData>
      form={form} // Bind form instance
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
        label="Group price"
        name="groupPrice"
        style={{ marginBottom: "8px" }}
      >
        <InputNumber
          placeholder="Enter group price"
          style={{ width: "100%" }}
          min={0}
          value={groupPrices}
          disabled={ticketType === TICKET_TYPE.FREE}
          // onChange={handleGroupPriceChange}
          formatter={(value) =>
            `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value?.replace(/\₦\s?|(,*)/g, "") as any}
        />
      </Form.Item>

      <Form.Item<ITicketData>
        label="Group size"
        name="groupSize"
        rules={[{ required: true, message: "Please select your group size!" }]}
        style={{ marginBottom: "8px" }}
      >
        <Select
          placeholder="Select group size"
          // onChange={handleGroupSizeChange}
        >
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
          <Option value={6}>6</Option>
          <Option value={7}>7</Option>
          <Option value={8}>8</Option>
          <Option value={9}>9</Option>
          <Option value={10}>10</Option>
        </Select>
      </Form.Item>

      <Form.Item<ITicketData>
        label="Price per ticket"
        name="ticketPrice"
        style={{ marginBottom: "8px" }}
      >
        <InputNumber
          value={pricePerTicket}
          style={{ width: "100%" }}
          min={0}
          precision={2}
          step={0.01}
          formatter={(value) =>
            `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value?.replace(/\₦\s?|(,*)/g, "") as any}
          disabled={ticketType === TICKET_TYPE.FREE}
          readOnly={true}
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
      <div
        className="mb-9 pb-16 w-full"
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
       style={{ marginBottom: "24px", display: "flex", alignItems: "center", gap: "20px" }}
      >
        <Form.Item<ITicketData>
          name="guestAsChargeBearer"
          valuePropName="checked"
          noStyle
        >
          <Checkbox defaultChecked={ticketDetails?.guestAsChargeBearer} style={{ marginRight: "10px" }}>
            Transfer charge fees to guest
          </Checkbox>
        </Form.Item>
        <Form.Item noStyle>
          <Checkbox checked={showAdditionalField} onChange={(e) => setShowAdditionalField(e.target.checked)}>
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
                  showAdditionalField && additionalFields.length === 0 &&
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
                          value={question}
                          onChange={(e) =>
                            handleQuestionChange(id, e.target.value)
                          }
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
                    <Form.Item style={{ marginBottom: "8px" }}>
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
          {showAdditionalField && additionalFields.length === 0 && (
            <div style={{ color: "#ff4d4f", marginTop: "8px" }}>
              Please add at least one question.
            </div>
          )}
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
          style={{ width: "150px" }}
          className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
        >
          {updateTicket.isPending ? "Please Wait" : "Update Ticket"}
        </Button>
      </div>
    </Form>
  );
};

export default EditCollectiveTicket;
