import useModal from "@/app/hooks/useModal";
import { NigerianBanks, STATES_IN_NIGERIA } from "@/app/utils/data";
import { IModal } from "@/app/utils/interface";
import { Button, Form, FormProps, Input, Modal, Select, Space } from "antd";
import React from "react";
import { Heading5, Label } from "../typography/Typography";

interface FieldType {}

const PaymentDetails = ({ open, onCancel, onOk }: IModal): JSX.Element => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    return values;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };

  return (
    <Modal
      title={
        <>
          <Heading5 content={"Add Payment Details"} className="" />
        </>
      }
      open={open}
      onOk={onOk}
      onCancel={() => {
        onCancel();
      }}
      footer={null}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        form={form}
        className="pt-3"
      >
        <Form.Item
          name={"bankName"}
          label={
            <>
              <Label content="Bank Name" className="" htmlFor="eventName" />
            </>
          }
          rules={[{ required: false, message: "Please input your email" }]}
        >
          <Select placeholder="Select State" style={{ width: "100%" }}>
            {NigerianBanks.map((_i) => (
              <Select.Option value={_i.value} key={_i.value}>
                {_i.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={"accountNumber"}
          label={
            <>
              <Label
                content="Account Number"
                className=""
                htmlFor="eventName"
              />
            </>
          }
          rules={[{ required: false, message: "Please input your email" }]}
        >
          <Input
            type="text"
            placeholder="Enter your accout number"
            className="placeholder:font-BricolageGrotesqueRegular"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name={"accountNumber"}
          label={
            <>
              <Label content="Account Name" className="" htmlFor="eventName" />
            </>
          }
          rules={[{ required: false, message: "Please input your email" }]}
        >
          <Input
            type="text"
            placeholder="Enter your accout name"
            className="placeholder:font-BricolageGrotesqueRegular"
            autoComplete="off"
            readOnly
          />
        </Form.Item>

        <Space
          direction="horizontal"
          size={"small"}
          align="center"
          className="mx-auto flex flex-row justify-center"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Form.Item>
            <Button
              type="default"
              htmlType="button"
              size={"large"}
              className={`font-BricolageGrotesqueSemiBold button-styles sign-in cursor-pointer font-bold`}
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size={"large"}
              htmlType="submit"
              className="font-BricolageGrotesqueSemiBold sign-up cursor-pointer font-bold button-styles"
              onClick={() => {
                onCancel();
              }}
            >
              Save
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default PaymentDetails;
