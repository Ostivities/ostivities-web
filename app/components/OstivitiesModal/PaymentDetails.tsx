import useModal from "@/app/hooks/useModal";
import { NigerianBanks } from "@/app/utils/data";
import { IModal } from "@/app/utils/interface";
import { Button, Form, FormProps, Input, Modal, Select, Space } from "antd";
import React, { useState } from "react";
import { Heading5, Label } from "../typography/Typography";
import {
  useCreateSettlementAccount,
  useGetSettlementAccount,
  useGetAllBanks,
  useVerifyBankAccount,
} from "@/app/hooks/settlement/settlement.hook";

interface FieldType {}

interface BankData {
  name: string
  code: string;
}

const PaymentDetails = ({ open, onCancel, onOk }: IModal): JSX.Element => {
  const [form] = Form.useForm();
  const [accountName, setAccountName] = useState("");
  const { getAllBanks } = useGetAllBanks();
  const { verifyBankAccount } = useVerifyBankAccount();
  console.log(getAllBanks, "getAllBanks");
  const allBanks = getAllBanks?.data?.data?.data;
  // const { getSettlementAccount } = useGetSettlementAccount("1");

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    return values;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };

  const accountNames: { [key: string]: string } = {
    "bank1-123456": "John Doe",
    "bank2-654321": "Jane Smith",
  };

  const fetchAccountName = (
    bankName: string,
    accountNumber: string
  ): string => {
    const key = `${bankName}-${accountNumber}`;
    return accountNames[key] || "";
  };

  const handleBankNameChange = async (value: string) => {
    const accountNumber = form.getFieldValue("accountNumber");
    if (accountNumber) {
      const fetchedAccountName = await verifyBankAccount.mutateAsync({ 
        bank_code: value, 
        account_number: accountNumber 
      });
      console.log(fetchedAccountName, "fetchedAccountName");
      // setAccountName(fetchedAccountName);
    }
  };

  const handleAccountNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const bankName = form.getFieldValue("bankName");
    if (bankName) {
      const fetchedAccountName = await verifyBankAccount.mutateAsync({ 
        bank_code: bankName,
        account_number: e.target.value
      });
      console.log(fetchedAccountName, "fetchedAccountName");
      // setAccountName(fetchedAccountName);
    }
  };

  return (
    <Modal
      title={
        <>
          <Heading5
            content={"Add Account Details"}
            className=""
            styles={{ fontSize: "16px" }} // Adjust font size here
          />
        </>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
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
          rules={[{ required: true, message: "Please select your bank" }]}
          style={{ marginBottom: "12px" }} // Adjust spacing here
        >
          <Select
            placeholder="Select Bank"
            style={{ width: "100%" }}
            onChange={handleBankNameChange}
          >
            {/* {NigerianBanks.map((_i) => (
              <Select.Option value={_i.value} key={_i.value}>
                {_i.label}
              </Select.Option>
            ))} */}
            {allBanks?.map((bank: BankData, index: any) => (
              <Select.Option value={bank?.code} key={index}>
                {bank?.name}
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
                htmlFor="accountNumber"
              />
            </>
          }
          rules={[
            { required: true, message: "Please input your account number" },
          ]}
          style={{ marginBottom: "12px" }} // Adjust spacing here
        >
          <Input
            type="text"
            placeholder="Enter your account number"
            className="placeholder:font-BricolageGrotesqueRegular"
            autoComplete="off"
            onChange={handleAccountNumberChange}
          />
        </Form.Item>

        <Form.Item
          name={"accountName"}
          label={
            <>
              <Label
                content="Account Name"
                className=""
                htmlFor="accountName"
              />
            </>
          }
          rules={[
            { required: false, message: "Please input your account name" },
          ]}
          style={{ marginBottom: "12px" }} // Adjust spacing here
        >
          <Input
            type="text"
            value={accountName}
            placeholder="Account name will appear here"
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
            marginTop: "40px", // Adjust spacing here
          }}
        >
          <Form.Item>
            <Button
              type="default"
              htmlType="button"
              size={"large"}
              className={`font-BricolageGrotesqueSemiBold button-styles sign-in cursor-pointer font-bold`}
              onClick={onCancel}
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
            >
              Add
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default PaymentDetails;
