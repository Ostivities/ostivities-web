import useModal from "@/app/hooks/useModal";
import { NigerianBanks } from "@/app/utils/data";
import { IModal } from "@/app/utils/interface";
import { Button, Form, FormProps, Input, Modal, Select, Space, message } from "antd";
import React, { useState, useEffect } from "react";
import { Heading5, Label } from "../typography/Typography";
import {
  useCreateSettlementAccount,
  useGetSettlementAccount,
  useGetAllBanks,
  useVerifyBankAccount,
} from "@/app/hooks/settlement/settlement.hook";
import { ISettlementData, IVerifyBankAccount } from "@/app/utils/interface";

interface FieldType {}

interface BankData {
  name: string;
  code: string;
}

const PaymentDetails = ({
  open,
  onCancel,
  onOk,
  data,
}: IModal): JSX.Element => {
  const [form] = Form.useForm();
  const [accountName, setAccountName] = useState("");
  const { getAllBanks } = useGetAllBanks();
  const { verifyBankAccount } = useVerifyBankAccount();
  const { createSettlementAccount } = useCreateSettlementAccount();
  console.log(getAllBanks, "getAllBanks");
  const allBanks = getAllBanks?.data?.data?.data;
  // const { getSettlementAccount } = useGetSettlementAccount("1");

  console.log(data, "data");
  const onFinish: FormProps<ISettlementData>["onFinish"] = async(values) => {
    console.log(values, "values");
    // return values;

    const response = await createSettlementAccount.mutateAsync({
      ...values,
      user: data,
    });
    if(response.status === 201) {
      // message.success("Account added successfully")
      onOk();
    }
    console.log(response, "response");
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    return errorInfo;
  };
  console.log(accountName, "accountName");
  const accountNumber = form.getFieldValue("account_number");

  const handleBankNameChange = async (value: string) => {
    // Ensure account number is at least 10 digits
    if (accountNumber?.length >= 10) {
      try {
        const fetchedAccountName = await verifyBankAccount.mutateAsync({
          bank_code: value,
          account_number: accountNumber,
        });

        if (fetchedAccountName.status === 200) {
          setAccountName(fetchedAccountName?.data?.data?.data?.account_name);
        }

        // console.log(fetchedAccountName, "fetchedAccountName");
      } catch (error) {
        console.error("Error verifying account:", error);
      }
    } else {
      setAccountName(""); // Clear account name if the input is invalid
      console.log("Account number must be at least 10 digits");
    }
  };

  const handleAccountNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const accountNumber = e.target.value;

    // Ensure account number is exactly 10 digits
    if (accountNumber.length >= 10) {
      const bankName = form.getFieldValue("bank_code");

      if (bankName) {
        try {
          const fetchedAccountName = await verifyBankAccount.mutateAsync({
            bank_code: bankName,
            account_number: accountNumber,
          });

          if (fetchedAccountName.status === 200) {
            setAccountName(fetchedAccountName?.data?.data?.data?.account_name);
          }

          // console.log(fetchedAccountName, "fetchedAccountName");
        } catch (error) {
          console.error("Error verifying account:", error);
        }
      }
    } else {
      setAccountName(""); // Clear account name if not 10 digits
      console.log("Account number must be exactly 10 digits");
    }
  };
  useEffect(() => {
    form.setFieldsValue({ account_name: accountName }); // Update the form field dynamically
  }, [accountName]);

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
          name="bank_code"
          label={
            <>
              <Label content="Bank Name" className="" htmlFor="bank_name" />
            </>
          }
          rules={[{ required: true, message: "Please select your bank" }]}
          style={{ marginBottom: "12px" }}
        >
          <Select
            placeholder="Select Bank"
            style={{ width: "100%" }}
            showSearch
            onChange={(value) => {
              const selectedBank = allBanks?.find(
                (bank: BankData) => bank?.code === value
              );
              if (selectedBank) {
                form.setFieldsValue({ bank_name: selectedBank?.name }); // Set the bank_code field
              }
              handleBankNameChange(selectedBank?.code); // Pass the bank code for further processing
            }}
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                ?.toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {allBanks?.map((bank: BankData, index: number) => (
              <Select.Option value={bank?.code} key={index}>
                {bank?.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="bank_name" style={{ display: "none" }}>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item
          name={"account_number"}
          validateStatus={accountNumber?.length < 10 ? "error" : ""}
          help={
            accountNumber?.length < 10
              ? "Account number must be at least 10 digits"
              : ""
          }
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
          name={"account_name"}
          label={
            <>
              <Label
                content="Account Name"
                className=""
                htmlFor="accountName"
              />
            </>
          }
          style={{ marginBottom: "12px" }} // Adjust spacing here
          rules={[{
            required: true,
            message: "Account Name must be provided"
          }]}
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
              loading={createSettlementAccount?.isPending}
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
