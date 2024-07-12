import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Form,
  FormProps,
  Input,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

interface FieldType {}

const CollectiveTicket = (): JSX.Element => {
  const { TextArea } = Input;
  const { Option } = Select;

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayoutAddField = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 0 },
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 120 }}>
        <Option value="limited">Limited</Option>
        <Option value="unlimited">Unlimited</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form<FieldType>
      name="basic"
      {...formItemLayout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="horizontal"
    >
      <Form.Item<FieldType>
        label={
          <div className="text-left w-36 after:content-none font-BricolageGrotesqueRegular font-normal text-xs text-OWANBE_DARK label-no-content">
            Ticket type
          </div>
        }
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <div className="w-[500px] float-right">
          <Input
            className="rounded-2xl"
            style={{ borderRadius: "16px !important" }}
          />
        </div>
      </Form.Item>

      <Form.Item<FieldType>
        label={
          <div className="text-left w-36 font-BricolageGrotesqueRegular font-normal text-xs text-OWANBE_DARK">
            Ticket name
          </div>
        }
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <div className="w-[500px] float-right">
          <Input placeholder="Enter ticket name" />
        </div>
      </Form.Item>

      <Form.Item<FieldType>
        label={
          <div className="text-left w-36 font-BricolageGrotesqueRegular font-normal text-xs text-OWANBE_DARK">
            Ticket stock
          </div>
        }
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <div className="w-[500px] float-right">
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </div>
      </Form.Item>

      <Form.Item<FieldType>
        label={
          <div className="text-left w-36 font-BricolageGrotesqueRegular font-normal text-xs text-OWANBE_DARK">
            Group price
          </div>
        }
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <div className="w-[500px] float-right">
          <Input />
        </div>
      </Form.Item>

      <Form.Item<FieldType>
        label={
          <div className="text-left w-36 font-BricolageGrotesqueRegular font-normal text-xs text-OWANBE_DARK">
            Group size
          </div>
        }
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <div className="w-[500px] float-right">
          <Select
            options={[
              { label: "Couple", value: "2" },
              { label: "Trio", value: "3" },
              { label: "Quads", value: "4" },
            ]}
          />
        </div>
      </Form.Item>

      <Form.Item<FieldType>
        label={
          <div className="text-left w-36 font-BricolageGrotesqueRegular font-normal text-xs text-OWANBE_DARK">
            Price per ticket
          </div>
        }
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <div className="w-[500px] float-right">
          <Input />
        </div>
      </Form.Item>

      <Form.Item<FieldType>
        label={
          <div className="text-left w-36 font-BricolageGrotesqueRegular font-normal text-xs text-OWANBE_DARK">
            Ticket description
          </div>
        }
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <div className="w-[500px] float-right h-16">
          <TextArea allowClear showCount={false} className="h-20" rows={10} />
        </div>
      </Form.Item>

      <Form.Item>
        <Form.Item<FieldType> name="remember" valuePropName="checked">
          <Checkbox>
            <span className="font-BricolageGrotesqueRegular font-normal text-xs text-OWANBE_DARK">
              Transfer charge fees to guest
            </span>
          </Checkbox>
        </Form.Item>
      </Form.Item>

      <div className="-mt-6">
        <p className="text-left pb-3 font-BricolageGrotesqueRegular font-normal text-sm">
          Would you like to gather more information
        </p>

        <Form.Item label={""}>
          <Form.List name="items">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    // {...(index === 0
                    //   ? formItemLayoutAddField
                    //   : formItemLayoutAddField)}
                    label={
                      <div className="text-left font-BricolageGrotesqueRegular font-normal text-xs text-OWANBE_DARK">
                        Custom Question
                      </div>
                    }
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: false,
                          whitespace: true,
                          message: "Please input question.",
                        },
                      ]}
                      noStyle
                    >
                      <div className="w-[500px] float-right flex flex-row items-center justify-end ps-5 space-x-3">
                        <Input
                          placeholder="e.g would you be willing to attend this event?"
                          style={{ width: "80%", float: "right" }}
                        />
                        {fields.length > 1 ? (
                          <CloseOutlined
                            className="dynamic-delete-button cursor-pointer"
                            onClick={() => remove(field.name)}
                            style={{
                              color: "#E20000",
                              border: "1px solid  #E20000",
                              borderRadius: "2px",
                              height: "12px",
                              width: "12px",
                            }}
                          />
                        ) : null}
                      </div>
                    </Form.Item>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="text"
                    onClick={() => add()}
                    style={{ width: "30%" }}
                    icon={
                      <PlusOutlined
                        className="text-OWANBE_PRY cursor-pointer"
                        style={{
                          color: "#E20000",
                          border: "1px solid  #E20000",
                          borderRadius: "2px",
                          height: "12px",
                          width: "12px",
                        }}
                      />
                    }
                  >
                    <span className="text-xs text-OWANBE_PRY font-BricolageGrotesqueRegular font-normal">
                      {fields.length > 1 || fields.length === 1
                        ? "Add another question"
                        : "Add a question"}
                    </span>
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CollectiveTicket;
