import { useState, useEffect } from "react";
import H4 from "../atoms/H4";
import ToggleSwitch from "../atoms/ToggleSwitch";
import { NigerianBanks } from "@/app/utils/data";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  notification,
  message,
} from "antd";
import { Label } from "@/app/components/typography/Typography";
import {
  useGetSettlementAccount,
  useUpdateSettlementAccount,
  useGetAllBanks,
  useVerifyBankAccount,
} from "@/app/hooks/settlement/settlement.hook";
import { useCookies } from "react-cookie";
import { ISettlementData } from "@/app/utils/interface";

interface BankData {
  name: string;
  code: string;
}

const PaymentSetting = () => {
  const [activeToggle, setActiveToggle] = useState<string | null>(null);
  const [accountName, setAccountName] = useState("");
  const [form] = Form.useForm();
  const [isEditable, setIsEditable] = useState(false); // New state for edit mode
  const [cookies, setCookie, removeCookie] = useCookies(["profileData"]);
  const [loading, setLoading] = useState(false);
  
  const { getAllBanks } = useGetAllBanks();
  const { verifyBankAccount } = useVerifyBankAccount();
  const { updateSettlementAccount } = useUpdateSettlementAccount();
  const { getSettlementAccount } = useGetSettlementAccount(
    cookies?.profileData?.id
  );
  const accountDetails = getSettlementAccount?.data?.data?.data;
  const allBanks = getAllBanks?.data?.data?.data;
  const accountNumber = form.getFieldValue("account_number");
  const bankCode = form.getFieldValue("bank_code");
  const bankName = form.getFieldValue("bank_name");

  useEffect(() => {
    if (accountDetails) {
      form.setFieldsValue({
        bank_code: accountDetails?.bank_name,
        account_number: accountDetails?.account_number,
        account_name: accountDetails?.account_name,
      });
      setAccountName(accountDetails?.account_name);
    }
  }, [accountDetails]);

  useEffect(() => {
    form.setFieldsValue({ account_name: accountName }); // Update the form field dynamically
  }, [accountName]);

  const handleToggle = (label: string) => {
    setActiveToggle((prev) => (prev === label ? null : label));
  };

  const handleBankNameChange = async (value: string) => {
    // Ensure account number is at least 10 digits
    if (accountNumber?.length >= 10 && value) {
      try {
        const fetchedAccountName = await verifyBankAccount.mutateAsync({
          bank_code: value,
          account_number: accountNumber,
        });

        if (fetchedAccountName.status === 200) {
          setAccountName(fetchedAccountName?.data?.data?.data?.account_name);
        }

        // 
      } catch (error) {
        console.error("Error verifying account:", error);
      }
    } else {
      setAccountName(""); // Clear account name if the input is invalid
      
    }
  };

  const handleAccountNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const accountNumber = e.target.value;
    // Ensure account number is exactly 10 digits
    if (accountNumber?.length >= 10) {
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

          // 
        } catch (error) {
          console.error("Error verifying account:", error);
        }
      }
    } else {
      setAccountName(""); // Clear account name if not 10 digits
      
    }
  };

  const handleButtonClick = async () => {
    setLoading(true);
    if (isEditable) {
      form.validateFields();
      const response = await updateSettlementAccount.mutateAsync({
        account_number: accountNumber,
        account_name: accountName,
        bank_code: bankCode,
        bank_name: bankName,
        user: cookies?.profileData?.id,
      });
      

      if (response.status === 200) {
        setLoading(false);
        setIsEditable(false); // Switch back to non-editable mode
      }
      // .then(async() => {

      //   // Simulate account update
      //   message.success("Account details updated successfully!");
      // });
    } else {
      setLoading(false);
      setIsEditable(true); // Enable editing
    }
  };

  return (
    <form className="px-12 py-5 min-h-[60vh] flex flex-col items-center justify-between">
      <div className="self-start">
        <>
          <H4 content="Payment Setting" style={{ fontSize: "22px" }} />
          <p
            style={{
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontWeight: "350",
              fontSize: "14px",
            }}
            className="text-OWANBE_PRY mt-1 mb-5"
          >
            When would you like to receive payouts of your event ticket sales?
          </p>
        </>

        <div className="flex flex-col gap-y-8 mt-7">
          <ToggleSwitch
            label="weeklyPayment"
            description="Weekly, Payments will be grouped and processed weekly, with disbursements made every Friday."
            isActive={activeToggle === "weeklyPayment"}
            onToggle={() => handleToggle("weeklyPayment")}
          />

          <ToggleSwitch
            label="monthlyPayment"
            description="Monthly, Payments will be processed and disbursed monthly on the last Friday of each month."
            isActive={activeToggle === "monthlyPayment"}
            onToggle={() => handleToggle("monthlyPayment")}
          />
        </div>

        <div className="mt-12">
          <H4 content="Account Details" style={{ fontSize: "22px" }} />
          <p
            style={{
              fontFamily: "Bricolage Grotesque, sans-serif",
              fontWeight: "350",
              fontSize: "14px",
            }}
            className="text-OWANBE_PRY mt-1 mb-3"
          >
            Update your account details here. Please note that changes can only
            be made up to 2 days before your next payout date.
          </p>

          <Form
            layout="vertical"
            form={form}
            className="flex flex-col gap-y-1 mt-5"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="bank_code"
                  label={
                    <Label
                      content="Bank Name"
                      className="text-sm font-medium"
                    />
                  }
                  rules={[
                    { required: true, message: "Please select your bank" },
                  ]}
                >
                  <Select
                    placeholder="Select Bank"
                    allowClear
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
                    disabled={!isEditable} // Disable if not editable
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
              </Col>

              <Col span={12}>
                <Form.Item
                  name="account_number"
                  validateStatus={accountNumber?.length < 10 ? "error" : ""}
                  help={
                    accountNumber?.length < 10
                      ? "Account number must be at least 10 digits"
                      : ""
                  }
                  label={
                    <Label
                      content="Account Number"
                      className="text-sm font-medium"
                    />
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please input your account number",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Enter your account number"
                    onChange={handleAccountNumberChange}
                    disabled={!isEditable} // Disable if not editable
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="account_name"
              label={
                <Label content="Account Name" className="text-sm font-medium" />
              }
              style={{ marginTop: 1 }}
              rules={[
                {
                  required: true,
                  message: "Account Name must be provided",
                },
              ]}
            >
              <Input
                type="text"
                value={accountName}
                placeholder="Account name will appear here"
                readOnly
                disabled={!isEditable}
              />
            </Form.Item>
          </Form>
        </div>
      </div>

      <Button
        type="primary"
        loading={isEditable ? false : loading}
        htmlType={isEditable ? "button" : "submit"}
        onClick={handleButtonClick} // Change from htmlType="submit" to onClick
        size="large"
        className="font-BricolageGrotesqueSemiBold continue font-bold custom-button equal-width-button"
        style={{ marginTop: "20px" }}
      >
        {isEditable ? "Save Changes" : "Update"} {/* Conditional button text */}
      </Button>
    </form>
  );
};

export default PaymentSetting;
